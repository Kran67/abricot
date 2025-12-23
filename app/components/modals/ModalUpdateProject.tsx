import Image from "next/image";
import { useEffect, useState } from "react";
import { Project } from "@/app/interfaces/project";
import type { User } from "@/app/interfaces//user";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { ButtonTypes, InputTypes } from "@/app/enums/enums";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { redirectWithDelay } from "@/app/lib/utils";

export default function ModalUpdateProject({
    closeModal,
    project,
    onSuccess,
}: {
    closeModal: () => void;
    project: Project | undefined;
    onSuccess: () => void;
}) {
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const [name, setName] = useState(project?.name);
    const [description, setDescription] = useState(project?.description);
    const [contributors, setContributors] = useState<User[]>(project?.members.map((user) => user.user) || []);

    const addContributor = async (user: User) => {
        if (!contributors.some((c) => c.id === user.id)) {
            setContributors((prev) => [...prev, user]);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}/contributors`, {
                method: "POST",
                body: user.email,
            });

            if (res.ok) {
                toast.success("Un contributeur vient d'être ajouté");
            } else {
                toast.error("Erreur dans l'ajout d'un contributeur");
            }
        }
    };

    const removeContributor = async (id: string) => {
        setContributors((prev) => prev.filter((u) => u.id !== id));
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}/contributors/${id}`, {
            method: "DELETE",
        });

        if (res.ok) {
            toast.success("Un contributeur vient d'être supprimé");
        } else {
            toast.error("Erreur dans la supression d'un contributeur");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}`, {
            method: "PUT",
            body: JSON.stringify({
                name: formData.get("name"),
                description: formData.get("description"),
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("Le projet a bien été modifié");
            onSuccess();
        } else {
            toast.error("Erreur dans la modification du projet");
        }
    };

    const handleDelete = async () => {
        const ok = window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");

        if (!ok) return;
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("Le projet a bien été supprimé");
            redirectWithDelay("/projects", 500);
        } else {
            toast.error("Erreur dans la suppression du projet");
        }
    };

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
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
                <h4 className="text-(--grey-800)">Modifier un projet</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24">
                    <Input name="name" label="Titre" type={InputTypes.Text} required={true} value={name} onChange={(e) => setName(e.target.value)} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="assignees">Contributeurs</label>
                        {/* <AsyncSelect
                            cacheOptions
                            loadOptions={promiseOptions}
                            defaultOptions={[]}
                            noOptionsMessage={(obj: { inputValue: string }) => "Aucun utilisateur trouvé"}
                            loadingMessage={(obj: { inputValue: string }) => "Récupération des utilisateurs..."}
                            className="contributors-drop-down"
                            classNamePrefix="contributors-drop-down"
                            name="assignees"
                            isMulti={true}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Choisir un ou plusieurs collaborateurs"
                        /> */}
                    </div>
                    <div className="flex gap-10">
                        <Button text="Enregistrer" width={181} height={50} />
                        <Button text="Supprimer" width={181} height={50} buttonType={ButtonTypes.Button} color="orange" onClick={handleDelete} />
                    </div>
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={closeModal}>
                    <Image src="/images/cross.svg" height={15} width={15} alt="Image fermer" />
                </button>
            </div>
        </aside>
    );
}
