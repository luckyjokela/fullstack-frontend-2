import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <Image
        src="/not-found.jpg"
        alt="Not Found"
        width={300}
        height={300}
        className="dark:invert"
      />
      <h1 className="text-4xl font-bold text-gray-800 mt-8 mb-4 dark:text-white">
        404 - Страница не найдена
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-md dark:text-gray-300">
        Извините, страница, которую вы искали, не существует или перемещена.
      </p>
      <Link
        href="/"
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-md"
      >
        На главную
      </Link>
    </div>
  );
}