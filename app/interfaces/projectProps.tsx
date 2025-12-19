import { TaskProps } from "@/app/components/data/Task";

export default interface ProjectCardProps {
    name: string;
    description: string;
    progress?: number;
    tasks: TaskProps[];
    team: string;
    owner: string;
    contributors: { fullName: string, initials: string }[]; // à remplacer par des users
}

export interface PropsPC {
    props: ProjectCardProps;
}