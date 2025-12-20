import type { User, ProfileResponse } from "@/app/interfaces/user";
import { cookies } from "next/headers";


// retrieve profile data
export const getProfile = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const data: ProfileResponse = await res.json();
    return data?.data?.user ?? null;
  } catch (err) {
    console.error("Erreur lors de la récupération du profil :", err);
    return null;
  }
}