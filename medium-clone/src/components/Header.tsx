import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-100 p-4 mb-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">Medium Clone</Link>
        <div className="space-x-4 text-amber-700">
          <Link href="/login">Login</Link>
          <Link href="/signup">Sign Up</Link>
        </div>
      </nav>
    </header>
  );
}
