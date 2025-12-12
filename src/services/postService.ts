import type { Post } from "../types/post";

export async function GetPost(): Promise<Post[]> {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
        await new Error("Không thể lấy Post");
    }
    const data: Post[] = await res.json();

    return data.map(post => ({
        id: post.id,
        title: post.title,
        body: post.body,
    }))

}