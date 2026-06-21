"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUICK_PROMPTS = [
  "💡 Explain Quicksort vs Mergesort",
  "⚡ Compare Space & Time Complexity",
  "🧠 How to solve Two Sum optimal?",
  "❓ What is recursion base case?",
  "🚀 Explain Kadane's Algorithm",
];

// High-fidelity SVG Gemini Star Logo
function GeminiLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <mask
        id="maskme"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="65"
        height="65"
      >
        <path
          d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.7-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
          fill="#000"
        />
        <path
          d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
          fill="url(#prefix__paint0_linear_2001_67)"
        />
      </mask>
      <g mask="url(#maskme)">
        <g filter="url(#prefix__filter0_f_2001_67)">
          <path
            d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z"
            fill="#FFE432"
          />
        </g>
        <g filter="url(#prefix__filter1_f_2001_67)">
          <path
            d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z"
            fill="#FC413D"
          />
        </g>
        <g filter="url(#prefix__filter2_f_2001_67)">
          <path
            d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
            fill="#00B95C"
          />
        </g>
        <g filter="url(#prefix__filter3_f_2001_67)">
          <path
            d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
            fill="#00B95C"
          />
        </g>
        <g filter="url(#prefix__filter4_f_2001_67)">
          <path
            d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z"
            fill="#00B95C"
          />
        </g>
        <g filter="url(#prefix__filter5_f_2001_67)">
          <path
            d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z"
            fill="#3186FF"
          />
        </g>
        <g filter="url(#prefix__filter6_f_2001_67)">
          <path
            d="M-13.065 40.944c9.33 7.094 22.959 4.869 30.442-4.972 7.483-9.84 5.987-23.569-3.343-30.663C4.704-1.786-8.924.439-16.408 10.28c-7.483 9.84-5.986 23.57 3.343 30.664z"
            fill="#FBBC04"
          />
        </g>
        <g filter="url(#prefix__filter7_f_2001_67)">
          <path
            d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z"
            fill="#3186FF"
          />
        </g>
        <g filter="url(#prefix__filter8_f_2001_67)">
          <path
            d="M54.984-2.336c2.833 3.852-.808 11.34-8.131 16.727-7.324 5.387-15.557 6.631-18.39 2.78-2.833-3.853.807-11.342 8.13-16.728 7.324-5.387 15.558-6.631 18.39-2.78z"
            fill="#749BFF"
          />
        </g>
        <g filter="url(#prefix__filter9_f_2001_67)">
          <path
            d="M31.727 16.104C43.053 5.598 46.94-8.626 40.41-15.666c-6.53-7.04-21.006-4.232-32.332 6.274s-15.214 24.73-8.683 31.77c6.53 7.04 21.006 4.232 32.332-6.274z"
            fill="#FC413D"
          />
        </g>
        <g filter="url(#prefix__filter10_f_2001_67)">
          <path
            d="M8.51 53.838c6.732 4.818 14.46 5.55 17.262 1.636 2.802-3.915-.384-10.994-7.116-15.812-6.731-4.818-14.46-5.55-17.261-1.636-2.802 3.915.383 10.994 7.115 15.812z"
            fill="#FFEE48"
          />
        </g>
      </g>
      <defs>
        <filter
          id="prefix__filter0_f_2001_67"
          x="-19.824"
          y="13.152"
          width="39.274"
          height="43.217"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter1_f_2001_67"
          x="-15.001"
          y="-40.257"
          width="84.868"
          height="85.688"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter2_f_2001_67"
          x="-20.776"
          y="11.927"
          width="79.454"
          height="90.916"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter3_f_2001_67"
          x="-20.776"
          y="11.927"
          width="79.454"
          height="90.916"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter4_f_2001_67"
          x="-19.845"
          y="15.459"
          width="79.731"
          height="81.505"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter5_f_2001_67"
          x="29.832"
          y="-11.552"
          width="75.117"
          height="73.758"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter6_f_2001_67"
          x="-38.583"
          y="-16.253"
          width="78.135"
          height="78.758"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="8.706" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter7_f_2001_67"
          x="8.107"
          y="-5.966"
          width="78.877"
          height="77.539"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter8_f_2001_67"
          x="13.587"
          y="-18.488"
          width="56.272"
          height="51.81"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="6.957" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter9_f_2001_67"
          x="-15.526"
          y="-31.297"
          width="70.856"
          height="69.306"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="5.876" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter
          id="prefix__filter10_f_2001_67"
          x="-14.168"
          y="20.964"
          width="55.501"
          height="51.571"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="7.273" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <linearGradient
          id="prefix__paint0_linear_2001_67"
          x1="18.447"
          y1="43.42"
          x2="52.153"
          y2="15.004"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4893FC" />
          <stop offset=".27" stopColor="#4893FC" />
          <stop offset=".777" stopColor="#969DFF" />
          <stop offset="1" stopColor="#BD99FE" />
        </linearGradient>
      </defs>
    </svg>
  );
}



export default function Chatbot() {
  const { user, isGuest } = useAuth();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey there! I am your DSA Helper. Ask me anything about Data Structures, Algorithms, or your current sheet problems!",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      if (data.success && data.message) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
      } else {
        throw new Error(data.error || "Failed to get response from assistant");
      }
    } catch (err: unknown) {
      const e = err as Error;
      console.error("Error communicating with chat API:", e);
      setError(e.message || "Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestionClick = (promptText: string) => {
    // Strip emoji prefix from suggestion prompt text for query
    const cleanPrompt = promptText.replace(/^[\uD800-\uDBFF\uDC00-\uDFFF\u2600-\u27BF]\s*/, "");
    handleSendMessage(cleanPrompt);
  };

  // Custom Inline styles renderer (Bolds and Monospace Codes)
  const parseInlineStyles = (text: string): React.ReactNode[] => {
    const tokens = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return tokens.map((token, idx) => {
      if (token.startsWith("**") && token.endsWith("**")) {
        return (
          <strong key={idx} className="font-extrabold text-black">
            {token.slice(2, -2)}
          </strong>
        );
      }
      if (token.startsWith("`") && token.endsWith("`")) {
        return (
          <code
            key={idx}
            className="px-1.5 py-0.5 bg-neutral-200 border border-black font-mono text-[11px] text-rose-600 rounded-none font-bold"
          >
            {token.slice(1, -1)}
          </code>
        );
      }
      return token;
    });
  };

  // Custom Markdown block element renderer
  const formatMessageContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```")) {
        const match = part.match(/```(\w*)\n([\s\S]*?)```/);
        const language = match ? match[1] : "";
        const code = match ? match[2].trim() : part.slice(3, -3).trim();

        return (
          <div
            key={index}
            className="my-2.5 border-2 border-black shadow-neo-sm overflow-hidden flex flex-col"
          >
            <div className="bg-neutral-900 text-white px-3 py-1.5 text-[10px] font-black uppercase flex items-center justify-between border-b-2 border-black">
              <span>{language || "code"}</span>
              <button
                onClick={() => navigator.clipboard.writeText(code)}
                className="text-neoYellow hover:text-white uppercase font-black text-[9px] cursor-pointer"
              >
                Copy Code
              </button>
            </div>
            <pre className="bg-neutral-950 text-neoGreen p-3 font-mono text-xs overflow-x-auto scrollbar-custom max-h-60 leading-normal">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      const lines = part.split("\n");
      const formattedLines = lines.map((line, lineIdx) => {
        // Bullet list checks
        if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
          const cleanLine = line.trim().slice(2);
          return (
            <li key={lineIdx} className="ml-4 list-disc font-bold my-1 text-neutral-800 leading-normal">
              {parseInlineStyles(cleanLine)}
            </li>
          );
        }

        // Numbered list checks
        if (/^\d+\.\s/.test(line.trim())) {
          const match = line.trim().match(/^(\d+)\.\s(.*)/);
          if (match) {
            const num = match[1];
            const text = match[2];
            return (
              <div key={lineIdx} className="ml-4 font-bold my-1 text-neutral-800 flex gap-1 leading-normal">
                <span className="text-black font-extrabold">{num}.</span>
                <span>{parseInlineStyles(text)}</span>
              </div>
            );
          }
        }

        // Heading checks
        if (line.startsWith("### ")) {
          return (
            <h4 key={lineIdx} className="font-black text-sm uppercase mt-3 mb-1 text-black">
              {parseInlineStyles(line.slice(4))}
            </h4>
          );
        }
        if (line.startsWith("## ") || line.startsWith("# ")) {
          const text = line.startsWith("## ") ? line.slice(3) : line.slice(2);
          return (
            <h3
              key={lineIdx}
              className="font-black text-base uppercase mt-4 mb-2 text-black border-b-2 border-black pb-0.5"
            >
              {parseInlineStyles(text)}
            </h3>
          );
        }

        // Empty lines
        if (line.trim() === "") {
          return <div key={lineIdx} className="h-2" />;
        }

        return (
          <p key={lineIdx} className="font-bold my-1 text-neutral-800 leading-normal">
            {parseInlineStyles(line)}
          </p>
        );
      });

      return <div key={index}>{formattedLines}</div>;
    });
  };

  // Hide chatbot entirely on public pages (landing & login)
  const isPublicPage = pathname === "/" || pathname === "/login";
  if (isPublicPage) {
    return null;
  }

  // Determine if user needs to log in to use the chatbot
  const requiresLogin = !user || isGuest;

  return (
    <>
      {/* Floating help hint bubble */}
      {!isOpen && (
        <div className="fixed bottom-[88px] right-6 bg-neoPink border-2 border-black px-3 py-1.5 text-[10px] font-black uppercase shadow-neo-sm z-50 rounded-none max-w-[200px] text-center select-none text-black animate-bounce">
          {requiresLogin
            ? "AI DSA Helper — Login to get started!"
            : "AI DSA Helper — Ask anything about this problem!"}
          {/* Small arrow pointing down */}
          <div className="absolute top-full right-5 w-3 h-3 bg-neoPink border-r-2 border-b-2 border-black transform rotate-45 -translate-y-1.5" />
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-neoYellow border-4 border-black flex items-center justify-center shadow-neo hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all neo-clickable cursor-pointer z-50 rounded-none"
        title="Toggle AI Chatbot"
      >
        {isOpen ? (
          <span className="text-xl font-black">❌</span>
        ) : (
          <GeminiLogo className="w-8 h-8 select-none" />
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div
          className={`${
            isFullScreen
              ? "fixed inset-4 md:inset-10 w-auto h-auto max-w-none max-h-none"
              : "fixed bottom-24 right-6 w-96 h-[500px] max-w-[calc(100vw-2rem)]"
          } bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none z-50 flex flex-col overflow-hidden transition-all duration-200`}
        >
          {/* Header Title Bar */}
          <div className="bg-neoPink border-b-4 border-black p-3.5 flex items-center justify-between font-black uppercase text-sm select-none">
            <div className="flex items-center gap-2 text-black font-black">
              <GeminiLogo className="w-5 h-5" />
              <span>DSA HELPER</span>
            </div>
            {/* Mock Windows Controls */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 bg-white border-2 border-black font-extrabold text-[10px] flex items-center justify-center hover:bg-neoYellow cursor-pointer rounded-none active:translate-y-0.5"
                title="Minimize"
              >
                —
              </button>
              <button
                onClick={() => setIsFullScreen(!isFullScreen)}
                className={`w-5 h-5 border-2 border-black font-extrabold text-[10px] flex items-center justify-center rounded-none active:translate-y-0.5 cursor-pointer ${
                  isFullScreen ? "bg-neoBlue text-white" : "bg-white text-black hover:bg-neoBlue"
                }`}
                title={isFullScreen ? "Exit Fullscreen" : "Maximize / Fullscreen"}
              >
                {isFullScreen ? "❐" : "▢"}
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsFullScreen(false);
                }}
                className="w-5 h-5 bg-neoRed border-2 border-black font-extrabold text-[9px] flex items-center justify-center hover:bg-red-400 cursor-pointer rounded-none active:translate-y-0.5"
                title="Close"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Guest / Unauthenticated Login Gate */}
          {requiresLogin ? (
            <div className="flex-1 flex flex-col items-center justify-center bg-[#FAF9F5] p-8 gap-6">
              <div className="bg-neoYellow border-4 border-black p-6 shadow-neo rounded-none text-center max-w-xs">
                <GeminiLogo className="w-16 h-16 mx-auto mb-4" />
                <h3 className="font-black text-xl uppercase mb-2 text-black">Login Required</h3>
                <p className="font-bold text-sm text-gray-700 mb-5 leading-relaxed">
                  Sign in to unlock the AI-powered DSA Helper. Get instant explanations, code solutions, and step-by-step guidance!
                </p>
                <a
                  href="/login"
                  className="inline-block w-full py-3 bg-neoGreen border-4 border-black font-black text-sm uppercase shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer text-center text-black rounded-none"
                >
                  🔐 Login to Use
                </a>
              </div>
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-black uppercase text-gray-400">Features include</span>
                <div className="flex flex-wrap gap-1.5 justify-center max-w-xs">
                  {["DSA Explanations", "Code Solutions", "Complexity Analysis", "Problem Hints"].map((feat) => (
                    <span
                      key={feat}
                      className="bg-white border-2 border-black px-2 py-1 text-[9px] font-black uppercase text-gray-600 shadow-neo-sm"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Conversation History Stream */}
              <div className="flex-1 p-4 overflow-y-auto bg-[#FAF9F5] flex flex-col gap-4.5 scrollbar-custom">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col max-w-[85%] ${
                      msg.role === "user" ? "self-end items-end" : "self-start items-start"
                    }`}
                  >
                    <div
                      className={`border-2 border-black p-3 text-xs shadow-neo-sm text-black rounded-none ${
                        msg.role === "user"
                          ? "bg-neoBlue font-bold"
                          : "bg-white font-medium"
                      }`}
                    >
                      {msg.role === "user" ? (
                        <p className="whitespace-pre-wrap">{msg.content}</p>
                      ) : (
                        <div className="flex flex-col gap-1">{formatMessageContent(msg.content)}</div>
                      )}
                    </div>
                    <span className="text-[9px] font-black uppercase text-gray-500 mt-1 px-1">
                      {msg.role === "user" ? "You" : "DSA Helper"}
                    </span>
                  </div>
                ))}

                {/* Thinking Loading Indicator */}
                {isLoading && (
                  <div className="self-start flex flex-col max-w-[85%] items-start">
                    <div className="bg-white border-2 border-black p-3 text-xs shadow-neo-sm text-black rounded-none flex items-center gap-1 font-bold">
                      <GeminiLogo className="w-4 h-4 animate-spin" />
                      <span>Helper is typing</span>
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce [animation-delay:0.2s]">.</span>
                      <span className="animate-bounce [animation-delay:0.4s]">.</span>
                    </div>
                    <span className="text-[9px] font-black uppercase text-gray-500 mt-1 px-1">
                      DSA Helper
                    </span>
                  </div>
                )}

                {/* Error Message banner */}
                {error && (
                  <div className="bg-neoRed/10 border-2 border-neoRed p-3 text-xs font-bold text-neoRed">
                    ⚠️ Error: {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick suggestions block (Shown when no pending query is processing) */}
              {!isLoading && (
                <div className="px-3 py-2 bg-neutral-100 border-t-2 border-black overflow-x-auto flex gap-2 scrollbar-none">
                  {QUICK_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="bg-white border-2 border-black hover:bg-neoYellow text-[10px] font-black uppercase px-2.5 py-1.5 cursor-pointer shadow-neo-sm flex-shrink-0 transition-all hover:-translate-y-0.5 active:translate-y-0.5 rounded-none"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {/* User Input Form */}
              <form
                onSubmit={handleFormSubmit}
                className="p-3 bg-white border-t-4 border-black flex gap-2 items-center"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a DSA question..."
                  disabled={isLoading}
                  className="flex-1 border-2 border-black p-2 font-bold text-xs bg-neoCream focus:outline-none focus:bg-white placeholder-gray-500 rounded-none"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="px-4.5 py-2 bg-neoGreen border-2 border-black font-black uppercase text-xs shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center rounded-none"
                >
                  Send
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
