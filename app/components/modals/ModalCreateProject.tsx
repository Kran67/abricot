"use client";

import Image from "next/image";
import { useState } from "react";
import { User } from "@/app/interfaces/user";
import { useEffect } from "react";
import { toast } from "react-toastify";
import Input from "../ui/Input";
import { InputTypes } from "@/app/enums/enums";
import AsyncSelect from 'react-select/async';
import Button from "../ui/Button";
import { GroupBase, OptionsOrGroups } from "react-select";
import { useCookies } from "next-client-cookies";
import { formDataToJSON } from "@/app/lib/utils";

export default function ModalCreateProject({
    closeModal,
    onSuccess,
}: {
    closeModal: () => void;
    onSuccess: () => void;
}) {
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");
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
                    const values = data.data.users.map((user: User) => { return { value: user.email, label: user.name } });
                    return values;
                } else {
                    return [];
                }
            });
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects`, {
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
            toast.error("Erreur dans la création du projet");
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
                <h4 className="text-(--grey-800)">Créer un projet</h4>
                <form onSubmit={handleSubmit} className="flex flex-col gap-24">
                    <Input name="name" label="Titre" type={InputTypes.Text} required={true} />
                    <Input name="description" label="Description" type={InputTypes.Text} required={true} />
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
                        />
                    </div>
                    <Button text="Ajouter un projet" width={181} height={50} />
                </form>
                <button className="absolute top-15 right-15 cursor-pointer" onClick={closeModal}>
                    <Image src="/images/cross.svg" height={15} width={15} alt="close" />
                </button>
            </div>
        </aside>
    );
}