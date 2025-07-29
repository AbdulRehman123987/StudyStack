import React from "react";

export default function AboutPage() {
  return (
    <div className="px-6 py-10 md:px-20 lg:px-32 bg-white text-gray-800">
      <section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering students to share and access valuable study notes with
          ease.
        </p>
      </section>

      <section className=" w-full h-[370px] flex justify-center mb-12">
        <img
          src="/aboutBanner.jpg"
          alt="Notes sharing"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Core Description */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="w-full h-64 bg-gray-100 rounded-lg shadow-sm flex items-center justify-center">
          <img
            src="/banner.jpg"
            alt="Upload and Download Notes"
            className="w-full h-full "
          />
        </div>

        {/* Text */}
        <div>
          <h2 className="text-2xl font-semibold mb-3">What We Do</h2>
          <p className="text-gray-600 mb-2">
            Our platform is designed to make sharing and accessing study notes
            fast, simple, and free from distractions. Whether you're preparing
            for exams or looking to review course materials, we make it easy.
          </p>
          <p className="text-gray-600">
            Upload your notes, download what you need, and support a community
            of learners just like you. No sign-up stress, no endless clicks—just
            valuable knowledge at your fingertips.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-6">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Fast & Easy",
              desc: "Quickly upload and download notes without complex steps.",
            },
            {
              title: "Community Driven",
              desc: "Built by students, for students. Share your knowledge freely.",
            },
            {
              title: "Accessible Anywhere",
              desc: "Access materials from any device, at any time.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-blue-50 rounded-xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="mt-24 text-center">
        <h2 className="text-3xl font-semibold mb-4">Start Sharing Today</h2>
        <p className="text-gray-600 mb-6">
          Whether you’re uploading or downloading, you’re helping others
          succeed.
        </p>
        <button className="bg-black cursor-pointer text-white px-6 py-3 rounded-full hover:bg-black-700 transition">
          Upload Your Notes
        </button>
      </section>

      {/* Final Image Placeholder */}
      <section className=" w-full h-[370px] mt-16 flex justify-center">
        <img
          src="/aboutBanner2.jpg"
          alt="Students Collaboration"
          className="w-full h-full object-cover"
        />
      </section>
    </div>
  );
}
