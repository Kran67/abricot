'use client'

import { UserIconModes } from "@/app/enums/enums";
import UserIcon from "./UserIcon";
import { formatDate } from "@/app/lib/utils";

interface CommentProps {
    comments?: [{ userName: string, userInitials: string, comment: string, date: Date }];
    owner: string;
}

export default function Comment({ comments, owner }: CommentProps) {
    return (
        <div className="flex flex-col gap-24 self-stretch">
            {comments?.map((comment, index) => (
                <div key={index} className="flex gap-14 w-full">
                    <UserIcon text={comment.userInitials} mode={UserIconModes.Small} hasBorder={true} />
                    <div className="flex flex-col rounded-(--radius10) gap-10 pt-18 pr-14 pb-18 pl-14 bg-(--white) w-full">
                        <div className="flex flex-col gap-18 w-full">
                            <div className="flex justify-between w-full">
                                <span className="body-s text-black">{comment.userName}</span>
                                <span className="body-2xs text-(--grey-600)">{formatDate(comment.date)}</span>
                            </div>
                            <p className="body-2xs text-black m-0 p-0">{comment.comment}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div className="flex gap-14 w-full">
                <UserIcon text={owner} mode={UserIconModes.Small} hasBorder={true} isOwner={true} />
                <textarea id="addComment" name="addComment" className="body-2xs bg-(--white) p-10 rounded-(--radius10) text-black w-full h-83" placeholder="Ajouter un commentaire..."></textarea>
            </div>
        </div>
    );
}