'use client'

import Image from "next/image";
import Tag from "./Tag";
import IconButton from "./IconButton";
import { formatDate } from "@/app/lib/utils";
import UserIcon from "./UserIcon";
import { UserIconModes, IconButtonTypes } from "@/app/enums/enums";
import Comment from "./Comment";
import { PropsTL } from "./Task";

export default function ProjectTask({ props }: PropsTL) {
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
        in_progress: "En cours",
        done: "Terminée",
        todo: "À faire",
        cancelled: "Annulée"
    }

    return (
        <div className={classNames}>
            <div className="flex">
                <div className="flex flex-col flex-1 gap-7">
                    <div className="flex flex-1 gap-8">
                        <h5 className="text-black h-25">{props.name}</h5>
                        <Tag text={tagStatusText[props.status]} color={props.status} />
                    </div>
                    <div className="body-s text-(--grey-600) h-17">{props.description}</div>
                </div>
                <IconButton type={IconButtonTypes.Points} />
            </div>
            <div className="flex calendar gap-4 items-center">
                <span className="body-xs text-(--grey-600)">Échéance :</span>
                <Image src="/images/calendar.svg" alt="Image date échéance" width={15} height={16} />
                <span className="body-xs text-(--grey-800)">{formatDate(props.date, false)}</span>
            </div>
            <div className="flex gap-8 items-center">
                <span className="body-xs text-(--grey-600)">Assigné à :</span>
                {props.assignedUsers.map((user, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <UserIcon text={user.initials} mode={UserIconModes.Small} />
                        <Tag text={user.name} color="user" />
                    </div>
                ))}
            </div>
            <hr className="h-px bg-(--grey-200) border-0" />
            <div className="flex flex-col">
                <div className="flex cursor-pointer">
                    <div className="flex body-s text-(--grey-800) flex-1">Commenaires ({props.comments?.length ?? 0})</div>
                    <div className={"flex " + (props.isCommentOpen ? "opended" : "")}>
                        <Image src="./images/bottom_arrow.svg" alt="Image commentaires ouvert ou non" width={16} height={8} />
                    </div>
                </div>
            </div>
            <div className={"flex flex-1 overflow-hidden transition-[height] duration-300 ease-out " + (!props.isCommentOpen ? "h-0 max-h-0" : "")}>
                <Comment comments={props.comments ?? []} owner="" />
            </div>
        </div>
    );
}