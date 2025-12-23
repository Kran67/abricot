"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import Select from 'react-select';
import Button from "@/app/components/ui/Button";
import { useCookies } from "next-client-cookies";
import Tag from "@/app/components/ui/Tag";
import { TaskAssignee, TaskItem } from "@/app/interfaces/taskItem";
import { formatYMMDD } from "@/app/lib/utils";

export default function ModalCreateTask({
    task,
    refresh,
    contributorList,
    closeModal,
    onSuccess,
}: {
    task: TaskItem;
    refresh: () => void;
    contributorList: { value: string, label: string | undefined }[];
    closeModal: () => void;
    onSuccess: () => void;
}) {
    const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH" | "URGENT">("LOW");
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [date, setDate] = useState<string>(task.dueDate);
    const [status, setStatus] = useState<"TODO" | "IN_PROGRESS" | "DONE" | "CANCELLED">(task.status);
    const assignees: { value: string, label: string | undefined }[] = task.assignees.map((assignee: TaskAssignee) => {
        return { value: assignee.user.id, label: assignee.user.name }
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${task.projectId}/tasks/${task.id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                priority: priority,
                dueDate: new Date(formData.get("dueDate") as string).toISOString(),
                status: status,
                assigneeIds: formData.getAll("assignees")
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("La tâche à bien été modifiée");
            onSuccess();
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la modification de la tâche<br />{data.message}</div>);
        }
    };

    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const ok = window.confirm("Êtes-vous sûr de vouloir supprimer cette tache ?");

        if (!ok) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${task.projectId}/tasks/${task.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("La tâche a bien été supprimé");
            refresh()
            closeModal()
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la suppression de la tâche<br />{data.message}</div>);
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
        <aside className="fixed inset-0 bg-(--grey-200)/50 flex items-center justify-center" onClick={closeModal}>
            <div
                className="bg-(--white) relative px-73 py-79 rounded-(--radius10) flex flex-col gap-40 w-598"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-(--grey-800)">Modifier une tâche</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24">
                    <Input name="title" label="Titre" type={InputTypes.Text} required={true} maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} maxLength={1000} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <Input name="dueDate" label="Echéance" type={InputTypes.Date} required={true} value={formatYMMDD(new Date(date))} onChange={(e) => setDate(e.target.value)} />
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
                            defaultValue={assignees}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Priorité</label>
                        <input type="hidden" name="priority" value={status} />
                        <div className="flex gap-2 overflow-auto">
                            <Tag text="Urgente" color={priority === "URGENT" ? "TODO" : "USER"} onClick={() => setPriority("URGENT")} />
                            <Tag text="Élevée" color={priority === "HIGH" ? "DEFAULT" : "USER"} onClick={() => setPriority("HIGH")} />
                            <Tag text="Moyenne" color={priority === "MEDIUM" ? "IN_PROGRESS" : "USER"} onClick={() => setPriority("MEDIUM")} />
                            <Tag text="Faible" color={priority === "LOW" ? "DONE" : "USER"} onClick={() => setPriority("LOW")} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>Statut</label>
                        <input type="hidden" name="status" value={status} />
                        <div className="flex gap-2 overflow-auto">
                            <Tag text="À faire" color={status === "TODO" ? status : "USER"} onClick={() => setStatus("TODO")} />
                            <Tag text="En cours" color={status === "IN_PROGRESS" ? "DEFAULT" : "USER"} onClick={() => setStatus("IN_PROGRESS")} />
                            <Tag text="Termnée" color={status === "DONE" ? status : "USER"} onClick={() => setStatus("DONE")} />
                            <Tag text="Annulée" color={status === "CANCELLED" ? status : "USER"} onClick={() => setStatus("CANCELLED")} />
                        </div>
                    </div>
                    <div className="flex gap-10">
                        <Button text="Enregistrer" width={181} height={50} />
                        <Button text="Supprimer" width={181} height={50} color="orange" onClick={(e) => handleDelete(e)} />
                    </div>
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={closeModal}>
                    <Image src="/images/cross.svg" height={15} width={15} alt="Image fermer" />
                </button>
            </div>
        </aside>
    );
}