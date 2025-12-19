'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import UserIcon from "@/app/components/ui/UserIcon";
import { UserIconModes } from "@/app/enums/enums";
import Tag from "@/app/components/ui/Tag";
import ProjectCardProps from "@/app/interfaces/projectProps";
import { TaskProps } from "@/app/components/data/Task";

interface PropsPC {
    props: ProjectCardProps;
}

export default function ProjectCard({ props }: PropsPC) {
    const router: AppRouterInstance = useRouter();

    const handleClick = () => {
        router.push("");
    };

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

    const nbTotalTasks: number = props.tasks.length;
    const nbTaskDone: number = props.tasks.filter((task: TaskProps) => task.status === "done").length;

    const totalTasks = `${nbTaskDone}/${nbTotalTasks} tâche${nbTotalTasks > 1 ? "s" : ""} terminée${nbTotalTasks > 1 ? "s" : ""}`;
    const progressValue = { "--progress": `${props.progress}%` };

    return (
        <a href="#" onClick={handleClick}>
            <div className={classNames}>
                <div className="flex flex-col flex-1 gap-8">
                    <h5 className="text-(--grey-800)">{props.name}</h5>
                    <div className="body-s text-(--grey-600)">{props.description}</div>
                </div>
                <div className="flex flex-col gap-16">
                    <div className="flex justify-between">
                        <div className="body-xs text-(--grey-600)">Progession</div>
                        <div className="body-xs text-(--grey-800)">{props.progress ?? 0}%</div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="progress rounded-(--radius40) bg-(--grey-200) h-7 relative" style={progressValue}></div>
                        <div className="body-2xs text-(--grey-600)">{totalTasks}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-15">
                    <div className="flex gap-8 body-2xs text-(--grey-600)">
                        <Image src="/images/users.svg" alt="Image équipe" width={11} height={11} />
                        {props.team}
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-5">
                            <UserIcon text={props.owner} isOwner={true} mode={UserIconModes.Small} />
                            <Tag text="Propriètaire" />
                        </div>
                        <div className="flex">
                            {props.contributors.map((user, index) => (
                                <UserIcon key={index} text={user.initials} mode={UserIconModes.Small} hasBorder={true} withDrawal={index > 0} />
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </a>
    );
}