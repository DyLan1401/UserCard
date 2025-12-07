import React, { useState, useEffect } from "react"
import type { User } from "../types/user";
type FormErrors = {
    name?: string;
    email?: string;
    role?: string;
};

type FormAddUserProps = {
    onAddUser: (user: User) => void;
    onUpdateUser: (user: User) => void;   // ✅ BẮT BUỘC PHẢI CÓ
    editingUser: User | null;

};


export default function FormAddUser({ onAddUser, onUpdateUser, editingUser }: FormAddUserProps) {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [role, setRole] = useState<"admin" | "user" | undefined>(undefined);
    const [errors, setErrors] = useState<FormErrors>({});


    useEffect(() => {
        if (editingUser) {
            setName(editingUser.name);
            setEmail(editingUser.email);
            setRole(editingUser.role);
        }
    }, [editingUser]);
    const handleRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
        //chỉ chọn  1 trong 3 giá trị 
        const value = event.target.value as "admin" | "user" | undefined;
        //set dữ liệu cho role
        setRole(value);

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {

        e.preventDefault(); // ✅ CHỐNG RELOAD

        const newErr: FormErrors = {};

        //kiểm tra name
        if (!name) newErr.name = "tên không được để trống";
        else if (name.length < 3) newErr.name = "tên không được dưới 3 kí tự";

        //kiểm tra email
        if (!email) newErr.email = "email không được để trống";
        else if (!email.includes("@")) newErr.email = "email không đúng định dạng";

        //kiểm tra role 
        if (!role) newErr.role = "Vui lòng chọn role";

        setErrors(newErr);

        if (Object.keys(newErr).length > 0) return;

        if (editingUser) {
            // ✅ ĐANG SỬA
            const updatedUser: User = {
                ...editingUser,  // giữ id & avatar cũ
                name,
                email,
                role,
            };

            onUpdateUser(updatedUser);
        } else {
            // ✅ ĐANG THÊM
            const newUser: User = {
                id: Date.now(),
                name,
                email,
                role,
                avatar: "https://i.pravatar.cc/150",
            };

            onAddUser(newUser);
        }


        // ✅ Reset form
        setName("");
        setEmail("");
        setRole(undefined);
        setErrors({});

    }

    return (
        <div
            className="w-full h-full flex  justify-center items-center">
            <form onSubmit={handleSubmit}
                className="w-[500px] h-[500px] flex justify-center items-center flex-col bg-amber-200"
            >
                <div className="gap-2 flex">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        className="px-2 py-1 mb-2 rounded-lg outline-1"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {errors.name && <p className="text-red-500">{errors.name}</p>}

                </div>
                <div className="gap-2 flex">
                    <label htmlFor="">Email</label>
                    <input type="email"
                        className="px-2 py-1 mb-2 rounded-lg outline-1"

                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <p className="text-red-500">{errors.email}</p>}

                </div>
                <div className="flex gap-2">
                    <label htmlFor="">Role:</label>
                    <select name="role"
                        className="rounded-lg outline-1"
                        value={role ?? ""}
                        onChange={handleRole} >
                        <option value="">Chọn role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                    {errors.role && <p className="text-red-500">{errors.role}</p>}

                </div>
                <button type="submit">
                    {editingUser ? "Cập nhật người dùng" : "Thêm người dùng"}
                </button>

            </form>
        </div>
    )
}