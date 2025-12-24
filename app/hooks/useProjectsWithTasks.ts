import { useEffect, useState } from "react";
import type { Project } from "@/app/interfaces/project";

export function useProjectsWithTasks(token: string | undefined) {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function refresh() {
    try {
      const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/projects-with-tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        setProjects(null);
        return;
      }

      const data = await res.json();

      setProjects(data.data.projects);
    } catch (err) {
      console.error("Erreur fetch projects with tasks:", err);
      setProjects(null);
    }
  }

  useEffect(() => {
    let active: boolean = true;

    async function load() {
      await refresh();
      if (active) setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, []);

  return { projects, loading, refresh };
}
