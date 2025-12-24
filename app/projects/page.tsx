'use client'

import Button from "@/app/components/ui/Button";
import ProjectCard from "@/app/components/data/ProjectCard";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { HeaderMenuItems } from "@/app/enums/enums";
import { useProjects } from "@/app/hooks/useProjects";
import { Cookies, useCookies } from 'next-client-cookies';
import { useEffect, useState } from "react";
import ModalCreateProject from "@/app/components/modals/ModalCreateProject";
import { createPortal } from "react-dom";
import { prepareBodyToShowModal } from "../lib/utils";

export default function Projects() {
    const cookies: Cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const { projects, refresh } = useProjects(token);
    const [showModal, setShowModal] = useState(false);

    const classNames: string = [
        "projects",
        "flex",
        "flex-col",
        "pt-57",
        "pr-100",
        "pb-181",
        "pl-100",
        "bg-(--grey-50)",
        "flex-1",
        "gap-32"
    ].join(" ");
    const projectCount: number = projects?.length ?? 0;

    useEffect(() => {
        prepareBodyToShowModal(showModal ? "hidden" : "");
    }, [showModal]);

    return (
        <main className="flex flex-col bg-white w-1440">
            <Header activeMenu={HeaderMenuItems.Projects} />
            <div className={classNames}>
                <div className="flex flex-row flex-1 items-center">
                    <div className="flex flex-col flex-1 gap-6">
                        <h4 className="text-(--grey-800)">Mes projets</h4>
                        <span className="body-l text-black">Gérez vos projets</span>
                    </div>
                    <Button text="+ Créer un projet" width={181} height={50} onClick={() => setShowModal(true)} />
                    {showModal && createPortal(
                        <ModalCreateProject
                            closeModal={() => setShowModal(false)}
                            onSuccess={() => {
                                refresh();
                                setShowModal(false);
                            }}
                        />,
                        document.body
                    )}
                </div>
                <div className="flex flex-col lg:grid grid-cols-3 gap-16" style={{ "gridTemplateRows": `repeat(${projectCount / 3}, 1fr)` }}>
                    {projects?.map((project, index) => (
                        <ProjectCard key={index} props={project} />
                    ))}
                </div>
            </div >
            <Footer />
        </main>
    );
}