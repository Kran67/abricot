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
    required?: boolean;
    width?: number;
    onChange?: (e: any) => void
    hasError?: boolean;
    autoComplete?: string;
    maxLength?: number;
    className?: string;
}

export default function Input({ name, label, type, value, imageType, placeHolder, required, width, onChange, hasError, autoComplete = "on", maxLength, className }: InputProps) {
    const classNames: string = [
        "input",
        "flex",
        "flex-col",
        "flex-1",
        "gap-7",
        "justify-center",
        label ? "h-77" : "h-63",
        className ?? ""
    ].join(" ");

    const imgHeight: 14 | 16 = imageType === InputImageTypes.Search
        ? 14
        : 16;

    return (
        <div className={classNames} style={{ "minWidth": width, "maxWidth": width }}>
            {label
                ? <label className="body-s text-black h-17" htmlFor={name}>{label}&nbsp;{required ? "*" : ""}</label>
                : null
            }
            <div className={"flex justify-between items-center bg-(--white) border " +
                (!hasError ? "border-(--grey-200)" : "border-(--error)") + " border-solid rounded-(--radius4) pr-17 pl-17 gap-10 h-53"}>
                <input
                    className="body-s text-(--grey-600) w-full outline-0"
                    id={name}
                    name={name}
                    type={type}
                    defaultValue={value}
                    placeholder={placeHolder}
                    required={required}
                    autoComplete={autoComplete}
                    onChange={onChange}
                    maxLength={maxLength}
                    aria-required={required}
                />
                {imageType &&
                    <Image src={"/images/" + imageType + ".svg"} width={15} height={imgHeight} alt={" Image " + imageType} />
                }
            </div>
        </div>
    );
}