'use client'

import { UserIconModes } from "@/app/enums/enums";
import UserIcon from "@/app/components/ui/UserIcon";
import { formatDate, getInitials } from "@/app/lib/utils";
import Button from "@/app/components/ui/Button";
import { TaskComment } from "@/app/interfaces/taskItem";
import { useUser } from "@/app/contexts/userContext";

interface CommentProps {
    props: TaskComment[];
}

export default function Comment({ props }: CommentProps) {
    const currentUser = useUser();

    return (
        <div className="flex flex-col gap-24 flex-1">
            {props?.map((comment, index) => (
                <div key={index} className="flex gap-14 w-full">
                    <UserIcon text={getInitials(comment.author.name)} mode={UserIconModes.Small} hasBorder={true} />
                    <div className="flex flex-col rounded-(--radius10) gap-10 pt-18 pr-14 pb-18 pl-14 bg-(--grey-100) w-full">
                        <div className="flex flex-col gap-18 w-full">
                            <div className="flex justify-between w-full">
                                <span className="body-s text-black">{comment.author.name}</span>
                                <span className="body-2xs text-(--grey-600)">{formatDate(new Date(comment.createdAt))}</span>
                            </div>
                            <p className="body-2xs text-black m-0 p-0">{comment.content}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex gap-14 w-full">
                <UserIcon text={getInitials(currentUser?.name)} mode={UserIconModes.Small} hasBorder={true} isOwner={true} />
                <textarea id="addComment" name="addComment" className="body-2xs bg-(--grey-50) p-10 rounded-(--radius10) text-black w-full h-83 outline-0" placeholder="Ajouter un commentaire..."></textarea>
            </div>
            <Button className="self-end" text="Envoyer" width={209} height={50} url="" disabled={true} />
        </div>
    );
}