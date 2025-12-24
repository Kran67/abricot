import type { User, ProfileResponse } from "@/app/interfaces/user";
import { cookies } from "next/headers";
import { Project, ProjectsResponse } from "@/app/interfaces/project";


// récupérer les données du profil
export const getProfile = async (): Promise<User | null> => {
  const cookieStore = await cookies();
  const token: string | undefined = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/profile`, {
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

// récupérer les projets auxquels l'utilisateur a des tâches attribuées
export const getProjectsWithTasks = async (token: string | undefined): Promise<Project[] | null> => {
  if (!token) return null;

  try {
    const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/projects-with-tasks`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data: ProjectsResponse = await res.json();

    return data.data.projects ?? null;
  } catch (err) {
    console.error("Erreur lors de la récupération des projets :", err);
    return null;
  }
};
