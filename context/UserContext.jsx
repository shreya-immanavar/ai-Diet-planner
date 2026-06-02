import { createContext, useEffect, useState } from "react";
import { api } from "../convex/_generated/api";

export const UserContext = createContext();

export const UserProvider = ({ children, loggedInUserEmail }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!loggedInUserEmail) return; // wait until email is known

    const fetchUser = async () => {
      try {
        const fetchedUser = await api.users.getUser({ email: loggedInUserEmail });
        console.log("Fetched user from Convex:", fetchedUser);

        setUser(fetchedUser); // ✅ store _id here
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [loggedInUserEmail]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};