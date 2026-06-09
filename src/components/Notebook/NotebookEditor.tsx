"use client";

import React, { useRef, useState, useEffect } from "react";

interface NotebookEditorProps {
  initialValue: string;
  onSave: (content: string) => void;
}

export default function NotebookEditor({ initialValue, onSave }: NotebookEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorHtml, setEditorHtml] = useState(initialValue);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== initialValue) {
      editorRef.current.innerHTML = initialValue;
    }
  }, [initialValue]);

  // Executive formatting controls mapping
  const runFormat = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  const handleBlur = () => {
    if (editorRef.current) {
      setEditorHtml(editorRef.current.innerHTML);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg overflow-hidden border-2 border-black">
      {/* Editor Menu Bar */}
      <div className="bg-gray-100 border-b-2 border-black p-2 flex flex-wrap gap-2 sticky top-0 z-10">
        <button
          onClick={() => runFormat("bold")}
          className="px-3 py-1.5 bg-white border-2 border-black font-extrabold text-xs shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 cursor-pointer"
        >
          B
        </button>
        <button
          onClick={() => runFormat("italic")}
          className="px-3 py-1.5 bg-white border-2 border-black italic font-bold text-xs shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 cursor-pointer"
        >
          I
        </button>
        <button
          onClick={() => runFormat("underline")}
          className="px-3 py-1.5 bg-white border-2 border-black underline text-xs shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 cursor-pointer"
        >
          U
        </button>
        <button
          onClick={() => runFormat("insertUnorderedList")}
          className="px-3 py-1.5 bg-white border-2 border-black text-xs shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-gray-50 cursor-pointer"
        >
          • List
        </button>
        <div className="flex-grow" />
        <button
          onClick={() => onSave(editorHtml)}
          className="px-4 py-1.5 bg-neoGreen border-2 border-black font-black text-xs shadow-neo-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-green-300 cursor-pointer"
        >
          SAVE NOTE
        </button>
      </div>

      {/* Lined Notebook Paper Editor Area */}
      <div className="flex-1 overflow-auto bg-white min-h-[350px]">
        <div
          ref={editorRef}
          contentEditable
          onInput={(e) => setEditorHtml(e.currentTarget.innerHTML)}
          onBlur={handleBlur}
          className="notebook-paper w-full h-full min-h-[350px] outline-none font-medium text-gray-800 text-base leading-7 tracking-wide select-text"
          style={{ wordBreak: "break-word" }}
        />
      </div>
    </div>
  );
}
