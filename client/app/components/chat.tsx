"use client";
import { useState, useRef, useEffect } from "react";
import { Paperclip, Send, Bot } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Mode = "career" | "interview" | "cv" | "hr";

type Message = {
  role: "user" | "ai";
  text?: string;
  file?: {
    name: string;
    type: string;
    url: string;
  };
};

const welcomeMessages: Record<Mode, string> = {
  career:
    "Hello! You are in **Career Mode**. I'm here to help you navigate your professional journey. You can ask me about career paths, skill development, industry trends, or how to advance in your current role. What's on your mind today?",
  interview:
    "Hi! Welcome to **Interview Mode**. I can help you prepare for your upcoming interviews. We can practice common questions, discuss behavioral interview strategies, or refine your elevator pitch. Let's get you ready to ace that interview!",
  cv: "Welcome to **CV Review Mode**. Please upload your CV or Resume (PDF, DOCX, or Image), and I'll provide detailed feedback. I can check for formatting, keyword optimization, and clarity to help your application stand out to recruiters.",
  hr: "Hello! You are in **HR Policies Mode**. I can assist you with questions regarding company policies, employee benefits, leave procedures, and workplace conduct. What would you like to know?",
};

export default function Chat() {
  const [conversations, setConversations] = useState<Record<Mode, Message[]>>({
    career: [{ role: "ai", text: welcomeMessages.career }],
    interview: [{ role: "ai", text: welcomeMessages.interview }],
    cv: [{ role: "ai", text: welcomeMessages.cv }],
    hr: [{ role: "ai", text: welcomeMessages.hr }],
  });
  const [mode, setMode] = useState<Mode>("career");
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const chatRef = useRef<HTMLDivElement | null>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const messages = conversations[mode];

  const setMessages = (newMessages: Message[]) => {
    setConversations((prev) => ({ ...prev, [mode]: newMessages }));
  };

  useEffect(() => {
    setFile(null);
  }, [mode]);

  const modeOptions = [
    {
      label: "Career",
      value: "career",
    },
    {
      label: "Interview",
      value: "interview",
    },
    {
      label: "CV Review",
      value: "cv",
    },
    {
      label: "HR Policies",
      value: "hr",
    },
  ];

  const sendMessage = async (text: string, file?: File | null) => {
    const newMessage: Message = {
      role: "user",
      text,
      file: file
        ? {
            name: file.name,
            type: file.type,
            url: URL.createObjectURL(file), // ⭐ preview bubble
          }
        : undefined,
    };

    const newMessages = [...messages, newMessage];
    setMessages([...newMessages, { role: "ai", text: "Thinking..." }]);
    setLoading(true);

    const form = new FormData();

    let messageToSend = text;
    const hasFileInHistory = messages.some((m) => m.file);

    if (mode === "cv" && !file && hasFileInHistory) {
      messageToSend = `[Instruction: The user is asking a follow-up question about the previously uploaded CV. Do NOT re-review the CV. Focus on answering the user's question directly.]\n\n${text}`;
    }

    form.append("message", messageToSend);
    form.append("mode", mode);
    form.append("history", JSON.stringify(messages));

    if (file) form.append("file", file);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        body: form,
      });

      const data = await res.json();

      setMessages([...newMessages, { role: "ai", text: data.reply }]);
    } catch {
      setMessages([...newMessages, { role: "ai", text: "Error 😭" }]);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    const el = chatRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    });
  };

  const submit = () => {
    if (!input && !file) return;
    sendMessage(input, file);
    setInput("");
    setFile(null);
  };

  useEffect(() => {
    return () => {
      messages.forEach((m) => {
        if (m.file?.url) URL.revokeObjectURL(m.file.url);
      });
    };
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;

    const handleScroll = () => {
      const threshold = 120; // jarak dari bawah
      const isAwayFromBottom =
        el.scrollHeight - el.scrollTop - el.clientHeight > threshold;

      setShowScrollBtn(isAwayFromBottom);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-full max-w-md bg-gray-100 rounded-xl shadow-2xl flex flex-col h-150 overflow-hidden border-gray-200 border">
      {/* ✅ MODE SELECTOR */}
      <div className="p-3 border-b bg-white flex gap-2 flex-wrap shadow-sm z-10">
        {modeOptions.map((m, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.preventDefault();
              setMode(m.value as Mode);
            }}
            className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
              mode === m.value
                ? "bg-blue-700 text-white shadow border border-blue-900"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* ✅ CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3" ref={chatRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start gap-2"
            }`}
          >
            {msg.role === "ai" && (
              <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                <Bot size={18} className="text-blue-700" />
              </div>
            )}
            <div
              className={`px-3 py-2 rounded-xl max-w-[75%] text-sm space-y-2 shadow-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-800 border border-gray-100"
              }`}
            >
              {/* ⭐ FILE PREVIEW */}
              {msg.file && (
                <div className="bg-white/20 rounded-lg p-2 flex items-center gap-2">
                  {/* IMAGE */}
                  {msg.file.type.startsWith("image") ? (
                    <img
                      src={msg.file.url}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ) : (
                    /* ⭐ FILE CARD */
                    <div className="flex items-center gap-2">
                      <div className="text-lg">📄</div>

                      <div className="flex flex-col text-xs">
                        <span className="font-medium break-all">
                          {msg.file.name}
                        </span>
                        <span className="opacity-70">{msg.file.type}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* text */}
              {msg.text && <ReactMarkdown>{msg.text}</ReactMarkdown>}
            </div>
          </div>
        ))}
      </div>

      {/* ✅ INPUT AREA */}
      <div className="p-3 border-t bg-white space-y-2">
        {/* file only cv */}
        {mode === "cv" && (
          <div className={`${file ? "flex flex-col gap-2" : "hidden"} `}>
            {/* Hidden input */}
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.doc,.docx,.png,.jpg"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            {/* Preview */}
            {file && (
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl border bg-gray-100">
                <div className="flex items-center gap-3 overflow-hidden">
                  {/* icon */}
                  <div className="w-9 h-9 rounded-lg bg-white border flex items-center justify-center text-xs">
                    📄
                  </div>

                  {/* file info */}
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-medium truncate text-neutral-500">
                      {file.name}
                    </span>
                    <span className="text-xs text-neutral-500">
                      {(file.size / 1024).toFixed(0)} KB
                    </span>
                  </div>
                </div>

                {/* delete button */}
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="text-xs px-2 py-1 rounded-md border bg-red-600 hover:bg-red-100 hover:text-red-600 transition cursor-pointer"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        <div className="flex gap-2">
          <input
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${mode}...`}
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 text-black bg-gray-50 focus:bg-white transition-colors outline-none focus:ring-2 focus:ring-blue-100"
          />

          {mode === "cv" && !file && (
            <label
              htmlFor="file-upload"
              className="border border-gray-200 rounded-lg p-2 bg-gray-50 hover:bg-white w-fit cursor-pointer transition flex items-center justify-center"
              title="Upload CV"
            >
              <Paperclip size={18} className="text-neutral-600" />
            </label>
          )}
          <button
            onClick={submit}
            disabled={loading || !input}
            type="button"
            className="border border-gray-200 rounded-lg px-4 py-2 text-gray-900 bg-gray-50 hover:bg-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400 transition flex items-center justify-center"
          >
            <Send size={18} className="text-neutral-600" />
          </button>

          {showScrollBtn && (
            <button
              type="button"
              onClick={scrollToBottom}
              className="absolute bottom-20 right-4 bg-blue-700 text-white text-xs px-3 py-2 rounded-full shadow hover:bg-blue-800 transition cursor-pointer"
            >
              ↓ New messages
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
