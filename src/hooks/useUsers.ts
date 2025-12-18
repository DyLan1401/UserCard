import { useEffect, useMemo, useState } from 'react';
import type { User } from "../types/user";
import { GetUser } from '../services/userService';
import UserStats from '../utils/userStats'
export function useUsers() {

    // ================= STATE =================
    const [users, setUsers] = useState<User[]>([]);
    const [editingUserId, setEditingUserId] = useState<number | null>(null);
    //  
    const { total, totalAdmins, totalNormalUsers } = UserStats(users);
    //
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState('all');
    //
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const STORAGE_KEY = "user";

    // ================= FETCH =================


    useEffect(() => {

        const storedUsers = localStorage.getItem(STORAGE_KEY);

        //nếu lưu localstrange thì không cần gọi api 
        if (storedUsers) {
            try {
                const parsedUsers = JSON.parse(storedUsers) as User[];
                setUsers(parsedUsers);
            } catch {
                localStorage.removeItem(STORAGE_KEY); // dọn rác
                setUsers([]);
            } finally {
                setLoading(false);
            }
            return;
        }

        //không có thì gọi api
        const fetchUser = async () => {
            try {
                const data = await GetUser();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };


        fetchUser();
    }, []);

    useEffect(() => {
        if (users.length > 0) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
        }
    }, [users]);



    // ================= DERIVED STATE =================

    const FilterRole = useMemo(() => {
        return users.filter(user => {
            // hàm re-render theo role của user
            const rolematch =
                roleFilter === "all" ? true : user.role === roleFilter;

            //hàm tìm kiếm 
            const searchMatch =
                user.name?.toLowerCase().includes(search.toLowerCase()) ||
                user.email?.toLowerCase().includes(search.toLowerCase())


            console.log({
                roleFilter,
                userRole: user.role,
            });
            //trả về dữ liệu 
            return rolematch && searchMatch;
        });
    }, [users, search, roleFilter]);



    const editingUser =
        editingUserId !== null
            ? users.find((u) => u.id === editingUserId) ?? null : null;

    // ================= ACTIONS =================
    //thêm user
    const handleAddUser = (newUser: User): void => {
        setUsers((prev) => [newUser, ...prev]);
    };

    //xóa user
    const deleteUser = (userId: number) => {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
    };

    //sửa user
    const startEditUser = (userId: number) => {
        setEditingUserId(userId);
    };
    const handleConfirmUpdateUser = (updatedUser: User): void => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
        );

        setEditingUserId(null); // ✅ Thoát chế độ sửa
    };
    // =================Dashboard =================


    return {
        // state
        users: FilterRole,
        loading,
        error,
        search,
        roleFilter,
        editingUser,
        total,
        totalAdmins,
        totalNormalUsers,


        // setters
        setSearch,
        setRoleFilter,


        // actions
        handleAddUser,
        deleteUser,
        startEditUser,
        handleConfirmUpdateUser,


    };
}