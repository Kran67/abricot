import Image from "next/image";
import { useEffect, useState } from "react";
import { Project } from "@/app/interfaces/project";
import type { User } from "@/app/interfaces//user";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import { ButtonTypes, InputTypes } from "@/app/enums/enums";
import { toast } from "react-toastify";
import { useCookies } from "next-client-cookies";
import { redirectWithDelay } from "@/app/lib/utils";
import AsyncSelect from "react-select/async";
import { ProjectMember } from "@/app/interfaces/projectMember";
import { ActionMeta } from "react-select";

export default function ModalUpdateProject({
    closeModal,
    project,
    onSuccess,
}: {
    closeModal: (isModified: boolean) => void;
    project: Project | undefined;
    onSuccess: () => void;
}) {
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const [name, setName] = useState(project?.name);
    const [description, setDescription] = useState(project?.description);
    const [contributors, setContributors] = useState<User[]>(project?.members.map((member: ProjectMember) => member.user) || []);
    const contributorsList: { value: string, label: string | undefined, user: User }[] | undefined = project?.members.map((member: ProjectMember) => {
        return { value: member.user.email, label: member.user.name, user: member.user }
    });
    const [isModified, setIsModified] = useState(false);

    const promiseOptions = (inputValue: string) => {
        if (inputValue && inputValue.length > 1) {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/search?query=${inputValue}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }).then(async (res) => {
                const data = await res.json();
                if (res.ok) {
                    const values = data.data.users.map((user: User) => { return { value: user.email, label: user.name, user: user } });
                    return values;
                } else {
                    return [];
                }
            });
        }
    }

    const addContributor = async (user: User | undefined) => {
        if (user && !contributors.some((c) => c.id === user.id)) {
            setContributors((prev) => [...prev, user]);

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}/contributors`, {
                method: "POST",
                body: JSON.stringify({ email: user.email }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.ok) {
                toast.success("Un contributeur vient d'être ajouté");
                setIsModified(true);
            } else {
                const data = await res.json();
                toast.error(<div>Erreur dans l'ajout d'un contributeur<br />{data.message}</div>);
            }
        }
    };

    const removeContributor = async (id: string | undefined) => {
        setContributors((prev) => prev.filter((u) => u.id !== id));
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${project?.id}/contributors/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("Un contributeur vient d'être supprimé");
            setIsModified(true);
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la supression d'un contributeur<br />{data.message}</div>);
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
            const data = await res.json();
            toast.error(<div>Erreur dans la modification du projet<br />{data.message}</div>);
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
            const data = await res.json();
            toast.error(<div>Erreur dans la suppression du projet<br />{data.message}</div>);
        }
    };

    const onChange = (option: readonly { value: string, label: string | undefined, user: User }[],
        actionMeta: ActionMeta<{ value: string, label: string | undefined, user: User }>) => {
        switch (actionMeta.action) {
            case "remove-value":
                removeContributor(actionMeta.removedValue.user.id);
                break;
            case "select-option":
                console.log(actionMeta);
                addContributor(actionMeta.option?.user);
                break;
            default:
                break;
        }(actionMeta);
    }

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal(isModified);
        };
        document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, []);

    return (
        <aside className="absolute inset-0 bg-(--grey-200)/50 flex items-center justify-center z-1" onClick={() => closeModal(isModified)}>
            <div
                className="bg-(--white) relative px-36 py-40 md:px-73 md:py-79 rounded-(--radius10) flex flex-col gap-40 w-598"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-(--grey-800)">Modifier un projet</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24" role="form" aria-label="Information du projet">
                    <Input name="name" label="Titre" type={InputTypes.Text} required={true} value={name} onChange={(e) => setName(e.target.value)} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="assignees">Contributeurs</label>
                        <AsyncSelect
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
                            defaultValue={contributorsList}
                            onChange={onChange}
                        />
                    </div>
                    <div className="flex gap-10">
                        <Button text="Enregistrer" width={181} height={50} />
                        <Button text="Supprimer" width={181} height={50} buttonType={ButtonTypes.Button} color="orange" onClick={handleDelete} />
                    </div>
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={() => closeModal(isModified)} role="button">
                    <Image src="/images/cross.svg" height={15} width={15} alt="Image fermer" />
                </button>
            </div>
        </aside>
    );
}
