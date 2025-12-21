'use client'

import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Button from "@/app/components/ui/Button";
import Link from "@/app/components/ui/Link";
import IconButton from "@/app/components/ui/IconButton";
import { PropsPC } from "@/app/interfaces/projectProps";
import UserIcon from "@/app/components/ui/UserIcon";
import Tag from "@/app/components/ui/Tag";
import { DashboardViews, HeaderMenuItems, InputImageTypes, InputTypes, UserIconModes } from "@/app/enums/enums";
import Input from "@/app/components/ui/Input";
import Chip from "@/app/components/ui/Chip";
import ProjectTask from "@/app/components/data/ProjectTask";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";

export default function ProjectDetails({ props }: PropsPC) {
    const router: AppRouterInstance = useRouter();
    const view: number = DashboardViews.Kanban;

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

    return (
        <main className="flex flex-col bg-white w-1440">
            <Header activeMenu={HeaderMenuItems.Projects} />
            <div className={classNames}>
                <div className="flex flex-1 items-center gap-16 -ml-55">
                    <IconButton />
                    <div className="flex flex-col flex-1 gap-6">
                        <div className="flex gap-16">
                            <h4 className="text-(--grey-800)">{props.name}</h4>
                            <Link text="Modifier" url="" />
                        </div>
                        <span className="body-l text-black">{props.description}</span>
                    </div>
                    <Button text="Créer une tâche" url="" width={141} height={50} />
                    <Button text="IA" url="" width={94} height={50} image={{ url: "/images/star.svg", alt: "", width: 21, height: 21 }} color="orange" />
                </div>
                <div className="flex gap-24 bg-(--grey-100) rounded-(--radius10) pt-20 pr-50 pb-20 pl-50 items-center mt-48">
                    <div className="flex gap-8 items-center flex-1">
                        <h5 className="text-(--grey-800)">Contributeurs</h5>
                        <span className="body-m text-(--grey-600)">{props.contributors.length} personne{props.contributors.length > 1 ? "s" : null}</span>
                    </div>
                    <div className="flex gap-8">
                        {props.contributors.map((user, index) => (
                            <div key={index} className="flex items-center gap-5">
                                <UserIcon text={user.initials} mode={UserIconModes.Small} isOwner={user.initials === props.owner} hasBorder={user.initials !== props.owner} />
                                <Tag text={user.fullName} color={user.initials === props.owner ? "default" : "user"} />
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
                                <Chip text="Liste" url="/" image={{ url: "/images/task_check.svg", alt: "Image liste", width: 16, height: 16 }} isActive={view === DashboardViews.List} width={94} height={45} />
                                <Chip text="Kanban" url="/" image={{ url: "/images/calendar.svg", alt: "Image kanban", width: 15, height: 16 }} isActive={view === DashboardViews.Kanban} width={111} height={45} />
                            </div>
                            <Input name="status" type={InputTypes.Text} imageType={InputImageTypes.BottomArrow} width={152} />
                            <Input name="search" type={InputTypes.Text} imageType={InputImageTypes.Search} width={283} placeHolder="Rechercher une tâche" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-17 pr-36 pl-36">
                        {/* {props.tasks.map((task, index) => (
                            <ProjectTask key={index} props={task} />
                        ))} */}
                    </div>
                </div>
            </div >
            <Footer />
        </main>
    );
}