'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Ошибка в компоненте:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <Image
        src="/server-error.png"
        alt="Server Error"
        width={300}
        height={300}
        className="dark:invert"
      />
      <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4 dark:text-white">
        500 - Ошибка сервера
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md dark:text-gray-300">
        Произошла внутренняя ошибка сервера. Пожалуйста, попробуйте обновить страницу позже.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={reset}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Повторить попытку
        </button>
        <Link
          href="/"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
        >
          На главную
        </Link>
      </div>
    </div>
  );
}