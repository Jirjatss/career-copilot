import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    type: "Full-time",
    image: "https://placehold.co/100x100/2563eb/FFF?text=TC",
    requirements: ["3+ years React", "TypeScript proficiency"],
    skills: ["React", "Next.js", "Tailwind"],
    benefits: ["Health Insurance", "Remote Work"],
    postedBy: "Alice (HR)",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "Startup Inc",
    location: "Jakarta",
    type: "Hybrid",
    image: "https://placehold.co/100x100/db2777/FFF?text=SI",
    requirements: ["5+ years PM experience", "Agile/Scrum"],
    skills: ["Product Strategy", "Jira", "Communication"],
    benefits: ["Stock Options", "Gym Membership"],
    postedBy: "Bob (CTO)",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "Big Data Co",
    location: "Bandung",
    type: "Full-time",
    image: "https://placehold.co/100x100/16a34a/FFF?text=BD",
    requirements: ["SQL Expert", "Python/R"],
    skills: ["Data Viz", "Tableau", "Statistics"],
    benefits: ["Flexible Hours", "Free Lunch"],
    postedBy: "Charlie (Lead Data)",
  },
  {
    id: 4,
    title: "UX Researcher",
    company: "Creative Studio",
    location: "Jogja",
    type: "Contract",
    image: "https://placehold.co/100x100/f59e0b/FFF?text=CS",
    requirements: ["User Interviews", "Usability Testing"],
    skills: ["Figma", "UserTesting", "Miro"],
    benefits: ["Flexible Schedule", "Project Bonus"],
    postedBy: "Diana (Design Lead)",
  },
  {
    id: 5,
    title: "DevOps Engineer",
    company: "Cloud Net",
    location: "Jakarta",
    type: "Full-time",
    image: "https://placehold.co/100x100/10b981/FFF?text=CN",
    requirements: ["AWS/GCP", "CI/CD Pipelines"],
    skills: ["Docker", "Kubernetes", "Terraform"],
    benefits: ["Health Insurance", "Annual Retreat"],
    postedBy: "Evan (VP Eng)",
  },
  {
    id: 6,
    title: "Marketing Specialist",
    company: "Growth Ltd",
    location: "Remote",
    type: "Part-time",
    image: "https://placehold.co/100x100/8b5cf6/FFF?text=GL",
    requirements: ["Content Strategy", "Social Media"],
    skills: ["SEO", "Google Analytics", "Copywriting"],
    benefits: ["Remote Work", "Performance Bonus"],
    postedBy: "Fiona (CMO)",
  },
];

export default function JobsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);

  // ✅ responsive items per page
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else setItemsPerPage(2);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const next = () => setCurrentPage((p) => (p + 1) % totalPages);
  const prev = () => setCurrentPage((p) => (p - 1 + totalPages) % totalPages);

  return (
    <div className="bg-gray-50 py-10 md:py-16">
      <section className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto px-4">
        {/* ✅ Banner responsive */}
        <div className="relative h-[260px] sm:h-[320px] lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl group">
          <img
            src="https://media.istockphoto.com/id/2203219306/photo/science-and-research-concept.jpg?s=612x612&w=0&k=20&c=w3Z-Zk26-3vRhNuEhO8taBP0EaUTSgYrSII6z9CyZC4="
            alt="Lowongan Kerja"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent flex flex-col justify-end p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">
              🔥 Latest Job Vacancies
            </h2>
            <p className="text-blue-100 text-sm md:text-lg leading-relaxed">
              Explore thousands of career opportunities from top companies and
              start your professional journey today.
            </p>
          </div>
        </div>

        {/* ✅ Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentPage * 100}%)`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="grid gap-4 md:gap-6 shrink-0"
                  style={{
                    width: "100%",
                    gridTemplateColumns: `repeat(${itemsPerPage}, minmax(0,1fr))`,
                  }}
                >
                  {jobs
                    .slice(
                      pageIndex * itemsPerPage,
                      pageIndex * itemsPerPage + itemsPerPage,
                    )
                    .map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* ✅ dots = pages */}
          <div className="flex items-center justify-between mt-6 md:mt-8">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentPage === idx ? "w-8 bg-blue-600" : "w-2 bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={prev}
                className="md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                onClick={next}
                className="md:p-3 p-3 rounded-full bg-white shadow-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition border border-gray-100 cursor-pointer z-10"
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ✅ Extract card (clean + responsive) */
function JobCard({ job }: any) {
  return (
    <div className="bg-white p-5 md:p-6 rounded-2xl border shadow-sm flex flex-col gap-4 h-full">
      <div className="flex gap-3 items-center">
        <img
          src={job.image}
          alt={job.company}
          className="w-12 h-12 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-base md:text-lg text-gray-500">
            {job.title}
          </h3>
          <p className="text-blue-600 font-bold text-sm">{job.company}</p>
        </div>
      </div>

      <div className="space-y-3 flex-1">
        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Requirements
          </p>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {job.requirements.map((req: string, i: number) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Skills
          </p>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill: string, i: number) => (
              <span
                key={i}
                className="text-xs font-medium bg-blue-50 text-blue-700 px-2 py-1 rounded-md"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
            Benefits
          </p>
          <p className="text-sm text-gray-600">{job.benefits.join(", ")}</p>
        </div>
      </div>

      <div className="flex justify-between items-end pt-4 border-t border-gray-100 mt-auto">
        <div className="flex flex-col gap-1 text-xs text-gray-500">
          <span className="flex items-center gap-1">📍 {job.location}</span>
          <span className="flex items-center gap-1">💼 {job.type}</span>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block mb-0.5">
            Posted by
          </span>
          <span className="text-xs font-medium text-gray-900">
            {job.postedBy}
          </span>
        </div>
      </div>
    </div>
  );
}
