import { User } from "@/app/interfaces/user";

export interface TaskAssignee {
    id: string;
    userId: string;
    taskId: string;
    user: User;
    assignedAt: string;
}

export interface TaskComment {
    id: string;
    content: string;
    taskId: string;
    authorId: string;
    author: User;
    createdAt: string;
    updatedAt: string;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'CANCELLED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface TaskItem {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    projectId: string;
    creatorId: string;
    assignees: TaskAssignee[];
    comments: TaskComment[];
    createdAt: string;
    updatedAt: string;
    projectName: string;
}