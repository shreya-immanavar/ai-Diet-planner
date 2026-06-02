import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    picture: v.optional(v.string()), // ✅ FIXED
    subscriptionId: v.optional(v.string()),
    credits: v.number(),
    height: v.optional(v.string()),
    weight: v.optional(v.string()),
    gender: v.optional(v.string()),
    goal: v.optional(v.string()),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number())
  }).index("by_email", ["email"]),
  recipes: defineTable({
    jsonData: v.any(),
    uid: v.optional(v.id('users')),
    imageUrl: v.string(),
    recipeName: v.any(),
  }),
  mealPlan: defineTable({
    recipeId: v.id('recipes'),
    date: v.string(),
    mealType: v.string(),
    uid: v.id('users'),
    status: v.optional(v.boolean()),
    calories: v.optional(v.number()),
    proteins: v.optional(v.number())
  }).index("by_user_date", ["uid", "date"]),
});