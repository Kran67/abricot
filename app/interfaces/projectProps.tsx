export default interface ProjectCardProps {
    name: string;
    description: string;
    progress?: number;
    team: string;
    owner: string;
    contributors: { fullName: string, initials: string }[];
}

export interface PropsPC {
    props: ProjectCardProps;
}