'use client'

import { TaskItem } from "@/app/interfaces/taskItem";
import dayGridPlugin from '@fullcalendar/daygrid';// a plugin!
import FullCalendar from "@fullcalendar/react";
import frLocale from '@fullcalendar/core/locales/fr';
import { formatYMMDD } from "@/app/lib/utils";

export interface PropsPC {
    tasks: TaskItem[] | undefined;
}

export default function ProjectCalendar({ tasks }: PropsPC) {

    const classNames: string = [
        "project-calendar",
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

    const colors: { [key: string]: string } = {
        DONE: "var(--success-light)",
        TODO: "var(--error-light)",
        IN_PROGRESS: "var(--warning-light)",
        USER: "var(--grey-200)",
        DEFAULT: "var(--light-orange)",
    };

    const events: {
        title: string;
        date: string;
        color: string
    }[] | undefined = tasks?.map((task: TaskItem) => {
        return {
            title: task.title,
            date: formatYMMDD(new Date(task.dueDate)),
            color: colors[task.status],
            textColor: "var(--grey-800)"
        }
    });

    return (
        <div className={classNames}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
                locale={frLocale}
                events={events}
            />
        </div>
    )
}
