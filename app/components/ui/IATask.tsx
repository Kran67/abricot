'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface IATaskProps {
    name: string;
    description: string;
}

export default function IATask({ name, description }: IATaskProps) {
    const router: AppRouterInstance = useRouter();

    const handleClickDelete = () => {
        router.push("/");
    };

    const handleClickModify = () => {
        router.push("/");
    };

    const classNames = [
        "ia-task",
        "flex",
        "flex-col",
        "rounded-(--radius10)",
        "bg-(--white)",
        "gap-32",
        "pt-25",
        "pr-40",
        "pb-25",
        "pl-40",
        "border",
        "border-solid",
        "border-(--grey-200)",
        "flex-1"
    ].join(" ");

    return (
        <div className={classNames}>
            <div className="flex">
                <div className="flex flex-col flex-1">
                    <h5 className="text-black h-25">{name}</h5>
                    <div className="body-s text-(--grey-600) h-17">{description}</div>
                </div>
            </div>
            <div className="flex items-center h-50 mt-32 flex-1">
                <button className="flex items-center gap-4 body-xs cursor-pointer" onClick={handleClickDelete}>
                    <Image src="./images/trash.svg" alt="Image poubelle" width={16} height={14} />Supprimer
                </button>
                <span className="body-2xs pl-15 pr-15">|</span>
                <button className="flex items-center gap-4 body-xs cursor-pointer" onClick={handleClickModify}>
                    <Image src="./images/pen.svg" alt="Image crayon" width={14} height={14} />Modifier
                </button>
            </div>
        </div>
    );
}