import React from "react";
import HeroCarousel from "./landing/hero-carousel";
import JobsSection from "./landing/jobs-section";
import EventsSection from "./landing/events-section";
import TestimonialsSection from "./landing/testimonials-section";

export default function LandingContent() {
  return (
    <div className="flex flex-col gap-16">
      <div id="home">
        <HeroCarousel />
      </div>
      <div className="bg-gray-50">
        <div id="jobs" className="scroll-mt-24">
          <JobsSection />
        </div>
        <div id="events" className="scroll-mt-24">
          <EventsSection />
        </div>
      </div>

      <div id="testimonials" className="scroll-mt-24">
        <TestimonialsSection />
      </div>
    </div>
  );
}
