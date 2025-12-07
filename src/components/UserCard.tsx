import type { User } from "../types/user"
import type { Button } from "../types/button"


type UserCardProp = {
    user: User,
    onDeleteUser: (user: User) => void,
    onUpdateUser: (user: User) => void
}

function MyButton({ title, disable }: Button) {
    return (
        <button
            disabled={disable}
            className="px-4 py-2 outline-1 hover:cursor-pointer  mt-2 outline-green-300 rounded-2xl bg-green-300/50 font-semibold">
            {title}
        </button>
    )
}



export default function UserCard({ user, onDeleteUser, onUpdateUser }: UserCardProp
) {

    return (

        <div className="w-[300px] h-auto flex flex-col gap-4 justify-center items-center rounded-lg p-2 border-1">
            <img
                src={user.avatar}
                alt={user.name}
                className=" w-24 h-24 object-cover mb-3 rounded-2xl"
            />
            <div>
                <h2
                    className="font-bold p-2"
                >{user.name}</h2>
                <h4 className="font-semibold">{user.email}</h4>
                <MyButton disable={false} title={user.role} />
            </div>
            <div className="flex gap-5 ">
                <button
                    onClick={() => onDeleteUser(user)}
                    className=" px-2 py-1 bg-red-400 rounded-2xl ">Xóa</button>
                <button
                    onClick={() => onUpdateUser(user)}
                    className=" px-2 py-1 bg-blue-400 rounded-2xl">Sửa</button>
            </div>

        </div>


    )
};