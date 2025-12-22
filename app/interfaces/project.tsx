import { ProjectMember } from "./projectMember";
import { TaskItem } from "./taskItem";
import { User } from "./user";

interface Count {
    tasks: number
}

export interface Project {
    id: string;
    name: string;
    description: string;
    ownerId: string;
    owner: User;
    members: ProjectMember[];
    tasks?: TaskItem[];
    _count?: Count
    createdAt: string;
    updatedAt: string;
}

export interface ProjectsResponse {
    success: boolean;
    message: string;
    data: {
        projects: Project[];
    };
}