"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export function NavTop() {
  const { isAuthenticated, logout } = useUserStore();
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const [isOpen, setIsOpen] = useState(false);

  const handleProfile = () => {
    router.push("/user/me");
  };

  const handleChangePassword = () => {
    router.push("/change-password");
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/")
                    ? "text-white md:text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
                aria-current={isActive("/") ? "page" : undefined}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/about")
                    ? "text-white md:text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/contact")
                    ? "text-white md:text-blue-700"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="relative group">
                <span className="block py-2 px-3 text-blue-700 md:p-0 cursor-pointer">
                  Account
                </span>
                <ul className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <li>
                    <button
                      onClick={handleProfile}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleChangePassword}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Change Password
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/login")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    Sign in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className={`block py-2 px-3 rounded-sm md:p-0 ${
                      isActive("/register")
                        ? "text-white md:text-blue-700"
                        : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                    }`}
                  >
                    Sign up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
