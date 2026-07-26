"use client";

import React, { useState, useEffect, useMemo, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";

interface NoteItem {
  id: string;
  title: string;
  filename: string;
  fileType: "pdf" | "png";
  category: string;
  chapter: string;
  size: string;
  description: string;
  tags: string[];
  color: string;
}

const NOTES_DATA: NoteItem[] = [
  {
    id: "00_SalesDB_DataModel",
    title: "Sales DB Data Model Diagram",
    filename: "00_SalesDB_DataModel.png",
    fileType: "png",
    category: "Data Model",
    chapter: "Ch. 00",
    size: "175 KB",
    description: "Visual ERD diagram illustrating Sales Database schema, primary/foreign key relationships, and table structures.",
    tags: ["ERD", "Schema", "Database Design", "Diagram"],
    color: "bg-neoPurple",
  },
  {
    id: "01_SQL_Introduction",
    title: "SQL Introduction & RDBMS Fundamentals",
    filename: "01_SQL_Introduction.pdf",
    fileType: "pdf",
    category: "Fundamentals",
    chapter: "Ch. 01",
    size: "3.5 MB",
    description: "Comprehensive introduction to relational databases, SQL syntax basics, and core database architecture.",
    tags: ["RDBMS", "Basics", "SQL Fundamentals", "Data Types"],
    color: "bg-neoYellow",
  },
  {
    id: "02_Query_Data_SELECT",
    title: "Querying Data with SELECT Statements",
    filename: "02_Query_Data_SELECT.pdf",
    fileType: "pdf",
    category: "Queries",
    chapter: "Ch. 02",
    size: "12.6 MB",
    description: "Deep dive into SELECT queries, column aliases, expressions, arithmetic operators, and DISTINCT keyword.",
    tags: ["SELECT", "Aliases", "DISTINCT", "Columns"],
    color: "bg-neoBlue",
  },
  {
    id: "03_Data_Definition_DDL",
    title: "Data Definition Language (DDL)",
    filename: "03_Data_Definition_DDL.pdf",
    fileType: "pdf",
    category: "DDL & DML",
    chapter: "Ch. 03",
    size: "1.0 MB",
    description: "Guide to managing database structure: CREATE, ALTER, DROP, TRUNCATE tables, and integrity constraints.",
    tags: ["DDL", "CREATE", "ALTER", "DROP", "Constraints"],
    color: "bg-neoGreen",
  },
  {
    id: "04_Data_Manipulation_DML",
    title: "Data Manipulation Language (DML)",
    filename: "04_Data_Manipulation_DML.pdf",
    fileType: "pdf",
    category: "DDL & DML",
    chapter: "Ch. 04",
    size: "1.8 MB",
    description: "Inserting, updating, and deleting rows with INSERT, UPDATE, DELETE, and MERGE statements.",
    tags: ["DML", "INSERT", "UPDATE", "DELETE", "Transactions"],
    color: "bg-neoPink",
  },
  {
    id: "05_Filtering_Data",
    title: "Filtering Data & Logical Operators",
    filename: "05_Filtering_Data.pdf",
    fileType: "pdf",
    category: "Queries",
    chapter: "Ch. 05",
    size: "4.2 MB",
    description: "Mastering WHERE clauses, AND/OR/NOT logic, LIKE pattern matching, IN lists, and BETWEEN range checks.",
    tags: ["WHERE", "LIKE", "IN", "BETWEEN", "Filtering"],
    color: "bg-neoYellow",
  },
  {
    id: "06_JOINS_and_SET",
    title: "SQL Joins & Set Operators",
    filename: "06_JOINS_and_SET.pdf",
    fileType: "pdf",
    category: "Joins & Functions",
    chapter: "Ch. 06",
    size: "14.4 MB",
    description: "In-depth guide to INNER JOIN, LEFT JOIN, RIGHT JOIN, FULL JOIN, CROSS JOIN, UNION, INTERSECT, and EXCEPT.",
    tags: ["JOINS", "INNER JOIN", "LEFT JOIN", "UNION", "Set Theory"],
    color: "bg-neoBlue",
  },
  {
    id: "07_Row_Level_Functions",
    title: "Row-Level & Scalar Functions",
    filename: "07_Row_Level_Functions.pdf",
    fileType: "pdf",
    category: "Joins & Functions",
    chapter: "Ch. 07",
    size: "16.5 MB",
    description: "String manipulation, date/time calculations, numeric functions, NULL handling (COALESCE, NVL), and CASE statements.",
    tags: ["Scalar Functions", "String", "Date Functions", "COALESCE", "CASE WHEN"],
    color: "bg-neoPurple",
  },
  {
    id: "08_Aggregation_Analytical_Functions",
    title: "Aggregation & Analytical Window Functions",
    filename: "08_Aggregation_Analytical_Functions.pdf",
    fileType: "pdf",
    category: "Analytics",
    chapter: "Ch. 08",
    size: "14.6 MB",
    description: "GROUP BY, HAVING clauses, Aggregate functions (SUM, AVG, COUNT), and Window Functions (ROW_NUMBER, RANK, OVER).",
    tags: ["GROUP BY", "HAVING", "Window Functions", "RANK", "Analytics"],
    color: "bg-neoGreen",
  },
  {
    id: "09_Advanced_SQL_Techniques",
    title: "Advanced SQL Techniques & CTEs",
    filename: "09_Advanced_SQL_Techniques.pdf",
    fileType: "pdf",
    category: "Advanced",
    chapter: "Ch. 09",
    size: "25.5 MB",
    description: "Common Table Expressions (WITH clause), Recursive CTEs, Correlated Subqueries, Views, and Materialized Views.",
    tags: ["CTEs", "Subqueries", "Recursive SQL", "Views", "Advanced"],
    color: "bg-neoRed",
  },
  {
    id: "10_Performance_Optimization",
    title: "SQL Performance Optimization & Indexing",
    filename: "10_Performance_Optimization.pdf",
    fileType: "pdf",
    category: "Optimization",
    chapter: "Ch. 10",
    size: "9.2 MB",
    description: "Query optimization strategies, EXPLAIN execution plans, B-Tree indexes, composite indexes, and performance tuning.",
    tags: ["Performance", "Indexes", "EXPLAIN", "Query Tuning", "Optimization"],
    color: "bg-neoYellow",
  },
  {
    id: "10_SQL_30_Performance_Tips",
    title: "30 Actionable SQL Performance Tips",
    filename: "10_SQL_30_Performance_Tips.pdf",
    fileType: "pdf",
    category: "Optimization",
    chapter: "Ch. 10 Extra",
    size: "2.8 MB",
    description: "A quick-reference guide with 30 actionable tips to write faster, cleaner, and highly scalable SQL queries.",
    tags: ["Performance Tips", "Cheat Sheet", "Query Tuning", "Best Practices"],
    color: "bg-neoBlue",
  },
  {
    id: "11_AI_and_SQL",
    title: "AI & SQL Workflows",
    filename: "11_AI_and_SQL.pdf",
    fileType: "pdf",
    category: "AI & SQL",
    chapter: "Ch. 11",
    size: "1.5 MB",
    description: "Leveraging AI LLMs, Text-to-SQL prompt engineering, automated schema mapping, and AI query debugging.",
    tags: ["AI", "LLM", "Text-to-SQL", "Prompting", "Automation"],
    color: "bg-neoPink",
  },
  {
    id: "12_SQL_Projects",
    title: "SQL Real-World Projects Overview",
    filename: "12_SQL_Projects.pdf",
    fileType: "pdf",
    category: "Projects",
    chapter: "Ch. 12",
    size: "7.9 MB",
    description: "Hands-on projects suite covering end-to-end database design, data analysis, and business metrics calculation.",
    tags: ["Projects", "Case Studies", "Business Intelligence", "Portfolio"],
    color: "bg-neoGreen",
  },
  {
    id: "12_SQL_Projects_Data_Analytics",
    title: "SQL Data Analytics Projects",
    filename: "12_SQL_Projects_Data_Analytics.pdf",
    fileType: "pdf",
    category: "Projects",
    chapter: "Ch. 12 Analytics",
    size: "7.5 MB",
    description: "Practical analytics projects: Cohort analysis, Customer Lifetime Value (CLV), churn calculation, and sales dashboards.",
    tags: ["Analytics Projects", "Cohort Analysis", "Churn Rate", "CLV", "Dashboards"],
    color: "bg-neoPurple",
  },
  {
    id: "12_SQL_Projects_ETL",
    title: "SQL ETL Pipeline Projects",
    filename: "12_SQL_Projects_ETL.pdf",
    fileType: "pdf",
    category: "Projects",
    chapter: "Ch. 12 ETL",
    size: "3.2 MB",
    description: "Building data pipelines with SQL: Staging tables, data cleaning, upsert operations, and dimensional modeling.",
    tags: ["ETL", "Data Pipelines", "Data Warehouse", "Dimensional Modeling"],
    color: "bg-neoRed",
  },
];

const CATEGORIES = [
  "All",
  "Data Model",
  "Fundamentals",
  "Queries",
  "DDL & DML",
  "Joins & Functions",
  "Analytics",
  "Advanced",
  "Optimization",
  "AI & SQL",
  "Projects",
];

function SqlNotesContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [previewNote, setPreviewNote] = useState<NoteItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Check URL query param for deep link preview, e.g. /notes/sql?pdf=01_SQL_Introduction.pdf
  useEffect(() => {
    const fileParam = searchParams.get("pdf") || searchParams.get("file");
    if (fileParam) {
      const matched = NOTES_DATA.find(
        (n) => n.filename === fileParam || n.id === fileParam
      );
      if (matched) {
        setPreviewNote(matched);
      }
    }
  }, [searchParams]);

  // Filter notes based on query and category
  const filteredNotes = useMemo(() => {
    return NOTES_DATA.filter((note) => {
      const matchesCategory =
        selectedCategory === "All" || note.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        note.title.toLowerCase().includes(q) ||
        note.description.toLowerCase().includes(q) ||
        note.chapter.toLowerCase().includes(q) ||
        note.tags.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  // Active list for navigation index
  const activeList = useMemo(() => {
    return filteredNotes.length > 0 ? filteredNotes : NOTES_DATA;
  }, [filteredNotes]);

  const currentIndex = useMemo(() => {
    if (!previewNote) return -1;
    return activeList.findIndex((n) => n.id === previewNote.id);
  }, [previewNote, activeList]);

  const openPreview = useCallback((note: NoteItem) => {
    setPreviewNote(note);
    if (typeof window !== "undefined") {
      window.history.replaceState(
        null,
        "",
        `/notes/sql?pdf=${encodeURIComponent(note.filename)}`
      );
    }
  }, []);

  const closePreview = useCallback(() => {
    setPreviewNote(null);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/notes/sql");
    }
  }, []);

  const navigateNext = useCallback(() => {
    if (activeList.length === 0 || currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % activeList.length;
    openPreview(activeList[nextIdx]);
  }, [activeList, currentIndex, openPreview]);

  const navigatePrev = useCallback(() => {
    if (activeList.length === 0 || currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + activeList.length) % activeList.length;
    openPreview(activeList[prevIdx]);
  }, [activeList, currentIndex, openPreview]);

  // Keyboard navigation support
  useEffect(() => {
    if (!previewNote) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closePreview();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewNote, navigateNext, navigatePrev, closePreview]);

  const handleCopyLink = (note: NoteItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = `${window.location.origin}/notes/sql?pdf=${encodeURIComponent(
      note.filename
    )}`;
    navigator.clipboard.writeText(url);
    setCopiedId(note.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-neoCream text-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white border-4 border-black p-6 md:p-8 shadow-neo rounded-xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-black text-white font-black text-xs uppercase px-3 py-1 rounded tracking-wider border border-black shadow-neo-sm">
                  🔒 UNLISTED DIRECT-LINK ROUTE
                </span>
                <span className="bg-neoYellow border-2 border-black font-black text-xs uppercase px-3 py-1 rounded shadow-neo-sm">
                  16 DOCUMENTS
                </span>
                <span className="bg-neoGreen border-2 border-black font-black text-xs uppercase px-3 py-1 rounded shadow-neo-sm">
                  ~125 MB PDF SUITE
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black flex items-center gap-3">
                <span>⚡ SQL Notes & Study Guides</span>
              </h1>
              <p className="text-base md:text-lg font-bold text-stone-700 max-w-3xl">
                Complete SQL Masterclass cheat sheets, query optimization guides, database data model diagrams, and hands-on analytics project documentation.
              </p>
            </div>

            <div className="bg-neoBlue border-4 border-black p-4 rounded-lg shadow-neo shrink-0 text-center md:text-right">
              <div className="text-xs font-black uppercase tracking-wider text-black">
                Public Folder Data Path
              </div>
              <div className="font-mono text-sm font-bold bg-white border-2 border-black px-3 py-1 mt-1 rounded shadow-neo-sm">
                /public/SQL-Notes-Data-with-Baraa/
              </div>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white border-4 border-black p-6 rounded-xl shadow-neo space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search SQL notes by topic, command (e.g. JOIN, CTE, INDEX), or chapter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border-4 border-black px-4 py-3 font-bold text-base bg-stone-50 rounded-lg shadow-neo-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-black placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-black border-2 border-black bg-neoRed text-xs px-2 py-1 rounded neo-clickable"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Results count pill */}
            <div className="bg-neoPink border-4 border-black px-4 py-3 rounded-lg shadow-neo-sm font-black text-sm uppercase text-center shrink-0">
              {filteredNotes.length} {filteredNotes.length === 1 ? "NOTE" : "NOTES"} FOUND
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-custom pb-2 pt-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`shrink-0 font-black text-xs uppercase px-3 py-1.5 rounded border-2 border-black shadow-neo-sm transition-all neo-clickable cursor-pointer ${
                    isActive
                      ? "bg-black text-white translate-x-[1px] translate-y-[1px] shadow-none"
                      : "bg-white text-black hover:bg-stone-100"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid of Note Cards */}
        {filteredNotes.length === 0 ? (
          <div className="bg-white border-4 border-black p-12 text-center rounded-xl shadow-neo space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="text-2xl font-black uppercase">No SQL Notes Found</h3>
            <p className="font-bold text-stone-600">
              No documents matched your search query &quot;{searchQuery}&quot;. Try resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="font-black uppercase border-4 border-black px-6 py-2 bg-neoYellow shadow-neo rounded neo-clickable"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => openPreview(note)}
                className="bg-white border-4 border-black rounded-xl p-5 shadow-neo hover:-translate-y-1 transition-all flex flex-col justify-between cursor-pointer group relative overflow-hidden"
              >
                {/* Header Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`${note.color} border-2 border-black font-black text-xs uppercase px-2.5 py-0.5 rounded shadow-neo-sm`}
                    >
                      {note.chapter}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black border-2 border-black px-2 py-0.5 bg-stone-100 rounded">
                        {note.size}
                      </span>
                      <span className="font-black text-xs uppercase border-2 border-black px-2 py-0.5 bg-black text-white rounded">
                        {note.fileType}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-black uppercase group-hover:underline tracking-tight text-black line-clamp-2">
                    {note.title}
                  </h3>
                  <p className="text-xs font-bold text-stone-600 leading-relaxed line-clamp-3">
                    {note.description}
                  </p>
                </div>

                {/* Footer Section: Tags & Actions */}
                <div className="mt-6 space-y-4">
                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-stone-100 border border-black font-bold text-[10px] uppercase px-2 py-0.5 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 border-t-2 border-black flex items-center justify-between gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPreview(note);
                      }}
                      className="flex-1 font-black text-xs uppercase border-2 border-black bg-neoYellow py-2 px-3 rounded shadow-neo-sm hover:bg-yellow-300 neo-clickable text-center"
                    >
                      📖 Preview Note
                    </button>
                    
                    <a
                      href={`/SQL-Notes-Data-with-Baraa/${note.filename}`}
                      download={note.filename}
                      onClick={(e) => e.stopPropagation()}
                      className="font-black text-xs uppercase border-2 border-black bg-neoGreen py-2 px-3 rounded shadow-neo-sm hover:bg-green-300 neo-clickable"
                      title="Download File"
                    >
                      ⬇️ PDF
                    </a>

                    <button
                      onClick={(e) => handleCopyLink(note, e)}
                      className={`font-black text-xs uppercase border-2 border-black py-2 px-3 rounded shadow-neo-sm neo-clickable ${
                        copiedId === note.id ? "bg-black text-white" : "bg-neoBlue hover:bg-sky-300"
                      }`}
                      title="Copy Direct URL Link"
                    >
                      {copiedId === note.id ? "Copied!" : "🔗 Link"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Interactive Modal PDF/PNG Viewer with High-Performance Rendering */}
      {previewNote && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 lg:p-6 animate-fadeIn">
          <div className="bg-neoCream border-4 border-black w-full max-w-6xl h-[94vh] rounded-xl shadow-neo-lg flex flex-col overflow-hidden relative transform-gpu">
            
            {/* Modal Header */}
            <div className="bg-white border-b-4 border-black p-3 sm:p-4 flex items-center justify-between gap-3 shrink-0 flex-wrap">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                <span
                  className={`${previewNote.color} border-2 border-black font-black text-xs uppercase px-2.5 py-1 rounded shadow-neo-sm shrink-0`}
                >
                  {previewNote.chapter}
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-lg font-black uppercase text-black truncate">
                    {previewNote.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs font-bold text-stone-500 truncate">
                    Note {currentIndex + 1} of {activeList.length} • {previewNote.filename} ({previewNote.size})
                  </p>
                </div>
              </div>

              {/* Header Navigation & Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Previous Note Button */}
                <button
                  onClick={navigatePrev}
                  className="font-black text-xs uppercase border-2 border-black bg-neoYellow px-2.5 sm:px-3 py-1.5 rounded shadow-neo-sm hover:bg-yellow-300 neo-clickable flex items-center gap-1"
                  title="Previous Note (Left Arrow Key)"
                >
                  <span className="text-base leading-none">←</span>
                  <span className="hidden md:inline">PREV</span>
                </button>

                {/* Next Note Button */}
                <button
                  onClick={navigateNext}
                  className="font-black text-xs uppercase border-2 border-black bg-neoYellow px-2.5 sm:px-3 py-1.5 rounded shadow-neo-sm hover:bg-yellow-300 neo-clickable flex items-center gap-1"
                  title="Next Note (Right Arrow Key)"
                >
                  <span className="hidden md:inline">NEXT</span>
                  <span className="text-base leading-none">→</span>
                </button>

                <a
                  href={`/SQL-Notes-Data-with-Baraa/${previewNote.filename}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden lg:inline-block font-black text-xs uppercase border-2 border-black bg-neoBlue px-3 py-1.5 rounded shadow-neo-sm hover:bg-sky-300 neo-clickable"
                >
                  ↗️ Open Native
                </a>

                <a
                  href={`/SQL-Notes-Data-with-Baraa/${previewNote.filename}`}
                  download={previewNote.filename}
                  className="hidden sm:inline-block font-black text-xs uppercase border-2 border-black bg-neoGreen px-3 py-1.5 rounded shadow-neo-sm hover:bg-green-300 neo-clickable"
                >
                  ⬇️ PDF
                </a>

                <button
                  onClick={closePreview}
                  className="font-black text-xs uppercase border-2 border-black bg-neoRed px-3 py-1.5 rounded shadow-neo-sm hover:bg-red-400 neo-clickable cursor-pointer text-black"
                  title="Close Preview (ESC Key)"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content Body */}
            <div className="flex-1 bg-stone-900 overflow-hidden relative flex items-center justify-center">
              
              {/* Pointer-events-none Overlay for Side Navigation Arrows */}
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-between p-3 sm:p-5">
                {/* Left Side Floating Arrow Button */}
                <button
                  onClick={navigatePrev}
                  className="pointer-events-auto bg-neoYellow border-4 border-black p-3 sm:p-4 rounded-full shadow-neo text-black font-black text-xl sm:text-2xl hover:scale-110 active:scale-95 transition-all opacity-85 hover:opacity-100 neo-clickable cursor-pointer"
                  title="Previous Document (← Left Arrow)"
                >
                  ◀
                </button>

                {/* Right Side Floating Arrow Button */}
                <button
                  onClick={navigateNext}
                  className="pointer-events-auto bg-neoYellow border-4 border-black p-3 sm:p-4 rounded-full shadow-neo text-black font-black text-xl sm:text-2xl hover:scale-110 active:scale-95 transition-all opacity-85 hover:opacity-100 neo-clickable cursor-pointer"
                  title="Next Document (→ Right Arrow)"
                >
                  ▶
                </button>
              </div>

              {/* Hardware-Accelerated Viewer Element */}
              {previewNote.fileType === "png" ? (
                <div className="w-full h-full overflow-auto p-4 flex items-center justify-center">
                  <img
                    src={`/SQL-Notes-Data-with-Baraa/${previewNote.filename}`}
                    alt={previewNote.title}
                    className="max-w-full max-h-full object-contain border-4 border-black shadow-neo rounded"
                  />
                </div>
              ) : (
                <iframe
                  key={previewNote.filename}
                  src={`/SQL-Notes-Data-with-Baraa/${previewNote.filename}#toolbar=1&view=FitH`}
                  className="w-full h-full border-none transform-gpu"
                  style={{ willChange: "transform" }}
                  title={previewNote.title}
                />
              )}
            </div>

            {/* Modal Quick Bottom Nav Strip */}
            <div className="bg-stone-100 border-t-4 border-black px-4 py-2 flex items-center justify-between gap-4 text-xs font-bold text-stone-700 shrink-0">
              <div className="truncate">
                <span className="font-black uppercase">Tips:</span> Click <span className="font-black">◀ ▶</span> arrows or use <kbd className="bg-white border border-black px-1.5 py-0.5 rounded font-mono text-[10px]">← Left</kbd> / <kbd className="bg-white border border-black px-1.5 py-0.5 rounded font-mono text-[10px]">Right →</kbd> keyboard keys to navigate between notes. If browser iframe scrolling lags on large files, click <span className="font-black">↗️ Open Native</span>.
              </div>
              <div className="shrink-0 font-black uppercase bg-neoYellow border border-black px-2 py-0.5 rounded">
                Note {currentIndex + 1} / {activeList.length}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default function SqlNotesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-neoCream">
          <div className="bg-neoYellow border-4 border-black p-6 font-black uppercase shadow-neo text-lg">
            LOADING SQL NOTES GALLERY...
          </div>
        </div>
      }
    >
      <SqlNotesContent />
    </Suspense>
  );
}
