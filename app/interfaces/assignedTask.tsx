import { Task } from "@/app/interfaces/task";

export interface AssignedTasksResponse {
    success: boolean;
    message: string;
    data: {
        tasks: Task[];
    };
}