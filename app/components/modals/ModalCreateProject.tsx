"use client";

import Image from "next/image";
import { User } from "@/app/interfaces/user";
import { FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import Input from "@/app/components/ui/Input";
import { InputTypes } from "@/app/enums/enums";
import AsyncSelect from 'react-select/async';
import Button from "@/app/components/ui/Button";
import { Cookies, useCookies } from "next-client-cookies";

export default function ModalCreateProject({
    closeModal,
    onSuccess,
}: {
    closeModal: () => void;
    onSuccess: () => void;
}) {
    const cookies: Cookies = useCookies();
    const token: string | undefined = cookies.get("token");
    const promiseOptions = (inputValue: string) => {
        if (inputValue && inputValue.length > 1) {
            return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/search?query=${inputValue}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            }).then(async (res: Response) => {
                const data = await res.json();
                if (res.ok) {
                    const values = data.data.users.map((user: User) => { return { value: user.email, label: user.name } });
                    return values;
                } else {
                    return [];
                }
            });
        }
    }

    const handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form: EventTarget & HTMLFormElement = e.currentTarget;
        const formData: FormData = new FormData(form);

        const res: Response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
            method: "POST",
            body: JSON.stringify({
                name: formData.get("name"),
                description: formData.get("description"),
                contributors: formData.getAll("assignees")
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("Le nouveau projet a bien été créé");
            onSuccess();
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la création du projet<br />{data.message}</div>);
        }
    };

    useEffect(() => {
        const closeOnEsc = (e: KeyboardEvent): void => {
            if (e.key === "Escape") closeModal();
        };
        document.addEventListener("keydown", closeOnEsc);
        return () => document.removeEventListener("keydown", closeOnEsc);
    }, []);

    setTimeout(() => {
        const ds = document.getElementById("dynamicSelect");
        const x = document.querySelector(".contributors-drop-down__input");
        ds?.setAttribute("for", x?.id ?? "");
    }, 500);

    return (
        <aside className="absolute inset-0 bg-(--grey-200)/50 flex items-center justify-center z-1" onClick={closeModal}>
            <div
                className="bg-(--white) relative px-36 py-40 md:px-73 md:py-79 rounded-(--radius10) flex flex-col gap-40 max-w-598"
                onClick={(e) => e.stopPropagation()}
            >
                <h4 className="text-(--grey-800)">Créer un projet</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24" role="form" aria-label="Information du projet">
                    <Input name="name" label="Titre" type={InputTypes.Text} required={true} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} />
                    <div className="flex flex-col gap-1">
                        <label htmlFor="assignees">Contributeurs</label>
                        <label id="dynamicSelect" htmlFor="react-select-3-input" className="invisible w-0 h-0">Choisir un ou plusieurs collaborateurs</label>
                        <AsyncSelect
                            cacheOptions
                            loadOptions={promiseOptions}
                            defaultOptions={[]}
                            noOptionsMessage={(obj: { inputValue: string }) => "Aucun utilisateur trouvé"}
                            loadingMessage={(obj: { inputValue: string }) => "Récupération des utilisateurs..."}
                            className="contributors-drop-down"
                            classNamePrefix="contributors-drop-down"
                            name="assignees"
                            id="assignees"
                            isMulti={true}
                            isClearable={true}
                            isSearchable={true}
                            placeholder="Choisir un ou plusieurs collaborateurs"
                        />
                    </div>
                    <Button text="Ajouter un projet" width={181} height={50} />
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={closeModal} role="button">
                    <Image src="/images/cross.svg" height={15} width={15} alt="Image fermer" />
                </button>
            </div>
        </aside>
    );
}