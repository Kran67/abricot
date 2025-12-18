'use client'

import Image from "next/image";
import UserIcon from "./UserIcon";
import { UserIconModes } from "@/app/enums/enums";
import Tag from "./Tag";

interface ProjectCardProps {
    name: string;
    description: string;
    progress?: number;
    nbTaskDone: number;
    nbTotalTasks: number;
    team: string;
    owner: string;
    users: string[];
}

export default function ProjectCard({ name, description, progress, nbTaskDone, nbTotalTasks, team, owner, users }: ProjectCardProps) {
    const classNames = [
        "project-card",
        "flex",
        "flex-col",
        "gap-56",
        "rounded-(--radius10)",
        "border",
        "border-(--grey-200)",
        "bg-(--white)",
        "pl-34",
        "pr-34",
        "pt-30",
        "pb-30"
    ].join(" ");

    const totalTasks = `${nbTotalTasks} tâche${nbTotalTasks > 1 ? "s" : ""} terminée${nbTotalTasks > 1 ? "s" : ""}`;
    const progressValue = { "--progress": `${progress}%` };

    return (
        <div className={classNames}>
            <div className="flex flex-col flex-1 gap-8">
                <h5 className="text-(--grey-800)">{name}</h5>
                <div className="body-s text-(--grey-600)">{description}</div>
            </div>
            <div className="flex flex-col gap-16">
                <div className="flex justify-between">
                    <div className="body-xs text-(--grey-600)">Progession</div>
                    <div className="body-xs text-(--grey-800)">{progress ?? 0}%</div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="progress rounded-(--radius40) bg-(--grey-200) h-7 relative" style={progressValue}></div>
                    <div className="body-2xs text-(--grey-600)">{nbTaskDone}/{totalTasks}</div>
                </div>
            </div>
            <div className="flex flex-col gap-15">
                <div className="flex gap-8 body-2xs text-(--grey-600)">
                    <Image src="/images/users.svg" alt="Image équipe" width={11} height={11} />
                    {team}
                </div>
                <div className="flex gap-4">
                    <div className="flex gap-5">
                        <UserIcon text={owner} isOwner={true} mode={UserIconModes.Small} />
                        <Tag text="Propriètaire" />
                    </div>
                    <div className="flex">
                        {users.map((user, index) => (
                            <UserIcon key={index} text={user} mode={UserIconModes.Small} hasBorder={true} withDrawal={index > 0} />
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
}