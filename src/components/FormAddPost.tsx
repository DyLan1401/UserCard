import React, { useEffect, useState } from 'react';
import type { Post } from "../types/post";

type FormPostProp = {
    onAddPost: (post: Post) => void
    onUpdatePost: (post: Post) => void
    editting: Post | null;
}


export default function FormAddPost({ onUpdatePost, onAddPost, editting }: FormPostProp) {
    const [title, setTitle] = useState<string>('');
    const [body, setBody] = useState<string>('');

    useEffect(() => {
        if (editting) {
            setTitle(editting.title);
            setBody(editting.body);
        }
    }, [editting]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

        e.preventDefault();

        if (editting) {
            const UpdatedPost: Post = {
                id: editting.id,
                title,
                body,

            }
            onUpdatePost(UpdatedPost);

        } else {
            const NewPost: Post = {
                id: Date.now(),
                title,
                body,
            }
            onAddPost(NewPost);

        }
        setTitle("");
        setBody("");
    }
    return (
        <div className='w-full h-full flex justify-center items-center'>
            <form
                onSubmit={handleSubmit}
                className='w-[500px] h-[500px] flex flex-col justify-center items-center p-2 bg-green-500'>
                <div className="mb-2 p-2 ">
                    <label
                        className="p-2"
                    >Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-1 "
                    />
                </div>
                <div className="mb-2 p-2 ">
                    <label
                        className="p-2"
                    >Body</label>
                    <input
                        type="text"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        className="border-1 "
                    />
                </div>
                <button
                    className='px-2 py-1 outline-blue-500 outline-1'
                    type="submit">
                    {editting ? "Cập nhật bài viết" : "Thêm bài viết"}
                </button>
            </form>
        </div>
    )
}
