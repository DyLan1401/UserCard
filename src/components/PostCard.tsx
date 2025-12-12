import type { Post } from "../types/post"

type PostCard = {
    post: Post,
    onDelete: (post: Post) => void;
    onUpdate: (post: Post) => void;
}

export default function PostCard({ post, onDelete, onUpdate }: PostCard) {

    return (

        <div className="w-[300px] h-[300px] flex flex-col gap-4 justify-center items-center rounded-lg p-2 border-1">
            <div>
                <h2
                    className="font-bold p-2"
                >{post.title}</h2>
                <h4 className="font-semibold">{post.body}</h4>

                <div className="flex gap-5 ">
                    <button
                        onClick={() => onDelete(post)}
                        className=" px-2 py-1 bg-red-400 rounded-2xl ">Xóa</button>
                    <button
                        onClick={() => onUpdate(post)}
                        className=" px-2 py-1 bg-blue-400 rounded-2xl">Sửa</button>
                </div>
            </div>
        </div>


    )
};