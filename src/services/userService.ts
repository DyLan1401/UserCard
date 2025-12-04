import type { User } from "../types/user"

export async function GetUser(): Promise<User[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
        throw new Error("không lấy được dữ liệu User");

    }
    const data: User[] = await res.json();

    return data.map((user, index) => ({
        id: user.id,
        name: user.name,
        email: user.email,

        avatar: `https://i.pravatar.cc/150?img=${index + 1}`,


        role: index === 0 ? "admin" : "user",
    }));
}