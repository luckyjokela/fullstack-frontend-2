"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";

interface AdminUser {
  id: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  middleName: string;
}

export default function AdminPage() {
  const router = useRouter();
  const { isAuthenticated, id, email, username } = useUserStore();

  const [users, setUsers] = useState<AdminUser[]>([]);
  const [stats, setStats] = useState({ usersCount: 0, activeUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchAdminData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/users`, {
            credentials: "include",
          }),
          fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/stats`, {
            credentials: "include",
          }),
        ]);

        if (!usersRes.ok || !statsRes.ok) {
          throw new Error("Access denied");
        }

        const usersData = await usersRes.json();
        const statsData = await statsRes.json();

        setUsers(usersData);
        setStats(statsData);
      } catch (err) {
        alert("Доступ запрещён или произошла ошибка");
        router.push("/user/me");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Загрузка админки...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6">Админ-панель</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold">Статистика</h2>
        <p>Всего пользователей: {stats.usersCount}</p>
        <p>Активных: {stats.activeUsers}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Пользователи</h2>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border">ID</th>
              <th className="py-2 px-4 border">Email</th>
              <th className="py-2 px-4 border">Username</th>
              <th className="py-2 px-4 border">Имя</th>
              <th className="py-2 px-4 border">Фамилия</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.surname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
