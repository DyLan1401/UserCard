import { useEffect, useState } from 'react';
import PostCard from './PostCard';
import type { Post } from "../types/post";
import { GetPost } from '../services/postService';
import FormAddPost from './FormAddPost';


export default function UserList() {


    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const [posts, setPosts] = useState<Post[]>([]);
    const [editingpost, setEditingPosts] = useState<Post | null>(null);

    //
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const data = await GetPost();
                setPosts(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchPost();
    }, []);
    const handleDeletePost = (post: Post): void => {
        setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }

    const handleEditing = (post: Post): void => {
        setEditingPosts(post);
    }
    const handleConfirmUpdate = (updatePost: Post): void => {
        setPosts((prev) => prev.filter((p) => (p.id === updatePost.id ? updatePost : p)))
        setEditingPosts(null);
    }

    const handleAddPost = (newPost: Post): void => {
        setPosts((prev) => [newPost, ...prev])
    }




    if (loading) return <p>Đang tải dữ liệu...</p>;
    if (error) return <p className='text-red-500'>{error}</p>
    return (

        <div className="w-full h-full flex flex-col gap-5  ">
            <FormAddPost
                onAddPost={handleAddPost}
                onUpdatePost={handleConfirmUpdate}
                editting={editingpost}
            />

            {/* list user  */}
            <div className="w-full h-full grid grid-cols-3 gap-3 ">
                {posts.map(post => (
                    <PostCard
                        key={post.id}
                        post={post}
                        onDelete={handleDeletePost}
                        onUpdate={handleEditing}
                    />
                ))}
            </div>
        </div>
    )
}