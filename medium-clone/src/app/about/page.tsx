"use client";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-8">
      {/* HEADER */}
      <header className="text-center">
        <h1 className="text-5xl font-bold mb-2">About Medium Clone</h1>
        <p className="text-gray-300 text-lg">
          Learn more about our platform and mission
        </p>
      </header>

      {/* MISSION SECTION */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Our Mission</h2>
        <p className="text-gray-200 leading-relaxed">
          Medium Clone is a platform where writers can share their stories and readers can discover meaningful content. 
          Our mission is to empower individuals to express themselves and connect through ideas.
        </p>
      </section>

      {/* TEAM SECTION */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Our Team</h2>
        <p className="text-gray-200 leading-relaxed">
          We are a small team passionate about writing, reading, and technology. Our goal is to build a simple, beautiful, 
          and intuitive experience for creators and readers alike.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Contact Us</h2>
        <p className="text-gray-200 leading-relaxed">
          Questions, feedback, or just want to say hi? Reach out at 
          <a href="mailto:hello@mediumclone.com" className="text-green-600 underline ml-1">hello@mediumclone.com</a>.
        </p>
      </section>
    </div>
  );
}
