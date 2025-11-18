// src/app/page.tsx
export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="text-center py-20">
        <h1 className="text-6xl font-bold mb-4">
          Welcome to Medium Clone
        </h1>
        <p className="text-xl text-gray-600">
          Start writing, reading, and clapping stories.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-900">
        {["Card 1", "Card 2", "Card 3"].map((title) => (
          <div key={title} className="bg-amber-100 p-6 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600">
              This is a placeholder card. Real posts will appear here later.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}