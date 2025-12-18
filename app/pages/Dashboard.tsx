'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Input from "../components/client/Input";
import Button from "../components/client/Button";
import Link from "../components/client/Link";
import Chip from "../components/client/Chip";
import { DashboardViews, InputImageTypes } from "../enums/enums";
import Task, { TaskProps } from "../components/client/Task";
import Tag from "../components/client/Tag";

export default function Dashboard() {
    const router: AppRouterInstance = useRouter();
    const view: number = DashboardViews.Kanban;
    const tasks: TaskProps[] = [
        { name: "Nom de la tâche", description: "Description de la tâche", status: "todo", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
        { name: "Nom de la tâche", description: "Description de la tâche", status: "in_progress", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
        { name: "Nom de la tâche", description: "Description de la tâche", status: "todo", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
        { name: "Nom de la tâche", description: "Description de la tâche", status: "todo", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
        { name: "Nom de la tâche", description: "Description de la tâche", status: "todo", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
        { name: "Nom de la tâche", description: "Description de la tâche", status: "todo", projectName: "Nom du projet", date: new Date(), nbComments: 2 },
    ];

    const classNames = [
        "dashboard",
        "flex",
        "flex-col",
        "pt-57",
        "pr-100",
        "pb-181",
        "pl-100",
        "bg-(--grey-50)",
        "flex-1"
    ].join(" ");

    const todoTasks: TaskProps[] = tasks.filter((task) => task.status === "todo");
    const inProgressTasks: TaskProps[] = tasks.filter((task) => task.status === "in_progress");
    const doneTasks: TaskProps[] = tasks.filter((task) => task.status === "done");

    const nbTodoTasks: string = todoTasks.length.toString();
    const nbInProgressTasks: string = inProgressTasks.length.toString();
    const nbDoneTasks: string = doneTasks.length.toString();

    return (
        <div className={classNames}>
            <div className="flex flex-1 items-center">
                <div className="flex flex-col flex-1 gap-6">
                    <h4 className="text-(--grey-800)">Tableau de bord</h4>
                    <span className="body-l text-black">Bonjour { }, voici un aperçu de vos projets et tâches</span>
                </div>
                <Button text="+ Créer un projet" url="" width={181} height={50} />
            </div>
            <div className="flex gap-10 mt-60">
                <Chip text="Liste" url="" image={{ url: "/images/task_check.svg", alt: "Image liste", width: 16, height: 16 }} isActive={true} width={94} height={45} />
                <Chip text="Kanban" url="" image={{ url: "/images/calendar.svg", alt: "Image liste", width: 15, height: 16 }} width={111} height={45} />
            </div>
            {view === DashboardViews.List
                ? <div className="flex flex-col gap-41 border border-solid border-(--grey-200) bg-(--white) pt-40 pr-59 pb-40 pl-59 rounded-(--radius10) mt-30">
                    <div className="flex flex-1 items-center">
                        <div className="flex flex-col w-763 gap-6">
                            <h4 className="text-(--grey-800)">Mes tâches assignées</h4>
                            <span className="body-l text-black">Par ordre de priorité</span>
                        </div>
                        <Input name="search" placeHolder="Rechercher une tâche" imageType={InputImageTypes.Search} width={357} />
                    </div>
                    <div className="flex flex-col gap-17">
                        {tasks.map((task, index) => (
                            <Task key={index} props={task} />
                        ))}
                    </div>
                </div>
                : <div className="flex gap-22 -ml-24 mt-40">
                    <div className="flex flex-col gap-41 rounded-(--radius10) max-w-419 min-w-419 border border-solid border-(--error-light) pt-40 pr-24 pb-40 pl-24 bg-(--white)">
                        <div className="flex gap-8">
                            <h5 className="text-(--grey-800)">À faire</h5>
                            <Tag text={nbTodoTasks} color="user" />
                        </div>
                        <div className="flex flex-col gap-16">
                            {todoTasks.map((task, index) => (
                                <Task key={index} props={task} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-41 rounded-(--radius10) max-w-419 min-w-419 border border-solid border-(--error-light) pt-40 pr-24 pb-40 pl-24 bg-(--white)">
                        <div className="flex gap-8">
                            <h5 className="text-(--grey-800)">En cours</h5>
                            <Tag text={nbInProgressTasks} color="user" />
                        </div>
                        <div className="flex flex-col gap-16">
                            {inProgressTasks.map((task, index) => (
                                <Task key={index} props={task} />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-41 rounded-(--radius10) max-w-419 min-w-419 border border-solid border-(--error-light) pt-40 pr-24 pb-40 pl-24 bg-(--white)">
                        <div className="flex gap-8">
                            <h5 className="text-(--grey-800)">Terminées</h5>
                            <Tag text={nbDoneTasks} color="user" />
                        </div>
                        <div className="flex flex-col gap-16">
                            {doneTasks.map((task, index) => (
                                <Task key={index} props={task} />
                            ))}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}