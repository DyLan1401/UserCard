export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    role?: "admin" | "user"; // API không có role nên bắt buộc optional
};
