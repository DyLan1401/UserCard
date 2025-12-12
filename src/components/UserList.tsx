import UserCard from './UserCard'
import FormAddUser from './FormAddUser';
import { useUsers } from '../hooks/useUsers';
export default function UserList() {
    const {
        // state
        users: FilterRole,
        loading,
        error,
        search,
        roleFilter,
        editingUser,
        totalUsers,
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


    } = useUsers();





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
                        onChange={(e) => setSearch(e.target.value)}
                        className='border-1 rounded-lg px-2 py-1 mr-2'
                    />
                </form>

                {/* lọc theo role của user */}
                <div className=' flex flex-col gap-3'>
                    <p>Lọc theo role</p>
                    <div className='flex gap-3'>
                        <button
                            onClick={() => setRoleFilter("admin")}
                            className='px-2 py-1 bg-green-300 rounded-3xl'>Admin</button>
                        <button
                            onClick={() => setRoleFilter("user")}
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
                        onDeleteUser={() => deleteUser(user.id)}
                        onUpdateUser={() => startEditUser(user.id)}

                    />
                ))}
            </div>
        </div>
    )
}