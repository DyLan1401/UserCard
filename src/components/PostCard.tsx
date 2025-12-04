import type { Post } from "../types/post"
import type { Button } from "../types/button"



function MyButton({ title, disable }: Button) {
    return (
        <button
            disabled={disable}
            className="px-4 py-2 outline-1  mt-2 outline-green-300 rounded-2xl bg-green-300/50 font-semibold">
            {title}
        </button>
    )
}



export default function PostCard({ userId, id, title, body }: Post) {

    return (

        <div className="w-[300px] h-[300px] flex flex-col gap-4 justify-center items-center rounded-lg p-2 border-1">
            <div>
                <h2
                    className="font-bold p-2"
                >{title}</h2>
                <h4 className="font-semibold">{body}</h4>
                <MyButton disable={false} />
            </div>
        </div>


    )
};