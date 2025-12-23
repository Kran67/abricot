'use client'

import Button from "@/app/components/ui/Button";
import Link from "@/app/components/ui/Link";
import IconButton from "@/app/components/ui/IconButton";
import UserIcon from "@/app/components/ui/UserIcon";
import Tag from "@/app/components/ui/Tag";
import { HeaderMenuItems, InputImageTypes, InputTypes, ProjectsViews, UserIconModes } from "@/app/enums/enums";
import Input from "@/app/components/ui/Input";
import Chip from "@/app/components/ui/Chip";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { use, useEffect, useState } from "react";
import { Project } from "@/app/interfaces/project";
import { getInitials } from "@/app/lib/utils";
import { useProjectsTasks } from "@/app/hooks/useProjectsTasks";
import { useProjects } from "@/app/hooks/useProjects";
import { useCookies } from 'next-client-cookies';
import ProjectTask from "@/app/components/data/ProjectTask";
import { TaskItem } from "@/app/interfaces/taskItem";
import Select, { ActionMeta } from "react-select";
import ModalCreateTask from "@/app/components/modals/ModalCreateTask";
import { createPortal } from "react-dom";
import { useUser } from "@/app/contexts/userContext";
import ModalUpdateProject from "@/app/components/modals/ModalUpdateProject";

export default function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const { tasks, refreshTasks } = useProjectsTasks(token, slug);
    const { projects, refresh } = useProjects(token);
    const [view, setView] = useState<ProjectsViews>(ProjectsViews.List);
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<{
        value: string,
        label: string,
    } | null>(null);
    const [updateProject, setUpdateProject] = useState(false);
    const user = useUser();
    const [createTask, setCreateTask] = useState(false);

    const classNames = [
        "projectdetails",
        "flex",
        "flex-col",
        "pt-57",
        "pr-100",
        "pb-181",
        "pl-100",
        "bg-(--grey-50)",
        "flex-1",
    ].join(" ");
    const statuts = [
        {
            value: "TODO",
            label: "À faire",
        },
        {
            value: "IN_PROGRESS",
            label: "En cours",
        },
        {
            value: "DONE",
            label: "Terminée",
        },
        {
            value: "CANCELLED",
            label: "Annulée",
        },
    ];

    const priorityOrder = { URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };

    tasks?.sort((a: TaskItem, b: TaskItem) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    /* pour l'affichage liste */
    const filteredTasks = tasks?.filter((task: TaskItem) => {
        const strToSearch = search.toLowerCase();

        const matchSearch = task.title.toLowerCase().includes(strToSearch) || task.description.toLowerCase().includes(strToSearch);

        const matchStatus = !status || task.status === status.value;

        return matchSearch && matchStatus;
    });

    const project: Project | undefined = projects?.find((p) => p.id === slug);
    const memberInitials = project?.members.map((m) => getInitials(m.user?.name)) ?? [];
    const members = project?.members.map((m) => m.user?.name) ?? [];
    const ownerInitials = getInitials(project?.owner?.name);
    const contributorList: { value: string, label: string | undefined }[] = project?.members.map((member) => { return { value: member.user.id, label: member.user.name } }) || [];
    const memberCount: number = members?.length ?? 0;

    useEffect(() => {
        const root = document.getElementById("app-root");
        if (!root) return;

        root.inert = createTask;
        document.body.style.overflow = createTask ? "hidden" : "";

        return () => {
            root.inert = false;
            document.body.style.overflow = "";
        };
    }, [createTask]);

    useEffect(() => {
        const root = document.getElementById("app-root");
        if (!root) return;

        root.inert = updateProject;
        document.body.style.overflow = updateProject ? "hidden" : "";

        return () => {
            root.inert = false;
            document.body.style.overflow = "";
        };
    }, [updateProject]);

    const admin: boolean = project?.ownerId === user?.id;

    return (
        <main className="flex flex-col bg-white w-1440">
            <Header activeMenu={HeaderMenuItems.Projects} />
            <div className={classNames}>
                <div className="flex flex-1 items-center gap-16 -ml-55">
                    <IconButton />
                    <div className="flex flex-col flex-1 gap-6">
                        <div className="flex gap-16">
                            <h4 className="text-(--grey-800)">{project?.name}</h4>
                            {admin && <Link text="Modifier" onClick={() => setUpdateProject(true)} />}
                            {updateProject &&
                                createPortal(
                                    <ModalUpdateProject
                                        closeModal={(isModified: boolean) => {
                                            setUpdateProject(false);
                                            if (isModified) refresh();
                                        }}
                                        project={project}
                                        onSuccess={() => {
                                            refresh();
                                            setUpdateProject(false);
                                        }}
                                    />,
                                    document.body
                                )}
                        </div>
                        <span className="body-l text-black">{project?.description}</span>
                    </div>
                    <Button text="Créer une tâche" width={141} height={50} onClick={() => setCreateTask(true)} />
                    {createTask && createPortal(
                        <ModalCreateTask
                            projectId={project?.id}
                            contributorList={contributorList}
                            closeModal={() => setCreateTask(false)}
                            onSuccess={() => {
                                refreshTasks();
                                setCreateTask(false);
                            }}
                        />,
                        document.body
                    )}
                    {/* <Button text="IA" width={94} height={50} image={{ url: "/images/star.svg", alt: "", width: 21, height: 21 }} color="orange" /> */}
                </div>
                <div className="flex gap-24 bg-(--grey-100) rounded-(--radius10) pt-20 pr-50 pb-20 pl-50 items-center mt-48">
                    <div className="flex gap-8 items-center flex-1">
                        <h5 className="text-(--grey-800)">Contributeurs</h5>
                        <span className="body-m text-(--grey-600)">{memberCount} personne{memberCount > 1 ? "s" : null}</span>
                    </div>
                    <div className="flex gap-8">
                        {memberInitials?.map((member: string, index: number) => (
                            <div key={index} className="flex items-center gap-5">
                                <UserIcon text={member} mode={UserIconModes.Small} isOwner={member === ownerInitials} hasBorder={member !== ownerInitials} />
                                <Tag text={ownerInitials === member ? "Propriétaire" : members?.[index]} color={member === ownerInitials ? "DEFAULT" : "USER"} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-41 border border-solid border-(--grey-200) pt-40 pr-59 pb-40 pl-59 rounded-(--radius10) bg-(--white) mt-35">
                    <div className="flex gap-24 justify-between">
                        <div className="flex flex-col gap-8">
                            <h5 className="text-(--grey800)">Tâches</h5>
                            <span className="body-m text-(--grey-600)">Par ordre de priorité</span>
                        </div>
                        <div className="flex flex gap-16 items-center">
                            <div className="flex flex gap-10">
                                <Chip
                                    text="Liste"
                                    image={{ url: "/images/task_check.svg", alt: "Image liste", width: 16, height: 16 }}
                                    isActive={view === ProjectsViews.List}
                                    width={94}
                                    height={45}
                                    onClickFunc={() => setView(ProjectsViews.List)}
                                />
                                <Chip
                                    text="Calendrier"
                                    image={{ url: "/images/calendar.svg", alt: "Image kanban", width: 15, height: 16 }}
                                    isActive={view === ProjectsViews.Calendar}
                                    width={111}
                                    height={45}
                                    onClickFunc={() => setView(ProjectsViews.Calendar)}
                                />
                            </div>
                            <Select
                                className="status-drop-down"
                                classNamePrefix="status-drop-down"
                                name="status"
                                options={statuts}
                                isClearable={true}
                                isSearchable={true}
                                placeholder="Statut"
                                onChange={(option: { value: string, label: string } | null, actionMeta: ActionMeta<any>) => setStatus(option)}
                            />
                            <Input
                                name="search"
                                type={InputTypes.Text}
                                imageType={InputImageTypes.Search}
                                width={283}
                                placeHolder="Rechercher une tâche"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-17 pr-36 pl-36">
                        {filteredTasks?.map((taskItem, index) => (
                            <ProjectTask key={index} task={taskItem} contributorList={contributorList} refreshTasks={refreshTasks} />
                        ))}
                    </div>
                </div>
            </div >
            <Footer />
        </main>
    );
}