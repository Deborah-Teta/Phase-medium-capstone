// src/components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-green-600">
          MediumClone
        </Link>

        <nav className="space-x-6">
          <Link href="/" className="text-gray-700 hover:text-black">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-black">
            About
          </Link>
          <Link href="/login" className="text-gray-700 hover:text-black">
            Sign In
          </Link>
          <Link
            href="/write"
            className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700"
          >
            Write
          </Link>
        </nav>
      </div>
    </header>
  );
}