import { Task } from "@/app/interfaces/taskItem";

export interface AssignedTasksResponse {
    success: boolean;
    message: string;
    data: {
        tasks: Task[];
    };
}