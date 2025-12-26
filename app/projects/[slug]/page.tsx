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
import { getInitials, prepareBodyToShowModal } from "@/app/lib/utils";
import { useProjectsTasks } from "@/app/hooks/useProjectsTasks";
import { useProjects } from "@/app/hooks/useProjects";
import { Cookies, useCookies } from 'next-client-cookies';
import ProjectTask from "@/app/components/data/ProjectTask";
import { TaskItem } from "@/app/interfaces/taskItem";
import ModalCreateTask from "@/app/components/modals/ModalCreateTask";
import { createPortal } from "react-dom";
import { useUser } from "@/app/contexts/userContext";
import ModalUpdateProject from "@/app/components/modals/ModalUpdateProject";
import ProjectCalendar from "@/app/components/data/ProjectCalendar";
import { User } from "@/app/interfaces/user";
import Select from 'react-select';

export default function ProjectDetails({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const cookies: Cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const { tasks, refreshTasks } = useProjectsTasks(token, slug);
    const { projects, refresh } = useProjects(token);
    const [view, setView] = useState<ProjectsViews>(ProjectsViews.List);
    const [search, setSearch] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [updateProject, setUpdateProject] = useState(false);
    const user: User | null = useUser();
    const [createTask, setCreateTask] = useState(false);

    const classNames: string = [
        "projectdetails",
        "flex",
        "flex-col",
        "pt-28",
        "pr-50",
        "pb-90",
        "pl-50",
        "md:pt-57",
        "md:pr-100",
        "md:pb-181",
        "md:pl-100",
        "bg-(--grey-50)",
        "w-full",
    ].join(" ");
    const statuts: {
        value: string;
        label: string;
    }[] = [
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

    const priorityOrder: {
        URGENT: number;
        HIGH: number;
        MEDIUM: number;
        LOW: number;
    } = { URGENT: 1, HIGH: 2, MEDIUM: 3, LOW: 4 };

    tasks?.sort((a: TaskItem, b: TaskItem) => {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    /* pour l'affichage liste */
    const filteredTasks: TaskItem[] | undefined = tasks?.filter((task: TaskItem) => {
        const strToSearch: string = search.toLowerCase();

        const matchSearch: boolean = task.title.toLowerCase().includes(strToSearch) || task.description.toLowerCase().includes(strToSearch);

        const matchStatus: boolean = !status || task.status === status;

        return matchSearch && matchStatus;
    });

    const project: Project | undefined = projects?.find((p) => p.id === slug);
    const memberInitials: string[] = project?.members.map((m) => getInitials(m.user?.name)) ?? [];
    const members: (string | undefined)[] = project?.members.map((m) => m.user?.name) ?? [];
    const ownerInitials: string = getInitials(project?.owner?.name);
    const contributorList: { value: string, label: string | undefined }[] = project?.members.map((member) => { return { value: member.user.id, label: member.user.name } }) || [];
    const memberCount: number = members?.length ?? 0;

    useEffect(() => {
        prepareBodyToShowModal(createTask ? "hidden" : "");
    }, [createTask]);

    useEffect(() => {
        prepareBodyToShowModal(updateProject ? "hidden" : "");
    }, [updateProject]);

    const admin: boolean = project?.ownerId === user?.id;

    return (
        <main className="flex flex-col bg-white w-full">
            <Header activeMenu={HeaderMenuItems.Projects} />
            <div className={classNames}>
                <div className="flex flex-col md:flex-row flex-1 md:items-center gap-16 md:-ml-55">
                    <IconButton />
                    <div className="flex flex-col flex-1 gap-6">
                        <div className="flex gap-16 whitespace-nowrap">
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
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 bg-(--grey-100) rounded-(--radius10) pt-10 pr-25 pb-10 pl-25 md:pt-20 md:pr-50 md:pb-20 md:pl-50 md:items-center mt-24 md:mt-48">
                    <div className="flex gap-8 items-center flex-1">
                        <h5 className="text-(--grey-800)">Contributeurs</h5>
                        <span className="body-m text-(--grey-600) whitespace-nowrap">{memberCount} personne{memberCount > 1 ? "s" : null}</span>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8">
                        {memberInitials?.map((member: string, index: number) => (
                            <div key={index} className="flex items-center gap-5">
                                <UserIcon text={member} mode={UserIconModes.Small} isOwner={member === ownerInitials} hasBorder={member !== ownerInitials} />
                                <Tag text={ownerInitials === member ? "Propriétaire" : members?.[index]} color={member === ownerInitials ? "DEFAULT" : "USER"} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col md:gap-41 border border-solid border-(--grey-200) pt-20 pr-30 pb-20 pl-30 md:pt-40 md:pr-59 md:pb-40 md:pl-59 rounded-(--radius10) bg-(--white) mt-17 md:mt-35">
                    <div className="flex flex-col lg:flex-row md:gap-24 justify-between">
                        <div className="flex flex-col gap-8">
                            <h5 className="text-(--grey800)">Tâches</h5>
                            <span className="body-m text-(--grey-600)">Par ordre de priorité</span>
                        </div>
                        <div className="flex flex-row flex-wrap lg:flex-row gap-16 items-center">
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
                            <label htmlFor="status" className="invisible w-0 h-0">Filter par statut</label>
                            <label htmlFor="react-select-2-input" className="invisible w-0 h-0">Choisir un ou plusieurs collaborateurs</label>
                            <Select
                                options={statuts}
                                className="status-drop-down"
                                classNamePrefix="status-drop-down"
                                name="status"
                                id="status"
                                isMulti={false}
                                isClearable={true}
                                isSearchable={false}
                                placeholder="Statuts"
                                onChange={(e) => setStatus(e?.value ?? "")}
                            />
                            {/* <select
                                id="status"
                                className="monster-select w-152 h-53 border border-(--grey-200) border-solid rounded-(--radius8) body-s outline-0"
                                onChange={(e) => setStatus(e.target.value)}>
                                <option key="-1" value="" label="Tous les statuts"></option>
                                {statuts.map((status, index) => (
                                    <option key={index} value={status.value} className="bg-(--light-red)" label={status.label}></option>
                                ))}
                            </select> */}
                            <label htmlFor="search" className="invisible">Rechercher une tâche</label>
                            <Input
                                name="search"
                                type={InputTypes.Text}
                                imageType={InputImageTypes.Search}
                                className="min-w-200 xl:w-283"
                                placeHolder="Rechercher une tâche"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-17 pr-36 pl-36">
                        {view === ProjectsViews.List ?
                            (filteredTasks?.map((taskItem, index) => (
                                <ProjectTask key={index} task={taskItem} contributorList={contributorList} refreshTasks={refreshTasks} />
                            )))
                            :
                            <ProjectCalendar tasks={filteredTasks} />
                        }
                    </div>
                </div>
            </div >
            <Footer />
        </main>
    );
}