import { User } from "./user";

export type ProjectRole = "CONTRIBUTOR" | "ADMIN"

export interface ProjectMember {
    id: string;
    role: ProjectRole;
    user: User;
    joinedAt: string;
}