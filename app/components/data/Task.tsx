'use client'

import Image from "next/image";
import Tag from "@/app/components/ui/Tag";
import Button from "@/app/components/ui/Button";
import { formatDate } from "@/app/lib/utils";
import { TaskItem } from "@/app/interfaces/taskItem";

export interface PropsTL {
    props: TaskItem;
}

export default function Task({ props }: PropsTL) {
    const classNames = [
        "task",
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
        "flex-1"
    ].join(" ");

    const tagStatusText: { [key: string]: string } = {
        IN_PROGRESS: "En cours",
        DONE: "Terminée",
        TODO: "À faire",
        CANCELLED: "Annulée"
    }

    return (
        <div className={classNames}>
            <div className="flex">
                <div className="flex flex-col flex-1">
                    <h5 className="text-black h-25">{props.title}</h5>
                    <div className="body-s text-(--grey-600) h-17">{props.description}</div>
                </div>
                <Tag text={tagStatusText[props.status]} color={props.status} />
            </div>
            <div className="flex flex-wrap">
                <div className="flex items-center h-50 self-end mt-32 flex-1">
                    <div className="project-image-wrapper min-w-18 min-h-14 bg-(--grey-600)"></div>
                    <span className="body-xs text-(--grey-600) pl-8 whitespace-nowrap">{props.projectName}</span>
                    <span className="body-2xs pl-15 pr-15">|</span>
                    <Image src="/images/calendar.svg" alt="Image projet" width={15} height={16} />
                    <span className="body-xs text-(--grey-600) pl-8 whitespace-nowrap">{formatDate(new Date(props.dueDate), false)}</span>
                    <span className="body-2xs pl-15 pr-15">|</span>
                    <Image src="/images/comment.svg" alt="Image projet" width={15} height={15} />
                    <span className="body-xs text-(--grey-600) pl-8">{props.comments.length}</span>
                </div>
                <Button className="mt-32" text="Voir" disabled={false} url={`/projects/${props.projectId}`} width={121} height={50} />
            </div>
        </div>
    );
}