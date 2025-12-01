interface UserCardProps {
    name: string;
    email: string;
    role: string;
    avatar: string;
}

interface MyButtonProps {
    title: string;
    disable: boolean;
}

function MyButton({ title, disable }: MyButtonProps) {
    return (
        <button
            disabled={disable}
            className="px-4 py-2 outline-1  mt-2 outline-green-300 rounded-2xl bg-green-300/50 font-semibold">
            {title}
        </button>
    )
}



export default function UserCard({ name, email, role, avatar }: UserCardProps) {

    return (

        <div className="w-[300px] h-[300px] flex flex-col gap-4 justify-center items-center rounded-lg p-2 border-1">
            <img
                src={avatar}
                alt={name}
                className=" w-24 h-24 object-cover mb-3 rounded-2xl"
            />
            <div>
                <h2
                    className="font-bold p-2"
                >{name}</h2>
                <h4 className="font-semibold">{email}</h4>
                <MyButton disable={false} title={role} />
            </div>
        </div>


    )
};