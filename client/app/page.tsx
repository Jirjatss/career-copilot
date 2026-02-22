"use client";
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Chat from "./components/chat";
import LandingContent from "./components/landing-content";
import Navbar from "./components/layout/navbar";
import Footer from "./components/layout/footer";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [isOpenChat, setIsOpenChat] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <Navbar />

      {/* LANDING CONTENT */}
      <LandingContent />

      {/* FOOTER */}
      <Footer />

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setIsOpenChat((v) => !v)}
        className={`fixed bottom-6 right-6 p-4 rounded-full text-white shadow-2xl z-50 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
          isOpenChat ? "bg-gray-800" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isOpenChat ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            <span className="font-semibold text-lg">Ask Copilot</span>
          </>
        )}
      </button>

      {/* CHAT WITH ANIMATION */}
      <AnimatePresence>
        {isOpenChat && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-50"
          >
            <Chat />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
