import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  User,
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Tech Career Fair 2024",
    date: "15 Oct 2026",
    location: "JCC Senayan",
    image:
      "https://landing-page-hacktiv8.s3.ap-southeast-1.amazonaws.com/banner_4_ea457611fc.webp",
    description:
      "Join over 500 tech companies and startups hiring for various roles. Bring your CV!",
    organizer: "Hacktiv8 Indonesia",
    category: "Training",
  },
  {
    id: 2,
    title: "Webinar: CV Writing 101",
    date: "20 Oct 2024",
    location: "Online",
    image:
      "https://assets.loket.com/neo/production/images/banner/20250423220640_680902004204e.jpg",
    description:
      "Learn how to craft a ATS-friendly CV that gets you noticed by recruiters.",
    organizer: "TransferWawasan",
    category: "Webinar",
  },
  {
    id: 3,
    title: "AI for Business Leaders",
    date: "25 Oct 2024",
    location: "Grand Hyatt Jakarta",
    image:
      "https://assets.loket.com/neo/production/images/banner/20230818131838_64df0d3e3d3e3.jpg",
    description:
      "A comprehensive workshop on implementing AI strategies in your organization.",
    organizer: "FutureTech",
    category: "Workshop",
  },
];

export default function EventsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
  };

  return (
    <div className="bg-gray-50 py-12 mt-10">
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              📅 Upcoming Events
            </h2>
            <p className="text-gray-600 mt-2">
              Don't miss out on these opportunities to grow.
            </p>
          </div>

          {events.length > itemsPerPage && (
            <div className="flex gap-2 md:justify-end justify-center flex-1 w-full">
              <button
                onClick={prevSlide}
                className="md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
              >
                <ChevronLeft />
              </button>
              <button
                onClick={nextSlide}
                className="md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
              >
                <ChevronRight />
              </button>
            </div>
          )}
        </div>

        <div className="overflow-hidden -mx-2 pb-2">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerPage)}%)`,
            }}
          >
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsPerPage}%` }}
              >
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition group h-full flex flex-col">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={ev.image}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm">
                      {ev.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full flex items-center gap-1">
                        <Calendar size={12} /> {ev.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
                      {ev.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                      {ev.description}
                    </p>

                    <div className="pt-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {ev.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <User size={12} /> {ev.organizer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
