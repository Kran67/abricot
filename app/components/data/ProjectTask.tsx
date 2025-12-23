'use client'

import Image from "next/image";
import Tag from "@/app/components/ui/Tag";
import IconButton from "@/app/components/ui/IconButton";
import { formatDate, getInitials } from "@/app/lib/utils";
import UserIcon from "@/app/components/ui/UserIcon";
import { UserIconModes, IconButtonTypes } from "@/app/enums/enums";
import Comment from "@/app/components/data/Comment";
import { useEffect, useState } from "react";
import { TaskItem } from "@/app/interfaces/taskItem";
import { User } from "@/app/interfaces/user";
import { createPortal } from "react-dom";
import ModalUpdateTask from "../modals/ModalUpdateTask";

export interface PropsTL {
    task: TaskItem;
    contributorList: { value: string, label: string | undefined }[];
    refreshTasks: () => void;
}

export default function ProjectTask({ task, contributorList, refreshTasks }: PropsTL) {
    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [updateTask, setUpdateTask] = useState(false);

    const classNames = [
        "project-task",
        "flex",
        "flex-col",
        "rounded-(--radius10)",
        "bg-(--white)",
        "pt-25",
        "pr-40",
        "pb-25",
        "pl-40",
        "justify-between",
        "border",
        "border-solid",
        "border-(--grey-200)",
        "self-stretch",
        "gap-24"
    ].join(" ");

    const tagStatusText: { [key: string]: string } = {
        IN_PROGRESS: "En cours",
        DONE: "Terminée",
        TODO: "À faire",
        CANCELLED: "Annulée"
    }

    useEffect(() => {
        const root = document.getElementById("app-root");
        if (!root) return;

        root.inert = updateTask;
        document.body.style.overflow = updateTask ? "hidden" : "";

        return () => {
            root.inert = false;
            document.body.style.overflow = "";
        };
    }, [updateTask]);

    return (
        <div className={classNames}>
            <div className="flex">
                <div className="flex flex-col flex-1 gap-7">
                    <div className="flex flex-1 gap-8">
                        <h5 className="text-black h-25">{task.title}</h5>
                        <Tag text={tagStatusText[task.status]} color={task.status} />
                    </div>
                    <div className="body-s text-(--grey-600) h-17">{task.description}</div>
                </div>
                <IconButton type={IconButtonTypes.Points} onClick={() => setUpdateTask(true)} />
                {updateTask &&
                    createPortal(
                        <ModalUpdateTask
                            refresh={refreshTasks}
                            task={task}
                            closeModal={() => setUpdateTask(false)}
                            onSuccess={() => {
                                setUpdateTask(false);
                                refreshTasks();
                            }}
                            contributorList={contributorList}
                        />,
                        document.body
                    )}
            </div>
            <div className="flex calendar gap-4 items-center">
                <span className="body-xs text-(--grey-600)">Échéance :</span>
                <Image src="/images/calendar.svg" alt="Image date échéance" width={15} height={16} />
                <span className="body-xs text-(--grey-800)">{formatDate(new Date(task.dueDate), false)}</span>
            </div>
            <div className="flex gap-8 items-center">
                <span className="body-xs text-(--grey-600)">Assigné à :</span>
                {task.assignees.map((assignee, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <UserIcon text={getInitials(assignee.user.name)} mode={UserIconModes.Small} />
                        <Tag text={assignee.user.name} color="USER" />
                    </div>
                ))}
            </div>
            <hr className="h-px bg-(--grey-200) border-0" />
            <div className="flex flex-col">
                <div className="flex cursor-pointer" onClick={() => setIsCommentOpen(!isCommentOpen)}>
                    <div className="flex body-s text-(--grey-800) flex-1">Commenaires ({task.comments.length ?? 0})</div>
                    <div className={"flex transition-rotate duration-300 ease-out " + (isCommentOpen ? "opended" : "")}>
                        <Image src="/images/bottom_arrow.svg" alt="Image commentaires ouvert ou non" width={16} height={8} />
                    </div>
                </div>
            </div>
            <div className={"flex flex-1 overflow-hidden " + (!isCommentOpen ? "h-0 max-h-0" : "")}>
                <Comment props={task.comments ?? []} />
            </div>
        </div>
    );
}