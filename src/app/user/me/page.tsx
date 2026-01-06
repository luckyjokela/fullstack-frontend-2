"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";

export default function ProfilePage() {
  const router = useRouter();
  const { id, email, isAuthenticated } = useUserStore();

  const [form, setForm] = useState({
    email: "",
    username: "",
    name: "",
    middleName: "",
    surname: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`,
          {
            credentials: 'include',
          }
        );

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();

        setForm({
          email: data.email,
          username: data.username,
          name: data.name,
          middleName: data.middleName,
          surname: data.surname,
        });
      } catch (err) {
        console.error(err);
        alert("Ошибка загрузки профиля");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, ...form }),
      credentials: "include",
    });

    const data = await response.json();

    if (data.success) {
      useUserStore.getState().updateProfile({
        email: form.email,
        username: form.username,
        name: form.name,
        middleName: form.middleName,
        surname: form.surname,
      });
      alert("Профиль обновлён!");
    } else {
      alert(data.error);
    }
    setSubmitting(false);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuthenticated) {
    return <div>Перенаправление...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Редактировать профиль</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Имя</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Фамилия
          </label>
          <input
            type="text"
            value={form.surname}
            onChange={(e) => setForm({ ...form, surname: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Отчество
          </label>
          <input
            type="text"
            value={form.middleName}
            onChange={(e) => setForm({ ...form, middleName: e.target.value })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
        >
          {submitting ? "Сохранение..." : "Сохранить"}
        </button>
      </form>
    </div>
  );
}