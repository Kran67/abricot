'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Input from "../components/client/Input";
import { InputTypes } from "../enums/enums";
import Button from "../components/client/Button";
import Link from "../components/client/Link";
import ProjectCardProps from "../interfaces/projectProps";
import { projects } from "../mocks/projects";
import ProjectCard from "../components/client/ProjectCard";

export default function Projects() {
    const router: AppRouterInstance = useRouter();

    const classNames = [
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

    return (
        <div className={classNames}>
            <div className="flex flex-1 items-center">
                <div className="flex flex-col flex-1 gap-6">
                    <h4 className="text-(--grey-800)">Mes projets</h4>
                    <span className="body-l text-black">Gérez vos projets</span>
                </div>
                <Button text="+ Créer un projet" url="" width={181} height={50} />
            </div>
            <div className="grid grid-cols-3 gap-16" style={{ "gridTemplateRows": `repeat(${projects.length / 3}, 1fr)` }}>
                {projects.map((project, index) => (
                    <ProjectCard key={index} props={project} />
                ))}
            </div>
        </div >
    );
}