"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "../store/useUserStore";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useUserStore();

  const handleRegister = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: crypto.randomUUID(),
          email,
          password,
          username,
          name,
          surname,
          middleName,
        }),
        credentials: "include",
      }
    );

    const data = await response.json();

    if (response.ok && data.success) {
      const loginRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ login: email, password }),
          credentials: "include",
        }
      );

      const loginData = await loginRes.json();

      if (loginData.access_token) {
        try {
          const profileRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me`,
            {
              method: "GET",
              credentials: "include",
            }
          );

          if (!profileRes.ok) throw new Error("Profile fetch failed");

          const profile = await profileRes.json();
          login(profile.id, profile.email, profile.username);
          router.push("/user/me");
        } catch (error) {
          let message = "Unknown error";
          if (error instanceof Error) {
            message = error.message;
          }
          alert("Failed to load profile: " + message);
          console.error(error);
        }
      }
    } else {
      const errorMsg = data.error || data.message || "Registration failed";
      alert(errorMsg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="rounded-sm shadow-sm -space-y-px">
            <div className="p-3">
              <label htmlFor="email-address" className="sr-only">
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email-address"
                name="email-address"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="p-3">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
              />
            </div>
            <div className="p-3">
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
            <div className="p-3">
              <label htmlFor="surname" className="sr-only">
                Surname
              </label>
              <input
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                id="surname"
                name="surname"
                type="text"
                autoComplete="surname"
                required
                className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Surname"
              />
            </div>
            <div className="p-3">
              <label htmlFor="middleName" className="sr-only">
                Middle Name
              </label>
              <input
                onChange={(e) => setMiddleName(e.target.value)}
                value={middleName}
                id="middleName"
                name="middleName"
                type="text"
                autoComplete="middleName"
                required
                className="appearance-none rounded-sm relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Your Middle Name"
              />
            </div>
            <div className="p-3">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
