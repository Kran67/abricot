'use client'

import Image from "next/image";
import Tag from "./Tag";
import Button from "./Button";
import { formatDate } from "@/app/lib/utils";

interface TaskProps {
    name: string;
    description: string;
    status: string;
    projectName: string;
    date: Date;
    nbComments: number;
}

export default function Task({ name, description, status, projectName, date, nbComments }: TaskProps) {
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
        "self-stretch"
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
                <div className="flex flex-col flex-1">
                    <h5 className="text-black h-25">{name}</h5>
                    <div className="body-s text-(--grey-600) h-17">{description}</div>
                </div>
                <Tag text={tagStatusText[status]} color={status} />
            </div>
            <div className="flex flex-wrap">
                <div className="flex items-center h-50 self-end mt-32 flex-1">
                    <div className="project-image-wrapper w-18 h-14 bg-(--grey-600)"></div>
                    <span className="body-xs text-(--grey-600) pl-8 whitespace-nowrap">{projectName}</span>
                    <span className="body-2xs pl-15 pr-15">|</span>
                    <Image src="/images/calendar.svg" alt="Image projet" width={15} height={16} />
                    <span className="body-xs text-(--grey-600) pl-8 whitespace-nowrap">{formatDate(date, false)}</span>
                    <span className="body-2xs pl-15 pr-15">|</span>
                    <Image src="/images/comment.svg" alt="Image projet" width={15} height={15} />
                    <span className="body-xs text-(--grey-600) pl-8">{nbComments}</span>
                </div>
                <Button className="mt-32" text="Voir" disabled={false} url="/" width={121} height={50} />
            </div>
        </div>
    );
}