import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Logo from "../logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        {/* Brand */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-blue-400" />
            <h3 className="text-2xl font-bold text-blue-400">CareerCopilot</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Your personal AI assistant for professional growth. Build your dream
            career with personalized guidance.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-bold text-lg mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <a href="#home" className="hover:text-blue-400 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#jobs" className="hover:text-blue-400 transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="#events" className="hover:text-blue-400 transition">
                Events
              </a>
            </li>
            <li>
              <a
                href="#testimonials"
                className="hover:text-blue-400 transition"
              >
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-4">Contact Us</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} />
              <span>support@careercopilot.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} />
              <span>+62 812 3456 7890</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} />
              <span>Jakarta, Indonesia</span>
            </li>
          </ul>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-bold text-lg mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} CareerCopilot. All rights reserved.
      </div>
    </footer>
  );
}
