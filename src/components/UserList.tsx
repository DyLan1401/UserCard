import React, { useEffect, useMemo, useState } from 'react';
import UserCard from './UserCard'
import type { User } from "../types/user";
import { GetUser } from '../services/userService';
import FormAddUser from './FormAddUser';

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    //
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState('all');
    //
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");



    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await GetUser();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    //tạo mảng mới render
    const FilterRole = useMemo(() => {
        return users.filter(user => {
            // hàm re-render theo role của user
            const rolematch =
                roleFilter === "all" ? true : user.role === roleFilter;

            //hàm tìm kiếm 
            const searchMatch =
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())


            //trả về dữ liệu 
            return rolematch && searchMatch;
        });
    }, [users, search, roleFilter]);

    //tổng tất cả user
    const totalUsers = users.length;
    //tổng user có role admin
    const totalAdmins = users.filter(user => user.role === "admin").length;
    //tổng user có role user
    const totalNormalUsers = users.reduce((total, user) => {
        if (user.role === "user") return total + 1;
        return total;
    }, 0);

    //set role là admin
    const handFilterAdmin = (): void => {
        setRoleFilter("admin");

    }
    //set role là user
    const handFilterUser = (): void => {
        setRoleFilter("user");

    }
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    //thêm user
    const handleAddUser = (newUser: User): void => {
        setUsers((prev) => [newUser, ...prev]);
    };

    //xóa user
    const handleDeleteUser = (user: User): void => {
        try {
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            alert("xoas thanhf cong")
        } catch (err) {
            console.log(err);
            alert("xoa khongo thanhg cong");
        }
    }

    //sửa user
    const handleUpdateUser = (user: User): void => {
        setEditingUser(user);
    };
    const handleConfirmUpdateUser = (updatedUser: User): void => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );

        setEditingUser(null); // ✅ Thoát chế độ sửa
    };



    //
    if (loading) return <p>Đang tải dữ liệu...</p>;
    //
    if (error) return <p className='text-red-500'>{error}</p>

    return (
        <div className="w-full h-full flex flex-col gap-5  ">
            <div className='w-full h-full flex justify-around items-center '>
                {/* tìm kiếm  */}
                <form action="" className=''>
                    <input type="text"
                        value={search}
                        onChange={handleSearch}
                        className='border-1 rounded-lg px-2 py-1 mr-2'
                    />
                </form>

                {/* lọc theo role của user */}
                <div className=' flex flex-col gap-3'>
                    <p>Lọc theo role</p>
                    <div className='flex gap-3'>
                        <button
                            onClick={handFilterAdmin}
                            className='px-2 py-1 bg-green-300 rounded-3xl'>Admin</button>
                        <button
                            onClick={handFilterUser}
                            className='px-2 py-1 bg-yellow-300 rounded-3xl'>User</button>
                        <button
                            onClick={() => setRoleFilter("all")}
                            className='px-2 py-1 bg-yellow-300 rounded-3xl'>tất cả</button>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='px-2 py-1 bg-blue-300 rounded-2xl'>Tổng số user là : {totalUsers}</div>
                    <div className='px-2 py-1 bg-green-300 rounded-2xl'>Tổng số role admin là : {totalAdmins}</div>
                    <div className='px-2 py-1 bg-yellow-300 rounded-2xl'>Tổng số role user là : {totalNormalUsers}</div>

                </div>
            </div>
            {/* Form Add user */}
            <FormAddUser
                onAddUser={handleAddUser}
                onUpdateUser={handleConfirmUpdateUser}
                editingUser={editingUser}

            />
            {/* list user  */}
            <div className="w-full h-full grid grid-cols-3 gap-3 ">
                {FilterRole.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onDeleteUser={handleDeleteUser}
                        onUpdateUser={handleUpdateUser}

                    />
                ))}
            </div>
        </div>
    )
}