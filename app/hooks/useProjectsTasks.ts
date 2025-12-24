import { useEffect, useState } from "react";
import type { TaskItem } from "@/app/interfaces/taskItem";

export function useProjectsTasks(token: string | undefined, projectId: string) {
  const [tasks, setTasks] = useState<TaskItem[] | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshTasks() {
    try {
      const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/tasks`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) {
        setTasks(null);
        return;
      }

      const data = await res.json();
      setTasks(data.data.tasks);
    } catch (err) {
      console.error("Erreur fetch tasks:", err);
      setTasks(null);
    }
  }

  useEffect(() => {
    let active: boolean = true;

    async function load() {
      await refreshTasks();
      if (active) setLoading(false);
    }

    load();

    return () => {
      active = false;
    };
  }, [projectId]);

  return { tasks, loading, refreshTasks };
}
