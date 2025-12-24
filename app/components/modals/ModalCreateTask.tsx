"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Select from 'react-select';
import Button from "@/app/components/ui/Button";
import { Cookies, useCookies } from "next-client-cookies";
import Tag from "@/app/components/ui/Tag";

export default function ModalCreateTask({
    projectId,
    contributorList,
    closeModal,
    onSuccess,
}: {
    projectId?: string;
    contributorList: { value: string, label: string | undefined }[];
    closeModal: () => void;
    onSuccess: () => void;
}) {
    const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH" | "URGENT">("LOW");
    const cookies: Cookies = useCookies();
    const token: string | undefined = cookies.get("token");

    const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form: EventTarget & HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(form);

        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/tasks`, {
            method: "POST",
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                priority: priority,
                dueDate: new Date(formData.get("dueDate") as string).toISOString(),
                assigneeIds: formData.getAll("assignees")
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("La tâche à bien été créee");
            onSuccess();
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la création de la tâche<br />{data.message}</div>);
        }
    };

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent): void => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, []);

    return (
        <aside className="absolute inset-0 bg-(--grey-200)/50 flex items-center justify-center z-1" onClick={closeModal}>
            <div
                className="bg-(--white) relative px-36 py-40 md:px-73 md:py-79 rounded-(--radius10) flex flex-col gap-40 w-598"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-(--grey-800)">Créer une tâche</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24" role="form" aria-label="Information de la tâche">
                    <Input name="title" label="Titre" type={InputTypes.Text} required={true} maxLength={200} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} maxLength={1000} />
                    <Input name="dueDate" label="Echéance" type={InputTypes.Date} required={true} />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="assignees">Assigné à</label>
                        <Select
                            options={contributorList}
                            noOptionsMessage={(obj: { inputValue: string }) => "Aucun utilisateur trouvé"}
                            loadingMessage={(obj: { inputValue: string }) => "Récupération des utilisateurs..."}
                            className="contributors-drop-down"
                            classNamePrefix="contributors-drop-down"
                            name="assignees"
                            isMulti={true}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Choisir un ou plusieurs collaborateurs"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Priorité</label>
                        <input type="hidden" name="priority" value={priority} />
                        <div className="flex gap-2 overflow-auto">
                            <Tag text="Urgente" color={priority === "URGENT" ? "TODO" : "USER"} onClick={() => setPriority("URGENT")} />
                            <Tag text="Élevée" color={priority === "HIGH" ? "DEFAULT" : "USER"} onClick={() => setPriority("HIGH")} />
                            <Tag text="Moyenne" color={priority === "MEDIUM" ? "IN_PROGRESS" : "USER"} onClick={() => setPriority("MEDIUM")} />
                            <Tag text="Faible" color={priority === "LOW" ? "DONE" : "USER"} onClick={() => setPriority("LOW")} />
                        </div>
                    </div>
                    <Button text="Ajouter une tâche" width={181} height={50} />
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={closeModal} role="button">
                    <Image src="/images/cross.svg" height={15} width={15} alt="Image fermer" />
                </button>
            </div>
        </aside>
    );
}