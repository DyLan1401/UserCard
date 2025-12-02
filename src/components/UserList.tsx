import { useState } from 'react';
import UserCard from './UserCard'
import User1 from "../assets/icons8-doctor-50.png"


export default function UserList() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Nguyen Thanh Lan",
            email: "lan@gmail.com",
            role: "admin",
            avatar: User1
        },
        {
            id: 2,
            name: "Nguyen Thanh Hoang",
            email: "hoang@gmail.com",
            role: "user",
            avatar: User1
        },
        {
            id: 3,
            name: "Nguyen Thanh Phong",
            email: "phong@gmail.com",
            role: "user",
            avatar: User1
        },
        {
            id: 4,
            name: "Nguyen Thanh Hao",
            email: "Hao@gmail.com",
            role: "user",
            avatar: User1
        },
        {
            id: 5,
            name: "Nguyen Thanh Tam",
            email: "Tam@gmail.com",
            role: "user",
            avatar: User1
        },
    ]);
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState('all');


    //tạo mảng mới render
    const FilterRole = users.filter(user => {
        // hàm re-render theo role của user
        const rolematch = roleFilter === "all" || user.role === roleFilter;



        //hàm tìm kiếm 
        const searchMatch =
            user.name?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())

        //trả về dữ liệu 
        return rolematch && searchMatch;
    });





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
            </div>

            {/* list user  */}
            <div className="w-full h-full grid grid-cols-3 gap-3 ">
                {FilterRole.map((user, index) => (
                    <UserCard
                        key={index}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        avatar={user.avatar}
                    />
                ))}
            </div>
        </div>
    )
}