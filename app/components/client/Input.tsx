'use client'

import { InputTypes, InputImageTypes } from "@/app/enums/enums";
import Image from "next/image";

interface InputProps {
    name: string;
    label?: string;
    type?: InputTypes;
    value?: string;
    imageType?: InputImageTypes;
    placeHolder?: string;
}

export default function Input({ name, label, type, value, imageType, placeHolder }: InputProps) {
    const classNames = [
        "input",
        "flex",
        "flex-col",
        "self-stretch",
        "gap-7",
        "justify-center",
        "h-77"
    ].join(" ");

    const imgHeight = imageType === InputImageTypes.Search
        ? 14
        : 16;

    return (
        <div className={classNames}>
            <label className="body-s text-black h-17" htmlFor={name}>{label}</label>
            <div className="flex justify-between items-center bg-(--white) border border-(--grey-200) border-solid rounded-(--radius4) pr-17 pl-17 gap-10 h-53">
                <input className="body-s text-(--grey-600) w-full outline-0" id={name} name={name} type={type} value={value} placeholder={placeHolder} />
                {imageType &&
                    <Image src={"/images/" + imageType + ".svg"} width={15} height={imgHeight} alt={" Image " + imageType} />
                }
            </div>
        </div>
    );
}