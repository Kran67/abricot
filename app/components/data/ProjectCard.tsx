'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import UserIcon from "@/app/components/ui/UserIcon";
import { UserIconModes } from "@/app/enums/enums";
import Tag from "@/app/components/ui/Tag";
import { Project } from "@/app/interfaces/project";
import { getInitials } from "@/app/lib/utils";
import { useProjectsTasks } from "@/app/hooks/useProjectsTasks";
import { TaskItem } from "@/app/interfaces/taskItem";
//import { TaskProps } from "@/app/components/data/Task";

interface PropsPC {
    props: Project;
}

export default function ProjectCard({ props }: PropsPC) {
    const router: AppRouterInstance = useRouter();

    const handleClick = (projectId: string) => {
        router.push(`/projects/${projectId}`);
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

    const nbTotalTasks: number = props._count?.tasks || 0;
    const nbTaskDone: number = props.tasks?.filter((task: TaskItem) => task.status === "DONE").length ?? 0;

    const totalTasks = `${nbTaskDone}/${nbTotalTasks} tâche${nbTotalTasks > 1 ? "s" : ""} terminée${nbTotalTasks > 1 ? "s" : ""}`;
    const memberInitials = props.members.map((m) => getInitials(m.user?.name));
    const ownerInitials = getInitials(props.owner?.name);
    //const doneTasks = props.tasks?.filter((task) => task.status === "DONE");
    const progressValue: number = (nbTaskDone * 100) / nbTotalTasks || 0;

    return (
        <a href="#" onClick={() => handleClick(props.id)}>
            <div className={classNames}>
                <div className="flex flex-col flex-1 gap-8">
                    <h5 className="text-(--grey-800)">{props.name}</h5>
                    <div className="body-s text-(--grey-600)">{props.description}</div>
                </div>
                <div className="flex flex-col gap-16">
                    <div className="flex justify-between">
                        <div className="body-xs text-(--grey-600)">Progession</div>
                        <div className="body-xs text-(--grey-800)">{progressValue}%</div>
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="progress rounded-(--radius40) bg-(--grey-200) h-7 relative" style={{ ["--progress" as string]: `${progressValue}%` }}></div>
                        <div className="body-2xs text-(--grey-600)">{totalTasks}</div>
                    </div>
                </div>
                <div className="flex flex-col gap-15">
                    <div className="flex gap-8 body-2xs text-(--grey-600)">
                        <Image src="/images/users.svg" alt="Image équipe" width={11} height={11} />
                        Équipe ({props.members.length + 1})
                    </div>
                    <div className="flex gap-4">
                        <div className="flex gap-5">
                            <UserIcon text={ownerInitials} isOwner={true} mode={UserIconModes.Small} />
                            <Tag text="Propriètaire" />
                        </div>
                        <div className="flex">
                            {memberInitials.map((user, index) => (
                                <UserIcon key={index} text={user} mode={UserIconModes.Small} hasBorder={true} withDrawal={index > 0} />
                            ))}
                        </div>
                    </div>
                </div>
            </div >
        </a>
    );
}