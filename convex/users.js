import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ✅ Create or return existing user
export const createNewUser = mutation({
  args: {
    email: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Use index for better performance
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    // If user does not exist → create
    if (!user) {
      const insertedId = await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        credits: 10,
      });
      return await ctx.db.get(insertedId);
    }

    // If exists → return existing user
    return user;
  },
});

// ✅ Get user
export const getUser = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("🔥 Convex function called for email:", args.email);
    
    if (!args.email) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique(); // Use unique() to ensure one user per email

    return user;
  },
});

export const UpdateUserPref = mutation({
  args: {
    uid: v.id('users'),
    height: v.string(),
    weight: v.string(),
    gender: v.string(),
    goal: v.optional(v.string()),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number())

  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.uid, {
      height: args.height,
      weight: args.weight,
      goal: args.goal,
      gender: args.gender,
      proteins: args.proteins,
      calories: args.calories

    });
    return result;
  }
});
