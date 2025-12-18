import type { User } from "../types/user.ts"

export default function UserStats(users: User[]) {
    return {
        //tổng tất cả user
        total: users.length,
        //tổng user có role admin
        totalAdmins: users.filter(u => u.role === "admin").length,
        //tổng user có role user
        totalNormalUsers: users.reduce((total, u) => {
            if (u.role === "user") return total + 1;
            return total;
        }, 0)

    }
}