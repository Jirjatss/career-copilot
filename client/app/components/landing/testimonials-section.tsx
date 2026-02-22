import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah J.",
    role: "UX Designer",
    text: "This platform helped me land my dream job in 2 weeks!",
    avatar:
      "https://cdn.topkarir.com/production/assets/revamp/images/testimoni/leontyne_lingga.webp",
  },
  {
    id: 2,
    name: "Budi S.",
    role: "Backend Dev",
    text: "The CV review feature is a game changer. Highly recommended.",
    avatar:
      "https://cdn.topkarir.com/production/assets/revamp/images/testimoni/jimmy_jansen.webp",
  },
  {
    id: 3,
    name: "Jessica L.",
    role: "Product Manager",
    text: "I was struggling with interview prep, but the mock interviews gave me the confidence I needed to succeed.",
    avatar:
      "https://cdn.topkarir.com/production/assets/revamp/images/testimoni/yuliani_arosyanti.webp",
  },
  {
    id: 4,
    name: "Michael T.",
    role: "Data Scientist",
    text: "Incredible insights on career paths. I found a niche in data science I hadn't considered before.",
    avatar:
      "https://cdn.topkarir.com/production/assets/revamp/images/testimoni/taufik_eka_putra.webp",
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);

  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <div className="bg-white">
      <section className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          💬 Apa Kata Mereka?
        </h2>

        <div className="relative">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full shrink-0 p-8 md:p-12">
                  <div className="flex flex-col items-center text-center space-y-8">
                    {/* 1. What they say */}
                    <div className="relative max-w-2xl">
                      <p className="text-xl md:text-2xl text-gray-700 font-medium italic relative z-10 leading-relaxed">
                        "{t.text}"
                      </p>
                    </div>
                    {/* 2. Image Profile */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-50 shadow-sm">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* 3. Their Jobs */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {t.name}
                      </h3>
                      <p className="text-blue-600 font-medium">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 z-10"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 z-10"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  currentSlide === idx ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
