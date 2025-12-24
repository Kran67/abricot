"use client";

import { createContext, useContext, useState, ReactNode, Context } from "react";
import type { User } from "@/app/interfaces/user";

const UserContext: Context<User | null> = createContext<User | null>(null);

export function UserProvider({ children, initialUser }: { children: ReactNode; initialUser: User | null }) {
  const [user] = useState<User | null>(initialUser);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
