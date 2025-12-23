'use client'

import { UserIconModes } from "@/app/enums/enums";
import UserIcon from "@/app/components/ui/UserIcon";
import { formatDate, getInitials } from "@/app/lib/utils";
import Button from "@/app/components/ui/Button";
import { TaskComment } from "@/app/interfaces/taskItem";
import { useUser } from "@/app/contexts/userContext";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";
import { useCookies } from "next-client-cookies";

interface CommentProps {
    comments: TaskComment[];
    taskId: string;
    projectId: string;
    refreshTasks: () => void
}

export default function Comment({ comments, taskId, projectId, refreshTasks }: CommentProps) {
    const currentUser = useUser();
    const [newComment, setNewComment] = useState<string>("");
    const cookies = useCookies();
    const token: string | undefined = cookies.get("token");

    const createComment = async () => {
        if (!newComment) {
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/tasks/${taskId}/comments`, {
            method: "POST",
            body: JSON.stringify({ content: newComment }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            toast.success("Le commentaire vient d'être posté");
            refreshTasks();
            setNewComment("");
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans l'envoi du commentaire<br />{data.message}</div>);
        }
    };

    const deleteComment = async (commentId: string) => {
        const ok = window.confirm("Voulez-vous vraiment supprimer ce commentaire ?");
        if (!ok) {
            return;
        }

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/projects/${projectId}/tasks/${taskId}/comments/${commentId}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });


        if (res.ok) {
            toast.success("Le commentaire vient d'être supprimé");
            refreshTasks();
        } else {
            const data = await res.json();
            toast.error(<div>Erreur dans la suppression du commentaire<br />{data.message}</div>);
        }
    };

    return (
        <div className="flex flex-col gap-24 flex-1">
            {comments?.map((comment, index) => {
                const isCurrentUser = comment.author.id === currentUser?.id;
                return (
                    <div key={index} className="flex gap-14 w-full">
                        <UserIcon text={getInitials(comment.author.name)} mode={UserIconModes.Small} hasBorder={true} />
                        <div className="flex flex-col rounded-(--radius10) gap-10 pt-18 pr-14 pb-18 pl-14 bg-(--grey-100) w-full">
                            <div className="flex flex-col gap-18 w-full">
                                <div className="flex gap-5 items-center w-full">
                                    <span className="body-s text-black flex-1">{comment.author.name}</span>
                                    <span className="body-2xs text-(--grey-600)">{formatDate(new Date(comment.createdAt))}</span>
                                    {isCurrentUser && (
                                        <button
                                            className="flex items-center justify-center bg-(--grey-800) rounded-lg py-3 pr-3 pl-6 w-24 h-26 cursor-pointer"
                                            onClick={() => deleteComment(comment.id)}
                                            role="button"
                                            aria-label="Supprimer ce commentaire"
                                        >
                                            <Image className="trash" src="/images/Trash.svg" height={12} width={14} alt="Image poubelle" aria-hidden="true" />
                                        </button>
                                    )}
                                </div>
                                <p className="body-2xs text-black m-0 p-0">{comment.content}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
            <div className="flex gap-14 w-full">
                <UserIcon text={getInitials(currentUser?.name)} mode={UserIconModes.Small} hasBorder={true} isOwner={true} />
                <label htmlFor={`addComment-${taskId}-${projectId}`} className="invisible">Ajouter un commentaire...</label>
                <textarea
                    id={`addComment-${taskId}-${projectId}`}
                    name={`addComment-${taskId}-${projectId}`}
                    className="body-2xs bg-(--grey-50) p-10 rounded-(--radius10) text-black w-full h-83 outline-0"
                    placeholder="Ajouter un commentaire..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    aria-multiline="true"></textarea>
            </div>
            <Button className="self-end" text="Envoyer" width={209} height={50} url="" disabled={newComment === ""} onClick={createComment} />
        </div>
    );
}