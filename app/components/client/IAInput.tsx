'use client'

import Image from "next/image";

export default function IAInput() {
    return (
        <div className="ia-input flex justify-between items-center bg-(--grey-50) rounded-(--radius80) gap-10 h-60 self-stretch pr-17 pl-17">
            <input className="body-s text-(--grey-600) w-full outline-0" id="iainput" name="iainput" type="text" placeholder="Décrivez les tâches que vous souhaitez ajouter..." />
            <button type="submit" className="rounded-full bg-(--dark-orange) flex items-center justify-center transition-colors duration-300 ease-out hover:bg-(--light-orange) w-24 h-24 cursor-pointer">
                <Image src={"/images/star.svg"} width={14} height={14} alt="Image IA" />
            </button>
        </div>
    );
}