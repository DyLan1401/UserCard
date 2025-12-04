import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import type { Post } from "../types/post";
import { GetPost } from '../services/postService';


export default function UserList() {

    // const [search, setSearch] = useState("");
    // const [roleFilter, setRoleFilter] = useState('all');
    //
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [users, setUsers] = useState<Post[]>([]);
    //
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await GetPost();
                setUsers(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, []);


    // //tạo mảng mới render
    // const FilterRole = users.filter(user => {
    //     // hàm re-render theo role của user
    //     const rolematch = roleFilter === "all" || user.role === roleFilter;



    //     //hàm tìm kiếm 
    //     const searchMatch =
    //         user.name?.toLowerCase().includes(search.toLowerCase()) ||
    //         user.email?.toLowerCase().includes(search.toLowerCase())

    //     //trả về dữ liệu 
    //     return rolematch && searchMatch;
    // });


    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p className='text-red-500'>{error}</p>
    return (

        <div className="w-full h-full flex flex-col gap-5  ">
            {/* <div className='w-full h-full flex justify-around items-center '> */}
            {/* tìm kiếm  */}
            {/* <form action="" className=''>
                    <input type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='border-1 rounded-lg px-2 py-1 mr-2'
                    />
                </form> */}

            {/* lọc theo role của user */}
            {/* <div className=' flex flex-col gap-3'>
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
            </div> */}

            {/* list user  */}
            <div className="w-full h-full grid grid-cols-3 gap-3 ">
                {users.map(post => (
                    <PostCard
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                    />
                ))}
            </div>
        </div>
    )
}