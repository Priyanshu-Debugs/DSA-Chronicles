"use client";

import React, { useState, useEffect, useRef } from "react";

interface Block {
  id: string;
  x: number;
  y: number;
  type: "text" | "box" | "pointer" | "array" | "linked_list" | "hashmap" | "tree";
  color: string;
  
  // Simple block properties
  text?: string;
  arrowDir?: "up" | "down" | "left" | "right";

  // Compound block properties
  label?: string; // Optional variable name label
  arrayValues?: string[];
  listValues?: string[];
  mapEntries?: Array<{ key: string; val: string }>;
  treeValues?: { root: string; left: string; right: string };
}

interface EditingCell {
  blockId: string;
  index?: number;
  field?: "key" | "val" | "root" | "left" | "right";
}

const COLORS = [
  { name: "White", value: "bg-white text-black border-black" },
  { name: "Cream", value: "bg-neoCream text-black border-black" },
  { name: "Yellow", value: "bg-neoYellow text-black border-black" },
  { name: "Green", value: "bg-neoGreen text-black border-black" },
  { name: "Blue", value: "bg-neoBlue text-black border-black" },
  { name: "Pink", value: "bg-neoPink text-black border-black" },
  { name: "Purple", value: "bg-neoPurple text-black border-black" },
  { name: "Red", value: "bg-neoRed text-black border-black" },
  { name: "Black", value: "bg-black text-white border-black" },
];

export default function PracticeArena() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  
  // Editing state
  const [editingBlockId, setEditingBlockId] = useState<string | null>(null); // For simple text/box/pointer
  const [editingCell, setEditingCell] = useState<EditingCell | null>(null); // For compound fields
  
  // Dragging states
  const [isDragging, setIsDragging] = useState(false);
  const [draggedBlockId, setDraggedBlockId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  
  // Workspace configurations
  const [snapToGrid, setSnapToGrid] = useState(true);
  const [showNotes, setShowNotes] = useState(true);
  const [notepadText, setNotepadText] = useState<string>(
    "// Lined Notes & Pseudocode Scratchpad\n// Write your algorithm steps here...\n\nfunction solve(nums) {\n    // Double-click on the whiteboard to place a block!\n    // Drag pointers (i, j) on top of the arrays/lists!\n    \n}"
  );

  // Template builders size state
  const [arraySize, setArraySize] = useState(5);
  const [listSize, setListSize] = useState(3);
  const [mapKeyCount, setMapKeyCount] = useState(3);

  // Array swap index state
  const [swapIdxA, setSwapIdxA] = useState("");
  const [swapIdxB, setSwapIdxB] = useState("");

  // Undo/Redo stacks
  const [history, setHistory] = useState<Block[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Load from local storage
  useEffect(() => {
    const savedBlocks = localStorage.getItem("dsa_practice_blocks_grouped");
    const savedNotes = localStorage.getItem("dsa_practice_notes");
    
    if (savedBlocks) {
      try {
        const parsed = JSON.parse(savedBlocks);
        setBlocks(parsed);
        setHistory([parsed]);
        setHistoryIndex(0);
      } catch (e) {
        console.error("Error parsing saved practice blocks:", e);
      }
    } else {
      // Default welcome layout
      const initial: Block[] = [
        {
          id: "init-array",
          x: 120,
          y: 160,
          type: "array",
          color: "bg-white text-black border-black",
          label: "arr",
          arrayValues: ["D", "S", "A"],
        },
        {
          id: "init-ptr-head",
          x: 200,
          y: 60,
          text: "head",
          type: "pointer",
          color: "bg-black text-white border-black",
          arrowDir: "down",
        },
        {
          id: "init-ptr-tail",
          x: 290,
          y: 60,
          text: "tail",
          type: "pointer",
          color: "bg-neoRed text-black border-black",
          arrowDir: "down",
        },
      ];
      setBlocks(initial);
      setHistory([initial]);
      setHistoryIndex(0);
    }

    if (savedNotes) {
      setNotepadText(savedNotes);
    }
  }, []);

  // Save blocks state changes
  const saveState = (newBlocks: Block[]) => {
    setBlocks(newBlocks);
    localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(newBlocks));

    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(newBlocks);
    if (updatedHistory.length > 50) {
      updatedHistory.shift();
    }
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // Notes persistence
  useEffect(() => {
    localStorage.setItem("dsa_practice_notes", notepadText);
  }, [notepadText]);

  // Keyboard listeners (Delete block, Escape edit, Arrow nudging)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedBlockId) return;

      const activeEl = document.activeElement;
      const isTyping =
        activeEl &&
        (activeEl.tagName === "INPUT" ||
          activeEl.tagName === "TEXTAREA" ||
          activeEl.getAttribute("contenteditable") === "true");
      if (isTyping) return;

      // Delete block
      if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        deleteBlock(selectedBlockId);
      }

      // Nudging blocks
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const nudgeAmt = e.shiftKey ? 40 : 20;
        let dx = 0;
        let dy = 0;

        if (e.key === "ArrowUp") dy = -nudgeAmt;
        if (e.key === "ArrowDown") dy = nudgeAmt;
        if (e.key === "ArrowLeft") dx = -nudgeAmt;
        if (e.key === "ArrowRight") dx = nudgeAmt;

        const updated = blocks.map((b) => {
          if (b.id === selectedBlockId) {
            return {
              ...b,
              x: Math.max(0, Math.min(2350, b.x + dx)),
              y: Math.max(0, Math.min(1350, b.y + dy)),
            };
          }
          return b;
        });
        saveState(updated);
      }

      if (e.key === "Escape") {
        setSelectedBlockId(null);
        setEditingBlockId(null);
        setEditingCell(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedBlockId, blocks, historyIndex, history]);

  // Add float block
  const addNewBlock = (x: number, y: number, type: "box" | "text" | "pointer") => {
    const newBlock: Block = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      x,
      y,
      text: type === "box" ? "0" : type === "pointer" ? "ptr" : "label",
      type,
      color: type === "pointer" ? "bg-black text-white border-black" : "bg-white text-black border-black",
      arrowDir: type === "pointer" ? "down" : undefined,
    };
    saveState([...blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
    setEditingBlockId(newBlock.id);
  };

  // Delete block
  const deleteBlock = (id: string) => {
    const nextBlocks = blocks.filter((b) => b.id !== id);
    saveState(nextBlocks);
    if (selectedBlockId === id) setSelectedBlockId(null);
    if (editingBlockId === id) setEditingBlockId(null);
    if (editingCell?.blockId === id) setEditingCell(null);
  };

  // Selected updates helper
  const updateSelectedBlock = (updates: Partial<Block>) => {
    if (!selectedBlockId) return;
    const nextBlocks = blocks.map((b) => {
      if (b.id === selectedBlockId) {
        return { ...b, ...updates };
      }
      return b;
    });
    saveState(nextBlocks);
  };

  // Single properties modifier
  const modifyBlock = (blockId: string, updateFn: (block: Block) => Block) => {
    const nextBlocks = blocks.map((b) => (b.id === blockId ? updateFn(b) : b));
    saveState(nextBlocks);
  };

  // Text changes
  const updateBlockText = (id: string, text: string) => {
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, text } : b)));
  };

  const finishEditing = () => {
    setEditingBlockId(null);
    localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(blocks));

    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(blocks);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // Sub-cell value updates
  const updateArrayValue = (blockId: string, idx: number, val: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId && b.arrayValues) {
          const arr = [...b.arrayValues];
          arr[idx] = val;
          return { ...b, arrayValues: arr };
        }
        return b;
      })
    );
  };

  const updateListValue = (blockId: string, idx: number, val: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId && b.listValues) {
          const list = [...b.listValues];
          list[idx] = val;
          return { ...b, listValues: list };
        }
        return b;
      })
    );
  };

  const updateMapEntry = (blockId: string, idx: number, field: "key" | "val", val: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId && b.mapEntries) {
          const map = [...b.mapEntries];
          map[idx] = { ...map[idx], [field]: val };
          return { ...b, mapEntries: map };
        }
        return b;
      })
    );
  };

  const updateTreeValue = (blockId: string, field: "root" | "left" | "right", val: string) => {
    setBlocks((prev) =>
      prev.map((b) => {
        if (b.id === blockId && b.treeValues) {
          return { ...b, treeValues: { ...b.treeValues, [field]: val } };
        }
        return b;
      })
    );
  };

  const finishCellEditing = () => {
    setEditingCell(null);
    localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(blocks));

    const updatedHistory = history.slice(0, historyIndex + 1);
    updatedHistory.push(blocks);
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // Double click empty space to place Node Box
  const handleWhiteboardDoubleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const snapX = snapToGrid ? Math.round(x / 20) * 20 : x;
    const snapY = snapToGrid ? Math.round(y / 20) * 20 : y;

    addNewBlock(snapX, snapY, "box");
  };

  // Drag handers
  const handleBlockMouseDown = (e: React.MouseEvent, blockId: string) => {
    if (editingBlockId === blockId) return;
    if (editingCell && editingCell.blockId === blockId) return;
    
    // Check if the click target is an input field
    if ((e.target as HTMLElement).tagName === "INPUT") return;

    if (e.button !== 0) return; // Only left click

    e.preventDefault();
    setSelectedBlockId(blockId);

    const block = blocks.find((b) => b.id === blockId);
    if (!block) return;

    setIsDragging(true);
    setDraggedBlockId(blockId);
    setDragStartPos({ x: block.x, y: block.y });

    const whiteboard = e.currentTarget.closest(".whiteboard-surface");
    if (whiteboard) {
      const rect = whiteboard.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      setDragOffset({
        x: mouseX - block.x,
        y: mouseY - block.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !draggedBlockId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let newX = mouseX - dragOffset.x;
    let newY = mouseY - dragOffset.y;

    if (snapToGrid) {
      newX = Math.round(newX / 20) * 20;
      newY = Math.round(newY / 20) * 20;
    }

    newX = Math.max(0, Math.min(2350, newX));
    newY = Math.max(0, Math.min(1350, newY));

    setBlocks((prev) =>
      prev.map((b) => (b.id === draggedBlockId ? { ...b, x: newX, y: newY } : b))
    );
  };

  const handleMouseUp = () => {
    if (isDragging && draggedBlockId) {
      const block = blocks.find((b) => b.id === draggedBlockId);
      if (
        block &&
        dragStartPos &&
        (block.x !== dragStartPos.x || block.y !== dragStartPos.y)
      ) {
        localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(blocks));
        const updatedHistory = history.slice(0, historyIndex + 1);
        updatedHistory.push(blocks);
        setHistory(updatedHistory);
        setHistoryIndex(updatedHistory.length - 1);
      }
      setIsDragging(false);
      setDraggedBlockId(null);
      setDragStartPos(null);
    }
  };

  // Undo / Redo
  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const nextIndex = historyIndex - 1;
    const prevState = history[nextIndex];
    setBlocks(prevState);
    localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(prevState));
    setHistoryIndex(nextIndex);
    setSelectedBlockId(null);
    setEditingBlockId(null);
    setEditingCell(null);
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const nextIndex = historyIndex + 1;
    const nextState = history[nextIndex];
    setBlocks(nextState);
    localStorage.setItem("dsa_practice_blocks_grouped", JSON.stringify(nextState));
    setHistoryIndex(nextIndex);
    setSelectedBlockId(null);
    setEditingBlockId(null);
    setEditingCell(null);
  };

  const clearWorkspace = () => {
    if (window.confirm("Are you sure you want to clear the entire whiteboard?")) {
      saveState([]);
      setSelectedBlockId(null);
      setEditingBlockId(null);
      setEditingCell(null);
    }
  };

  // --- Templates Spawning ---
  const spawnArray = () => {
    if (arraySize <= 0 || arraySize > 25) return;
    const startX = 160;
    const startY = 160;
    const offset = (blocks.length * 15) % 200;

    const newBlock: Block = {
      id: `arr_${Date.now()}`,
      x: startX + offset,
      y: startY + offset,
      type: "array",
      color: "bg-white text-black border-black",
      label: "arr",
      arrayValues: Array.from({ length: arraySize }, (_, idx) => (idx + 1).toString()),
    };
    saveState([...blocks, newBlock]);
  };

  const spawnLinkedList = () => {
    if (listSize <= 0 || listSize > 15) return;
    const startX = 160;
    const startY = 160;
    const offset = (blocks.length * 15) % 200;

    const newBlock: Block = {
      id: `ll_${Date.now()}`,
      x: startX + offset,
      y: startY + offset,
      type: "linked_list",
      color: "bg-white text-black border-black",
      listValues: ["10", "20", "30", "40", "50"].slice(0, listSize),
    };
    saveState([...blocks, newBlock]);
  };

  const spawnHashMap = () => {
    if (mapKeyCount <= 0 || mapKeyCount > 10) return;
    const startX = 160;
    const startY = 160;
    const offset = (blocks.length * 15) % 200;

    const entries = Array.from({ length: mapKeyCount }, (_, i) => ({
      key: `key${i}`,
      val: (Math.floor(Math.random() * 90) + 10).toString(),
    }));

    const newBlock: Block = {
      id: `hm_${Date.now()}`,
      x: startX + offset,
      y: startY + offset,
      type: "hashmap",
      color: "bg-white text-black border-black",
      label: "map",
      mapEntries: entries,
    };
    saveState([...blocks, newBlock]);
  };

  const spawnBinaryTree = () => {
    const startX = 160;
    const startY = 160;
    const offset = (blocks.length * 15) % 200;

    const newBlock: Block = {
      id: `tree_${Date.now()}`,
      x: startX + offset,
      y: startY + offset,
      type: "tree",
      color: "bg-neoYellow text-black border-black",
      treeValues: { root: "5", left: "3", right: "8" },
    };
    saveState([...blocks, newBlock]);
  };

  // Selected shape swap execution
  const executeSwap = () => {
    if (!selectedBlockId) return;
    const idxA = parseInt(swapIdxA);
    const idxB = parseInt(swapIdxB);

    const block = blocks.find((b) => b.id === selectedBlockId);
    if (!block || !block.arrayValues) return;

    if (
      isNaN(idxA) ||
      isNaN(idxB) ||
      idxA < 0 ||
      idxB < 0 ||
      idxA >= block.arrayValues.length ||
      idxB >= block.arrayValues.length
    ) {
      alert("Invalid indexes for swap!");
      return;
    }

    modifyBlock(selectedBlockId, (b) => {
      if (b.arrayValues) {
        const arr = [...b.arrayValues];
        const temp = arr[idxA];
        arr[idxA] = arr[idxB];
        arr[idxB] = temp;
        return { ...b, arrayValues: arr };
      }
      return b;
    });

    setSwapIdxA("");
    setSwapIdxB("");
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="flex flex-col bg-white border-4 border-black p-5 shadow-neo rounded-xl space-y-4 w-full min-h-[720px] max-w-full overflow-hidden">
      
      {/* Top Header Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b-4 border-black pb-4 gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-2">
            <i className="ti ti-layout-grid text-neoYellow"></i>
            Practice Arena
          </h2>
          <p className="text-xs font-bold text-gray-500 uppercase mt-0.5">
            Double-click the whiteboard grid to add blocks, or spawn cohesive structures that drag together
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 bg-neoCream border-2 border-black p-2 rounded-lg shadow-neo-sm">
          {/* Snap Grid */}
          <button
            onClick={() => setSnapToGrid(!snapToGrid)}
            className={`px-2.5 py-1.5 border-2 border-black rounded font-black text-xs uppercase cursor-pointer neo-clickable flex items-center gap-1.5 ${
              snapToGrid ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <i className="ti ti-magnet"></i>
            Snap {snapToGrid ? "ON" : "OFF"}
          </button>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1 border-r border-l border-black px-3">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="px-2.5 py-1.5 border-2 border-black bg-white rounded font-black text-xs uppercase shadow-neo-sm hover:bg-gray-100 disabled:opacity-40 cursor-pointer neo-clickable flex items-center gap-1"
            >
              <i className="ti ti-arrow-back-up"></i>
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="px-2.5 py-1.5 border-2 border-black bg-white rounded font-black text-xs uppercase shadow-neo-sm hover:bg-gray-100 disabled:opacity-40 cursor-pointer neo-clickable flex items-center gap-1"
            >
              Redo
            </button>
          </div>

          {/* Reset */}
          <button
            onClick={clearWorkspace}
            className="px-2.5 py-1.5 border-2 border-black bg-neoRed text-black rounded font-black text-xs uppercase shadow-neo-sm hover:bg-red-400 cursor-pointer neo-clickable flex items-center gap-1"
          >
            <i className="ti ti-refresh"></i>
            Reset
          </button>

          {/* Notes Toggle */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className="px-3 py-1.5 border-2 border-black bg-neoBlue text-black rounded font-black text-xs uppercase shadow-neo-sm hover:bg-sky-400 cursor-pointer neo-clickable shrink-0 flex items-center gap-1"
          >
            <i className="ti ti-book"></i>
            {showNotes ? "Hide Notes" : "Show Notes"}
          </button>
        </div>
      </div>

      {/* Main Workspace split */}
      <div className="flex flex-col lg:flex-row items-stretch gap-6 flex-grow min-h-[580px]">
        {/* Left column: Sidebar Spawner / Configurator */}
        <div className="w-full lg:w-72 flex flex-col border-4 border-black rounded-xl p-4 bg-neoCream shrink-0 space-y-6 shadow-neo overflow-y-auto max-h-[620px] scrollbar-none">
          
          {/* Section 1: Float Spawn */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-1 mb-3">
              ➕ Free Annotations
            </h3>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => addNewBlock(200, 200, "pointer")}
                className="w-full py-2 border-2 border-black bg-white hover:bg-gray-50 text-black font-black text-xs uppercase text-left pl-3 rounded shadow-neo-sm flex items-center gap-2"
              >
                <i className="ti ti-pointer font-black text-neoBlue"></i>
                Pointer Tag (i, j, head)
              </button>
              <button
                onClick={() => addNewBlock(200, 200, "text")}
                className="w-full py-2 border-2 border-black bg-white hover:bg-gray-50 text-black font-black text-xs uppercase text-left pl-3 rounded shadow-neo-sm flex items-center gap-2"
              >
                <i className="ti ti-typography font-black text-neoPink"></i>
                Text Label (index, note)
              </button>
              <button
                onClick={() => addNewBlock(200, 200, "box")}
                className="w-full py-2 border-2 border-black bg-white hover:bg-gray-50 text-black font-black text-xs uppercase text-left pl-3 rounded shadow-neo-sm flex items-center gap-2"
              >
                <i className="ti ti-square font-black text-neoYellow"></i>
                Detached Box
              </button>
            </div>
          </div>

          {/* Section 2: Unified Data Structure Templates */}
          <div>
            <h3 className="font-black text-sm uppercase tracking-wide border-b-2 border-black pb-1 mb-3">
              📦 Group Structures
            </h3>
            <div className="space-y-4">
              {/* Array */}
              <div className="bg-white border-2 border-black p-2 rounded shadow-neo-sm">
                <span className="text-xs font-black uppercase text-gray-500 block mb-1">
                  Cohesive Array
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Size:</span>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={arraySize}
                    onChange={(e) => setArraySize(parseInt(e.target.value) || 5)}
                    className="w-12 border border-black text-center font-bold text-xs p-1 focus:outline-none"
                  />
                  <button
                    onClick={spawnArray}
                    className="flex-grow py-1 bg-neoYellow border border-black rounded text-[10px] font-black uppercase text-center cursor-pointer hover:bg-yellow-400"
                  >
                    Spawn
                  </button>
                </div>
              </div>

              {/* Linked List */}
              <div className="bg-white border-2 border-black p-2 rounded shadow-neo-sm">
                <span className="text-xs font-black uppercase text-gray-500 block mb-1">
                  Linked List Chain
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Nodes:</span>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={listSize}
                    onChange={(e) => setListSize(parseInt(e.target.value) || 3)}
                    className="w-12 border border-black text-center font-bold text-xs p-1 focus:outline-none"
                  />
                  <button
                    onClick={spawnLinkedList}
                    className="flex-grow py-1 bg-neoBlue border border-black rounded text-[10px] font-black uppercase text-center cursor-pointer hover:bg-sky-400"
                  >
                    Spawn
                  </button>
                </div>
              </div>

              {/* HashMap */}
              <div className="bg-white border-2 border-black p-2 rounded shadow-neo-sm">
                <span className="text-xs font-black uppercase text-gray-500 block mb-1">
                  HashMap Table
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold">Buckets:</span>
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={mapKeyCount}
                    onChange={(e) => setMapKeyCount(parseInt(e.target.value) || 3)}
                    className="w-12 border border-black text-center font-bold text-xs p-1 focus:outline-none"
                  />
                  <button
                    onClick={spawnHashMap}
                    className="flex-grow py-1 bg-neoPink border border-black rounded text-[10px] font-black uppercase text-center cursor-pointer hover:bg-pink-400"
                  >
                    Spawn
                  </button>
                </div>
              </div>

              {/* BST Subtree */}
              <button
                onClick={spawnBinaryTree}
                className="w-full py-1.5 bg-neoGreen border-2 border-black rounded text-xs font-black uppercase text-center cursor-pointer hover:bg-green-400 shadow-neo-sm flex items-center justify-center gap-1.5 animate-pulse"
              >
                🌲 Spawn BST Subtree
              </button>
            </div>
          </div>

          {/* Section 3: Selected block properties customizer */}
          {selectedBlock ? (
            <div className="bg-white border-4 border-black p-3 rounded-lg shadow-neo-sm space-y-3 shrink-0">
              <h3 className="font-black text-xs uppercase text-gray-700 border-b border-black pb-1 flex items-center justify-between">
                <span>🛠️ Selection Settings</span>
                <button
                  onClick={() => deleteBlock(selectedBlock.id)}
                  className="text-red-500 hover:text-red-700 font-black text-xs cursor-pointer px-1"
                  title="Delete structure (or press Delete)"
                >
                  <i className="ti ti-trash"></i>
                </button>
              </h3>

              {/* Editable Name/Label for Array/Map */}
              {(selectedBlock.type === "array" || selectedBlock.type === "hashmap") && (
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-0.5">
                    Structure Name
                  </span>
                  <input
                    type="text"
                    value={selectedBlock.label || ""}
                    onChange={(e) => updateSelectedBlock({ label: e.target.value })}
                    className="w-full border border-black px-2 py-1 text-xs font-bold bg-white focus:outline-none"
                    placeholder="e.g. nums"
                  />
                </div>
              )}

              {/* Float block text editing */}
              {(selectedBlock.type === "box" || selectedBlock.type === "text" || selectedBlock.type === "pointer") && (
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-0.5">
                    Label Value
                  </span>
                  <input
                    type="text"
                    value={selectedBlock.text || ""}
                    onChange={(e) => updateSelectedBlock({ text: e.target.value })}
                    className="w-full border border-black px-2 py-1 text-xs font-bold bg-white focus:outline-none"
                  />
                </div>
              )}

              {/* Array controls */}
              {selectedBlock.type === "array" && selectedBlock.arrayValues && (
                <div className="space-y-2.5 border-t border-gray-200 pt-2.5">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">
                    Array Actions
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => ({
                          ...b,
                          arrayValues: [...(b.arrayValues || []), "0"],
                        }))
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➕ Add Cell
                    </button>
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => {
                          if (b.arrayValues && b.arrayValues.length > 1) {
                            return { ...b, arrayValues: b.arrayValues.slice(0, -1) };
                          }
                          return b;
                        })
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➖ Remove
                    </button>
                  </div>

                  {/* Swap cells */}
                  <div className="border border-gray-300 p-1.5 rounded space-y-1">
                    <span className="text-[9px] font-black uppercase text-gray-400 block">
                      Swap Indices
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        placeholder="Idx 1"
                        value={swapIdxA}
                        onChange={(e) => setSwapIdxA(e.target.value)}
                        className="w-12 border border-black text-center text-xs p-1 focus:outline-none"
                      />
                      <span className="text-xs font-black">↔️</span>
                      <input
                        type="number"
                        placeholder="Idx 2"
                        value={swapIdxB}
                        onChange={(e) => setSwapIdxB(e.target.value)}
                        className="w-12 border border-black text-center text-xs p-1 focus:outline-none"
                      />
                      <button
                        onClick={executeSwap}
                        className="flex-grow py-1 bg-neoYellow border border-black rounded text-[9px] font-black uppercase cursor-pointer"
                      >
                        Swap
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Linked List node actions */}
              {selectedBlock.type === "linked_list" && selectedBlock.listValues && (
                <div className="space-y-1.5 border-t border-gray-200 pt-2.5">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">
                    Node Actions
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => ({
                          ...b,
                          listValues: [...(b.listValues || []), "val"],
                        }))
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➕ Add Node
                    </button>
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => {
                          if (b.listValues && b.listValues.length > 1) {
                            return { ...b, listValues: b.listValues.slice(0, -1) };
                          }
                          return b;
                        })
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➖ Remove
                    </button>
                  </div>
                </div>
              )}

              {/* HashMap Row actions */}
              {selectedBlock.type === "hashmap" && selectedBlock.mapEntries && (
                <div className="space-y-1.5 border-t border-gray-200 pt-2.5">
                  <span className="text-[10px] font-black uppercase text-gray-500 block">
                    Bucket Actions
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => {
                          const len = b.mapEntries?.length || 0;
                          return {
                            ...b,
                            mapEntries: [
                              ...(b.mapEntries || []),
                              { key: `key${len}`, val: "0" },
                            ],
                          };
                        })
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➕ Add Row
                    </button>
                    <button
                      onClick={() =>
                        modifyBlock(selectedBlock.id, (b) => {
                          if (b.mapEntries && b.mapEntries.length > 1) {
                            return { ...b, mapEntries: b.mapEntries.slice(0, -1) };
                          }
                          return b;
                        })
                      }
                      className="flex-grow py-1 border border-black bg-gray-100 hover:bg-gray-200 text-[9px] font-black uppercase rounded cursor-pointer text-center"
                    >
                      ➖ Remove
                    </button>
                  </div>
                </div>
              )}

              {/* Direction selector for Pointer */}
              {selectedBlock.type === "pointer" && (
                <div>
                  <span className="text-[10px] font-black uppercase text-gray-500 block mb-0.5">
                    Direction
                  </span>
                  <div className="grid grid-cols-4 gap-0.5 border border-black rounded overflow-hidden">
                    {(["up", "down", "left", "right"] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => updateSelectedBlock({ arrowDir: dir })}
                        className={`py-1 text-[10px] font-black uppercase ${
                          selectedBlock.arrowDir === dir ? "bg-black text-white" : "bg-white hover:bg-gray-100"
                        }`}
                      >
                        {dir === "up" ? "⬆️" : dir === "down" ? "⬇️" : dir === "left" ? "⬅️" : "➡️"}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Picker palette */}
              <div>
                <span className="text-[10px] font-black uppercase text-gray-500 block mb-1">
                  Color Theme
                </span>
                <div className="grid grid-cols-5 gap-1">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      onClick={() => updateSelectedBlock({ color: c.value })}
                      className={`h-5 w-full border border-black rounded cursor-pointer ${
                        c.value.split(" ")[0]
                      } ${selectedBlock.color === c.value ? "ring-2 ring-yellow-400 scale-105" : ""}`}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 border border-dashed border-gray-400 rounded-lg text-xs font-black text-gray-500 uppercase">
              No block selected.<br />Click a block to edit properties.
            </div>
          )}
        </div>

        {/* Center: Infinite Whiteboard Drag-and-Drop Workspace */}
        <div className="flex-grow flex flex-col border-4 border-black rounded-xl overflow-hidden shadow-neo bg-white relative h-[620px]">
          <div className="w-full h-full overflow-auto relative scrollbar-custom">
            
            {/* Whiteboard grid drawing surface */}
            <div
              className="whiteboard-surface relative bg-white"
              style={{
                width: "2400px",
                height: "1400px",
                backgroundImage:
                  "linear-gradient(to right, #f3f4f6 1px, transparent 1px), linear-gradient(to bottom, #f3f4f6 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
              onDoubleClick={handleWhiteboardDoubleClick}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              {blocks.length === 0 && (
                <div className="absolute top-12 left-12 max-w-sm pointer-events-none bg-yellow-50 border-2 border-dashed border-yellow-300 p-4 rounded">
                  <span className="font-bold text-xs text-yellow-800 uppercase block mb-1">💡 Whiteboard Workspace</span>
                  <p className="text-[11px] text-yellow-700 leading-relaxed">
                    Double-click anywhere on the grid to create a Node Box. Select it to customize colors or convert to pointers. You can drag them around freely!
                  </p>
                </div>
              )}

              {/* Blocks render loop */}
              {blocks.map((block) => {
                const isSelected = selectedBlockId === block.id;

                return (
                  <div
                    key={block.id}
                    style={{
                      position: "absolute",
                      left: `${block.x}px`,
                      top: `${block.y}px`,
                      zIndex: isSelected ? 50 : 10,
                    }}
                    className={`select-none ${
                      isSelected
                        ? "outline-4 outline-dashed outline-black outline-offset-4"
                        : ""
                    }`}
                    onMouseDown={(e) => handleBlockMouseDown(e, block.id)}
                  >
                    
                    {/* 1. SIMPLE BOX */}
                    {block.type === "box" && (
                      <div
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditingBlockId(block.id);
                        }}
                        className={`min-w-[48px] h-12 px-3 flex items-center justify-center border-4 border-black shadow-neo-sm font-black text-lg cursor-grab active:cursor-grabbing hover:shadow-neo transition-all rounded-lg ${block.color}`}
                      >
                        {editingBlockId === block.id ? (
                          <input
                            autoFocus
                            type="text"
                            value={block.text || ""}
                            onChange={(e) => updateBlockText(block.id, e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") finishEditing();
                              if (e.key === "Escape") finishEditing();
                            }}
                            className="bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none w-10 text-inherit"
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        ) : (
                          <span>{block.text || "\u00A0"}</span>
                        )}
                      </div>
                    )}

                    {/* 2. POINTER TAG */}
                    {block.type === "pointer" && (
                      <div
                        className={`flex cursor-grab active:cursor-grabbing ${
                          block.arrowDir === "up"
                            ? "flex-col items-center"
                            : block.arrowDir === "down"
                            ? "flex-col items-center"
                            : block.arrowDir === "left"
                            ? "flex-row items-center"
                            : "flex-row items-center"
                        }`}
                      >
                        {block.arrowDir === "up" && (
                          <>
                            <svg className="w-4 h-4 stroke-[3.5] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                            <div
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setEditingBlockId(block.id);
                              }}
                              className={`px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-neo-sm -mt-0.5 cursor-pointer ${block.color}`}
                            >
                              {editingBlockId === block.id ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={block.text || ""}
                                  onChange={(e) => updateBlockText(block.id, e.target.value)}
                                  onBlur={finishEditing}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") finishEditing();
                                    if (e.key === "Escape") finishEditing();
                                  }}
                                  className="bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none w-8 text-inherit"
                                  onFocus={(e) => e.currentTarget.select()}
                                />
                              ) : (
                                <span>{block.text || "ptr"}</span>
                              )}
                            </div>
                          </>
                        )}

                        {block.arrowDir === "down" && (
                          <>
                            <div
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setEditingBlockId(block.id);
                              }}
                              className={`px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-neo-sm -mb-0.5 cursor-pointer ${block.color}`}
                            >
                              {editingBlockId === block.id ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={block.text || ""}
                                  onChange={(e) => updateBlockText(block.id, e.target.value)}
                                  onBlur={finishEditing}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") finishEditing();
                                    if (e.key === "Escape") finishEditing();
                                  }}
                                  className="bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none w-8 text-inherit"
                                  onFocus={(e) => e.currentTarget.select()}
                                />
                              ) : (
                                <span>{block.text || "ptr"}</span>
                              )}
                            </div>
                            <svg className="w-4 h-4 stroke-[3.5] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </>
                        )}

                        {block.arrowDir === "left" && (
                          <>
                            <svg className="w-4 h-4 stroke-[3.5] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <div
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setEditingBlockId(block.id);
                              }}
                              className={`px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-neo-sm -ml-0.5 cursor-pointer ${block.color}`}
                            >
                              {editingBlockId === block.id ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={block.text || ""}
                                  onChange={(e) => updateBlockText(block.id, e.target.value)}
                                  onBlur={finishEditing}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") finishEditing();
                                    if (e.key === "Escape") finishEditing();
                                  }}
                                  className="bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none w-8 text-inherit"
                                  onFocus={(e) => e.currentTarget.select()}
                                />
                              ) : (
                                <span>{block.text || "ptr"}</span>
                              )}
                            </div>
                          </>
                        )}

                        {block.arrowDir === "right" && (
                          <>
                            <div
                              onDoubleClick={(e) => {
                                e.stopPropagation();
                                setEditingBlockId(block.id);
                              }}
                              className={`px-2 py-0.5 border-2 border-black rounded text-xs font-black shadow-neo-sm -mr-0.5 cursor-pointer ${block.color}`}
                            >
                              {editingBlockId === block.id ? (
                                <input
                                  autoFocus
                                  type="text"
                                  value={block.text || ""}
                                  onChange={(e) => updateBlockText(block.id, e.target.value)}
                                  onBlur={finishEditing}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") finishEditing();
                                    if (e.key === "Escape") finishEditing();
                                  }}
                                  className="bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none w-8 text-inherit"
                                  onFocus={(e) => e.currentTarget.select()}
                                />
                              ) : (
                                <span>{block.text || "ptr"}</span>
                              )}
                            </div>
                            <svg className="w-4 h-4 stroke-[3.5] text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </>
                        )}
                      </div>
                    )}

                    {/* 3. PLAIN TEXT */}
                    {block.type === "text" && (
                      <div
                        onDoubleClick={(e) => {
                          e.stopPropagation();
                          setEditingBlockId(block.id);
                        }}
                        className={`font-black tracking-wide cursor-grab active:cursor-grabbing text-sm ${block.color}`}
                      >
                        {editingBlockId === block.id ? (
                          <input
                            autoFocus
                            type="text"
                            value={block.text || ""}
                            onChange={(e) => updateBlockText(block.id, e.target.value)}
                            onBlur={finishEditing}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") finishEditing();
                              if (e.key === "Escape") finishEditing();
                            }}
                            className="bg-transparent border-none outline-none font-black text-sm p-0 focus:ring-0 focus:outline-none text-inherit"
                            style={{ width: `${Math.max(40, (block.text || "").length * 8 + 10)}px` }}
                            onFocus={(e) => e.currentTarget.select()}
                          />
                        ) : (
                          <span>{block.text || "label"}</span>
                        )}
                      </div>
                    )}

                    {/* 4. COHESIVE ARRAY SHAPE */}
                    {block.type === "array" && block.arrayValues && (
                      <div className="flex select-none">
                        {block.label && (
                          <div className="flex flex-col justify-start pr-2">
                            <div className="h-12 flex items-center">
                              <span className="font-black text-gray-800 text-sm uppercase whitespace-nowrap">
                                {block.label} =
                              </span>
                            </div>
                            <div className="h-5" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <div className={`flex items-center border-4 border-black rounded-lg shadow-neo-sm bg-white`}>
                            {block.arrayValues.map((val, idx) => {
                              const isCellEditing =
                                editingCell?.blockId === block.id && editingCell.index === idx;

                              return (
                                <div
                                  key={idx}
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCell({ blockId: block.id, index: idx });
                                  }}
                                  className={`w-12 h-12 flex items-center justify-center font-black text-lg border-r-2 border-black last:border-r-0 cursor-pointer hover:bg-gray-50 transition-colors ${block.color.replace('border-black', '')}`}
                                >
                                  {isCellEditing ? (
                                    <input
                                      autoFocus
                                      type="text"
                                      value={val}
                                      onChange={(e) => updateArrayValue(block.id, idx, e.target.value)}
                                      onBlur={finishCellEditing}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") finishCellEditing();
                                        if (e.key === "Escape") finishCellEditing();
                                      }}
                                      className="w-10 bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none"
                                      onFocus={(e) => e.currentTarget.select()}
                                    />
                                  ) : (
                                    <span>{val || "\u00A0"}</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                          
                          {/* Automatic aligned index numbering row */}
                          <div className="flex items-center">
                            {block.arrayValues.map((_, idx) => (
                              <div key={idx} className="w-12 text-center text-gray-500 font-bold text-xs pt-1">
                                {idx}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* 5. COHESIVE LINKED LIST SHAPE */}
                    {block.type === "linked_list" && block.listValues && (
                      <div className="flex items-center select-none bg-white/60 p-2 rounded-xl">
                        {block.listValues.map((val, idx) => {
                          const isCellEditing =
                            editingCell?.blockId === block.id && editingCell.index === idx;

                          return (
                            <React.Fragment key={idx}>
                              <div
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCell({ blockId: block.id, index: idx });
                                }}
                                className={`w-12 h-12 flex items-center justify-center border-4 border-black rounded-lg font-black text-lg shadow-neo-sm cursor-pointer hover:bg-gray-50 transition-colors ${block.color.replace('border-black', '')}`}
                              >
                                {isCellEditing ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={val}
                                    onChange={(e) => updateListValue(block.id, idx, e.target.value)}
                                    onBlur={finishCellEditing}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") finishCellEditing();
                                      if (e.key === "Escape") finishCellEditing();
                                    }}
                                    className="w-10 bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none"
                                    onFocus={(e) => e.currentTarget.select()}
                                  />
                                ) : (
                                  <span>{val || "\u00A0"}</span>
                                )}
                              </div>

                              {idx < (block.listValues?.length || 0) - 1 ? (
                                <div className="flex items-center px-1">
                                  <div className="flex flex-col items-center">
                                    <span className="text-[9px] font-black text-gray-500 uppercase -mb-1">next</span>
                                    <svg className="w-8 h-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center px-2">
                                  <svg className="w-8 h-6 text-black mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                  </svg>
                                  <span className="text-gray-400 font-black text-sm uppercase">NULL</span>
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    )}

                    {/* 6. COHESIVE HASHMAP SHAPE */}
                    {block.type === "hashmap" && block.mapEntries && (
                      <div className="flex flex-col border-4 border-black p-3 bg-white rounded-xl shadow-neo select-none min-w-[210px]">
                        {block.label && (
                          <div className="text-xs font-black uppercase text-gray-500 border-b border-black pb-1 mb-2">
                            {block.label} Map
                          </div>
                        )}
                        <div className="grid grid-cols-3 gap-2 text-[10px] font-black text-gray-400 uppercase tracking-wider mb-1.5 text-center">
                          <div>Idx</div>
                          <div>Key</div>
                          <div>Val</div>
                        </div>

                        <div className="space-y-1.5">
                          {block.mapEntries.map((entry, idx) => {
                            const isKeyEditing =
                              editingCell?.blockId === block.id &&
                              editingCell.index === idx &&
                              editingCell.field === "key";
                            const isValEditing =
                              editingCell?.blockId === block.id &&
                              editingCell.index === idx &&
                              editingCell.field === "val";

                            return (
                              <div key={idx} className="grid grid-cols-3 gap-2 items-center text-center">
                                <span className="font-bold text-xs text-gray-400">[{idx}]</span>
                                
                                {/* Key cell */}
                                <div
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCell({ blockId: block.id, index: idx, field: "key" });
                                  }}
                                  className={`h-8 border-2 border-black rounded font-black text-xs flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors ${block.color.replace('border-black', '')}`}
                                >
                                  {isKeyEditing ? (
                                    <input
                                      autoFocus
                                      type="text"
                                      value={entry.key}
                                      onChange={(e) => updateMapEntry(block.id, idx, "key", e.target.value)}
                                      onBlur={finishCellEditing}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") finishCellEditing();
                                        if (e.key === "Escape") finishCellEditing();
                                      }}
                                      className="w-full bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none"
                                      onFocus={(e) => e.currentTarget.select()}
                                    />
                                  ) : (
                                    <span className="truncate px-1">{entry.key}</span>
                                  )}
                                </div>

                                {/* Val cell */}
                                <div
                                  onDoubleClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCell({ blockId: block.id, index: idx, field: "val" });
                                  }}
                                  className="h-8 border-2 border-black rounded bg-white font-black text-xs flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                >
                                  {isValEditing ? (
                                    <input
                                      autoFocus
                                      type="text"
                                      value={entry.val}
                                      onChange={(e) => updateMapEntry(block.id, idx, "val", e.target.value)}
                                      onBlur={finishCellEditing}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") finishCellEditing();
                                        if (e.key === "Escape") finishCellEditing();
                                      }}
                                      className="w-full bg-transparent text-center border-none outline-none font-black text-xs p-0 focus:ring-0 focus:outline-none"
                                      onFocus={(e) => e.currentTarget.select()}
                                    />
                                  ) : (
                                    <span className="truncate px-1">{entry.val}</span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 7. COHESIVE BST SUBTREE SHAPE */}
                    {block.type === "tree" && block.treeValues && (
                      <div className="relative w-[220px] h-[130px] select-none">
                        
                        {/* Connecting branch lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                          <line x1={110} y1={24} x2={24} y2={104} stroke="black" strokeWidth={3.5} />
                          <line x1={110} y1={24} x2={196} y2={104} stroke="black" strokeWidth={3.5} />
                        </svg>

                        {(() => {
                          const isRootEditing =
                            editingCell?.blockId === block.id && editingCell.field === "root";
                          const isLeftEditing =
                            editingCell?.blockId === block.id && editingCell.field === "left";
                          const isRightEditing =
                            editingCell?.blockId === block.id && editingCell.field === "right";

                          return (
                            <>
                              {/* Root Circle Node */}
                              <div
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCell({ blockId: block.id, field: "root" });
                                }}
                                style={{ left: "86px", top: "0px", zIndex: 10 }}
                                className={`absolute w-12 h-12 flex items-center justify-center border-4 border-black rounded-full font-black text-lg shadow-neo-sm cursor-pointer hover:scale-105 transition-all ${block.color.replace('border-black', '')}`}
                              >
                                {isRootEditing ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={block.treeValues.root}
                                    onChange={(e) => updateTreeValue(block.id, "root", e.target.value)}
                                    onBlur={finishCellEditing}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") finishCellEditing();
                                      if (e.key === "Escape") finishCellEditing();
                                    }}
                                    className="w-10 bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none"
                                    onFocus={(e) => e.currentTarget.select()}
                                  />
                                ) : (
                                  <span>{block.treeValues.root}</span>
                                )}
                              </div>

                              {/* Left Circle Node */}
                              <div
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCell({ blockId: block.id, field: "left" });
                                }}
                                style={{ left: "0px", top: "80px", zIndex: 10 }}
                                className="absolute w-12 h-12 flex items-center justify-center border-4 border-black rounded-full bg-white font-black text-lg shadow-neo-sm cursor-pointer hover:scale-105 transition-all"
                              >
                                {isLeftEditing ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={block.treeValues.left}
                                    onChange={(e) => updateTreeValue(block.id, "left", e.target.value)}
                                    onBlur={finishCellEditing}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") finishCellEditing();
                                      if (e.key === "Escape") finishCellEditing();
                                    }}
                                    className="w-10 bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none"
                                    onFocus={(e) => e.currentTarget.select()}
                                  />
                                ) : (
                                  <span>{block.treeValues.left}</span>
                                )}
                              </div>

                              {/* Right Circle Node */}
                              <div
                                onDoubleClick={(e) => {
                                  e.stopPropagation();
                                  setEditingCell({ blockId: block.id, field: "right" });
                                }}
                                style={{ left: "172px", top: "80px", zIndex: 10 }}
                                className="absolute w-12 h-12 flex items-center justify-center border-4 border-black rounded-full bg-white font-black text-lg shadow-neo-sm cursor-pointer hover:scale-105 transition-all"
                              >
                                {isRightEditing ? (
                                  <input
                                    autoFocus
                                    type="text"
                                    value={block.treeValues.right}
                                    onChange={(e) => updateTreeValue(block.id, "right", e.target.value)}
                                    onBlur={finishCellEditing}
                                    onKeyDown={(e) => {
                                      if (e.key === "Enter") finishCellEditing();
                                      if (e.key === "Escape") finishCellEditing();
                                    }}
                                    className="w-10 bg-transparent text-center border-none outline-none font-black text-lg p-0 focus:ring-0 focus:outline-none"
                                    onFocus={(e) => e.currentTarget.select()}
                                  />
                                ) : (
                                  <span>{block.treeValues.right}</span>
                                )}
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Notes notepad collapsible sidebar */}
        {showNotes && (
          <div className="w-full lg:w-96 flex flex-col border-4 border-black rounded-xl overflow-hidden shadow-neo bg-white shrink-0 animate-[slideIn_0.2s_ease-out]">
            <div className="bg-gray-100 border-b-2 border-black px-4 py-2 font-black text-xs uppercase tracking-wider text-gray-500 flex items-center justify-between">
              <span>✍️ Lined Notepad</span>
              <button
                onClick={() => setNotepadText("")}
                className="text-[10px] text-neoRed hover:underline cursor-pointer font-bold uppercase"
              >
                Clear Notes
              </button>
            </div>
            <textarea
              value={notepadText}
              onChange={(e) => setNotepadText(e.target.value)}
              className="notebook-paper w-full flex-grow outline-none font-semibold text-gray-800 text-sm leading-7 tracking-wide p-6 resize-none focus:ring-0 focus:outline-none"
              placeholder="Type your notes or algorithm pseudocode here..."
              style={{ minHeight: "350px" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
