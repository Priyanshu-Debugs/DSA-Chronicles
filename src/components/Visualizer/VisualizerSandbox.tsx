"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

type DSArchetype = "array" | "stack" | "queue" | "linkedlist";

interface LinkedListNode {
  id: number;
  val: number;
  next: number | null;
}

interface SandboxLog {
  time: string;
  message: string;
  type: "info" | "success" | "warning" | "danger";
}

interface AnimationFrame {
  array?: number[];
  highlights: number[];
  highlightType: "compare" | "swap" | "found" | "default" | "sorted";
  description: string;
  pointers?: Record<string, number | null>;
}

export default function VisualizerSandbox() {
  // Active Data Structure
  const [activeDS, setActiveDS] = useState<DSArchetype>("array");

  // Core Data Structures State
  const [arrayData, setArrayData] = useState<number[]>([12, 5, 8, 3, 19]);
  const [stackData, setStackData] = useState<number[]>([10, 20, 30]);
  const [queueData, setQueueData] = useState<number[]>([40, 50, 60]);
  const [listNodes, setListNodes] = useState<LinkedListNode[]>([
    { id: 0, val: 5, next: 1 },
    { id: 1, val: 15, next: 2 },
    { id: 2, val: 25, next: null },
  ]);
  const [nextNodeId, setNextNodeId] = useState<number>(3);

  // Animation Engine States
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [frames, setFrames] = useState<AnimationFrame[]>([]);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(-1);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1000); // ms

  // Input States
  const [inputValue, setInputValue] = useState<string>("");
  const [inputIndex, setInputIndex] = useState<string>("");

  // History Logger State
  const [logs, setLogs] = useState<SandboxLog[]>([]);

  // Ref to hold playback timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  // Helper to add history logs
  const addLog = (message: string, type: SandboxLog["type"] = "info") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => [...prev, { time: timeStr, message, type }]);
  };

  // Scroll to bottom of logs when log updates
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Set up initial sandbox state logs
  useEffect(() => {
    addLog(`Visualizer Sandbox initialized with ${activeDS.toUpperCase()} view.`, "info");
  }, [activeDS]);

  // Animation player runner
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCurrentFrameIdx((prev) => {
          if (prev < frames.length - 1) {
            return prev + 1;
          } else {
            // Reached last frame, stop animation
            setIsRunning(false);
            if (timerRef.current) clearInterval(timerRef.current);
            addLog("Animation sequence completed successfully.", "success");
            return prev;
          }
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, frames, playbackSpeed]);

  // Cancel/Reset any active animations
  const stopAnimation = () => {
    setIsRunning(false);
    setFrames([]);
    setCurrentFrameIdx(-1);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // --- Array Operations ---
  const handleArrayInsert = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    const idx = parseInt(inputIndex);
    if (isNaN(val)) {
      addLog("Insert value must be a number.", "danger");
      return;
    }
    if (isNaN(idx) || idx < 0 || idx > arrayData.length) {
      addLog(`Index must be between 0 and ${arrayData.length}.`, "danger");
      return;
    }
    if (arrayData.length >= 10) {
      addLog("Array Sandbox has reached its maximum size of 10.", "warning");
      return;
    }

    const nextArr = [...arrayData];
    nextArr.splice(idx, 0, val);
    setArrayData(nextArr);
    addLog(`Inserted element ${val} at index ${idx}.`, "success");
    setInputValue("");
    setInputIndex("");
  };

  const handleArrayDelete = () => {
    stopAnimation();
    const idx = parseInt(inputIndex);
    if (isNaN(idx) || idx < 0 || idx >= arrayData.length) {
      addLog(`Delete index must be between 0 and ${arrayData.length - 1}.`, "danger");
      return;
    }

    const nextArr = [...arrayData];
    const removed = nextArr.splice(idx, 1)[0];
    setArrayData(nextArr);
    addLog(`Deleted element ${removed} at index ${idx}.`, "warning");
    setInputIndex("");
  };

  const handleArraySearch = () => {
    stopAnimation();
    const target = parseInt(inputValue);
    if (isNaN(target)) {
      addLog("Please enter a numeric target value to search.", "danger");
      return;
    }

    addLog(`Starting search animation for value ${target}...`, "info");
    const searchFrames: AnimationFrame[] = [];
    let found = false;
    let foundIdx = -1;

    for (let i = 0; i < arrayData.length; i++) {
      // Compare state
      searchFrames.push({
        highlights: [i],
        highlightType: "compare",
        description: `Comparing index ${i} (value: ${arrayData[i]}) with target value ${target}...`,
        pointers: { i },
      });

      if (arrayData[i] === target) {
        found = true;
        foundIdx = i;
        // Found state
        searchFrames.push({
          highlights: [i],
          highlightType: "found",
          description: `Target ${target} found successfully at index ${i}!`,
          pointers: { i },
        });
        break;
      }
    }

    if (!found) {
      searchFrames.push({
        highlights: [],
        highlightType: "default",
        description: `Search completed. Value ${target} was not found in the array.`,
        pointers: { i: null },
      });
    }

    setFrames(searchFrames);
    setCurrentFrameIdx(0);
    setIsRunning(true);
    if (found) {
      addLog(`Search completed: found target ${target} at index ${foundIdx}.`, "success");
    } else {
      addLog(`Search completed: target ${target} not found.`, "warning");
    }
  };

  const handleArraySort = () => {
    stopAnimation();
    if (arrayData.length <= 1) {
      addLog("Array is already sorted.", "warning");
      return;
    }

    addLog("Building Bubble Sort animation sequence...", "info");
    const sortFrames: AnimationFrame[] = [];
    const arr = [...arrayData];
    const n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        // Compare frame
        sortFrames.push({
          array: [...arr],
          highlights: [j, j + 1],
          highlightType: "compare",
          description: `Comparing elements at index ${j} (${arr[j]}) and index ${j + 1} (${arr[j + 1]})...`,
          pointers: { j, i },
        });

        if (arr[j] > arr[j + 1]) {
          // Swap logic
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;

          // Swap frame
          sortFrames.push({
            array: [...arr],
            highlights: [j, j + 1],
            highlightType: "swap",
            description: `Swapped elements at index ${j} and ${j + 1} since ${temp} > ${arr[j]}!`,
            pointers: { j, i },
          });
        }
      }
      // Index n - i - 1 is now sorted
      sortFrames.push({
        array: [...arr],
        highlights: [n - i - 1],
        highlightType: "sorted",
        description: `Pass complete. Element ${arr[n - i - 1]} at index ${n - i - 1} is now in its final sorted position.`,
        pointers: { j: null, i },
      });
    }

    // Mark complete array as sorted
    sortFrames.push({
      array: [...arr],
      highlights: Array.from({ length: n }, (_, idx) => idx),
      highlightType: "sorted",
      description: "Array has been sorted successfully using Bubble Sort!",
      pointers: { j: null, i: null },
    });

    setFrames(sortFrames);
    setCurrentFrameIdx(0);
    setIsRunning(true);
    addLog("Bubble Sort visualizer sequence running.", "success");
  };

  const handleArrayReset = () => {
    stopAnimation();
    setArrayData([12, 5, 8, 3, 19]);
    addLog("Array reset to default values: [12, 5, 8, 3, 19].", "info");
  };

  // --- Stack Operations ---
  const handleStackPush = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      addLog("Push value must be a number.", "danger");
      return;
    }
    if (stackData.length >= 6) {
      addLog("Stack Overflow: Max stack size is 6.", "danger");
      return;
    }

    setStackData((prev) => [...prev, val]);
    addLog(`Pushed element ${val} onto Stack.`, "success");
    setInputValue("");
  };

  const handleStackPop = () => {
    stopAnimation();
    if (stackData.length === 0) {
      addLog("Stack Underflow: Stack is empty.", "danger");
      return;
    }

    const nextStack = [...stackData];
    const popped = nextStack.pop();
    setStackData(nextStack);
    addLog(`Popped element ${popped} from Stack.`, "warning");
  };

  const handleStackPeek = () => {
    stopAnimation();
    if (stackData.length === 0) {
      addLog("Stack is empty. Nothing to peek.", "danger");
      return;
    }

    const topVal = stackData[stackData.length - 1];
    addLog(`Peeked Top: value ${topVal} at index ${stackData.length - 1}.`, "info");
    
    // Quick highlight simulation
    const peekFrames: AnimationFrame[] = [
      {
        highlights: [stackData.length - 1],
        highlightType: "found",
        description: `Top of stack contains value ${topVal}.`,
        pointers: { TOP: stackData.length - 1 },
      },
    ];
    setFrames(peekFrames);
    setCurrentFrameIdx(0);
  };

  const handleStackClear = () => {
    stopAnimation();
    setStackData([]);
    addLog("Stack cleared.", "warning");
  };

  // --- Queue Operations ---
  const handleQueueEnqueue = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      addLog("Enqueue value must be a number.", "danger");
      return;
    }
    if (queueData.length >= 6) {
      addLog("Queue Overflow: Max queue size is 6.", "danger");
      return;
    }

    setQueueData((prev) => [...prev, val]);
    addLog(`Enqueued element ${val} to Queue.`, "success");
    setInputValue("");
  };

  const handleQueueDequeue = () => {
    stopAnimation();
    if (queueData.length === 0) {
      addLog("Queue Underflow: Queue is empty.", "danger");
      return;
    }

    const nextQueue = [...queueData];
    const dequeued = nextQueue.shift();
    setQueueData(nextQueue);
    addLog(`Dequeued element ${dequeued} from Queue.`, "warning");
  };

  const handleQueueClear = () => {
    stopAnimation();
    setQueueData([]);
    addLog("Queue cleared.", "warning");
  };

  // --- Linked List Operations ---
  const handleListInsertHead = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      addLog("Value must be a number.", "danger");
      return;
    }
    if (listNodes.length >= 6) {
      addLog("Linked List Sandbox is full (Max 6 nodes).", "warning");
      return;
    }

    const headNode = listNodes.find(
      (n) => !listNodes.some((other) => other.next === n.id)
    );
    const newId = nextNodeId;
    const newNode: LinkedListNode = {
      id: newId,
      val,
      next: headNode ? headNode.id : null,
    };

    setListNodes((prev) => [newNode, ...prev]);
    setNextNodeId((prev) => prev + 1);
    addLog(`Inserted node ${val} at the Head of the list.`, "success");
    setInputValue("");
  };

  const handleListInsertTail = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      addLog("Value must be a number.", "danger");
      return;
    }
    if (listNodes.length >= 6) {
      addLog("Linked List Sandbox is full (Max 6 nodes).", "warning");
      return;
    }

    const tailNode = listNodes.find((n) => n.next === null);
    const newId = nextNodeId;
    const newNode: LinkedListNode = {
      id: newId,
      val,
      next: null,
    };

    if (tailNode) {
      setListNodes((prev) =>
        prev.map((node) => (node.id === tailNode.id ? { ...node, next: newId } : node)).concat(newNode)
      );
    } else {
      setListNodes([newNode]);
    }
    setNextNodeId((prev) => prev + 1);
    addLog(`Inserted node ${val} at the Tail of the list.`, "success");
    setInputValue("");
  };

  const handleListDelete = () => {
    stopAnimation();
    const val = parseInt(inputValue);
    if (isNaN(val)) {
      addLog("Value to delete must be a number.", "danger");
      return;
    }

    const nodeToDelete = listNodes.find((n) => n.val === val);
    if (!nodeToDelete) {
      addLog(`Node with value ${val} not found in the list.`, "danger");
      return;
    }

    const parentNode = listNodes.find((n) => n.next === nodeToDelete.id);

    setListNodes((prev) => {
      // Filter out deleted node
      const filtered = prev.filter((node) => node.id !== nodeToDelete.id);
      // Link parent to deleted node's next
      return filtered.map((node) =>
        parentNode && node.id === parentNode.id ? { ...node, next: nodeToDelete.next } : node
      );
    });

    addLog(`Deleted node with value ${val}.`, "warning");
    setInputValue("");
  };

  const handleListClear = () => {
    stopAnimation();
    setListNodes([]);
    addLog("Linked List cleared.", "warning");
  };

  // --- Dynamic Visual Rendering Helpers ---
  const activeFrame = frames[currentFrameIdx] || null;
  const currentArray = activeFrame?.array || arrayData;
  const activeHighlights = activeFrame?.highlights || [];
  const highlightType = activeFrame?.highlightType || "default";
  const stepDescription = activeFrame?.description || "";
  const activePointers = activeFrame?.pointers || {};

  // Complexity stats mapper for active DS
  const getComplexity = () => {
    switch (activeDS) {
      case "array":
        return { access: "O(1)", search: "O(N)", insert: "O(N)", delete: "O(N)" };
      case "stack":
        return { access: "O(N)", search: "O(N)", insert: "O(1) [Push]", delete: "O(1) [Pop]" };
      case "queue":
        return { access: "O(N)", search: "O(N)", insert: "O(1) [Enqueue]", delete: "O(1) [Dequeue]" };
      case "linkedlist":
        return { access: "O(N)", search: "O(N)", insert: "O(1)", delete: "O(1)" };
    }
  };

  const complexity = getComplexity();

  // Helper to traverse and order list nodes for rendering
  const getOrderedListNodes = () => {
    if (listNodes.length === 0) return [];
    
    // Find head node (no other node points to it)
    const head = listNodes.find(
      (n) => !listNodes.some((other) => other.next === n.id)
    );
    if (!head) return listNodes; // Fallback if cyclic or empty

    const ordered: LinkedListNode[] = [head];
    let curr = head;
    while (curr.next !== null) {
      const nextNode = listNodes.find((n) => n.id === curr.next);
      if (nextNode && !ordered.some((n) => n.id === nextNode.id)) {
        ordered.push(nextNode);
        curr = nextNode;
      } else {
        break; // Guard against cycles
      }
    }
    return ordered;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
      {/* Header Banner */}
      <header className="bg-neoYellow border-4 border-black p-6 md:p-8 shadow-neo rounded-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="bg-black text-neoYellow px-3 py-1 font-black transform rotate-3 border-2 border-black text-xs uppercase w-max mb-3">
            INTERACTIVE PLAYGROUND
          </div>
          <div className="flex items-center gap-3.5 mb-2 mt-1">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-black">
              Visualizer Sandbox
            </h1>
          </div>
          <p className="text-sm font-black border-t-2 border-black pt-2 max-w-xl text-black">
            Build, modify, search, and sort fundamental data structures in real-time. Toggle structures below.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="bg-white border-4 border-black text-black font-black text-sm py-2.5 px-5 rounded-lg shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all text-center uppercase"
        >
          Back to Roadmap
        </Link>
      </header>

      {/* Main Sandbox Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Controls (5 columns) */}
        <section className="lg:col-span-4 space-y-6 flex flex-col">
          {/* Data Structure Selector */}
          <div className="bg-white border-4 border-black p-4 shadow-neo rounded-xl space-y-3">
            <h3 className="font-black text-lg uppercase border-b-2 border-black pb-1 text-black">
              Select Structure
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: "array", label: "Array", color: "bg-neoPink" },
                { id: "stack", label: "Stack", color: "bg-neoBlue" },
                { id: "queue", label: "Queue", color: "bg-neoGreen" },
                { id: "linkedlist", label: "Linked List", color: "bg-neoPurple" },
              ].map((ds) => (
                <button
                  key={ds.id}
                  onClick={() => {
                    stopAnimation();
                    setActiveDS(ds.id as DSArchetype);
                  }}
                  className={`border-2 border-black p-3 font-black uppercase rounded-lg text-sm transition-all text-black cursor-pointer ${
                    activeDS === ds.id
                      ? `${ds.color} shadow-neo-sm translate-x-0.5 translate-y-0.5`
                      : "bg-white hover:bg-stone-50 shadow-neo"
                  }`}
                >
                  {ds.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Operations Form */}
          <div className="bg-white border-4 border-black p-5 shadow-neo rounded-xl space-y-4 flex-1">
            <h3 className="font-black text-lg uppercase border-b-2 border-black pb-1 text-black">
              Operations Panel
            </h3>

            {/* Shared Value inputs */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-black uppercase text-gray-500 block mb-1">
                  Value Input
                </label>
                <input
                  type="text"
                  placeholder="Enter a value (e.g. 42)"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-full border-4 border-black font-black p-2 bg-white shadow-neo-sm focus:outline-none text-black placeholder-gray-400 text-sm"
                />
              </div>

              {activeDS === "array" && (
                <div>
                  <label className="text-xs font-black uppercase text-gray-500 block mb-1">
                    Index Input (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Enter index (e.g. 2)"
                    value={inputIndex}
                    onChange={(e) => setInputIndex(e.target.value)}
                    className="w-full border-4 border-black font-black p-2 bg-white shadow-neo-sm focus:outline-none text-black placeholder-gray-400 text-sm"
                  />
                </div>
              )}
            </div>

            {/* Dynamic Buttons depending on DS */}
            <div className="pt-2 flex flex-col gap-3">
              {activeDS === "array" && (
                <>
                  <button
                    onClick={handleArrayInsert}
                    className="bg-neoPink border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    ➕ Insert Element
                  </button>
                  <button
                    onClick={handleArrayDelete}
                    className="bg-neoRed border-4 border-black text-white font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🗑️ Delete at Index
                  </button>
                  <button
                    onClick={handleArraySearch}
                    className="bg-neoYellow border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🔍 Search Target
                  </button>
                  <button
                    onClick={handleArraySort}
                    className="bg-neoGreen border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    ⚡ Bubble Sort
                  </button>
                  <button
                    onClick={handleArrayReset}
                    className="bg-stone-200 border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🔄 Reset Array
                  </button>
                </>
              )}

              {activeDS === "stack" && (
                <>
                  <button
                    onClick={handleStackPush}
                    className="bg-neoBlue border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    📥 Push Value
                  </button>
                  <button
                    onClick={handleStackPop}
                    className="bg-neoRed border-4 border-black text-white font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    📤 Pop Value
                  </button>
                  <button
                    onClick={handleStackPeek}
                    className="bg-neoYellow border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    👀 Peek Top
                  </button>
                  <button
                    onClick={handleStackClear}
                    className="bg-stone-200 border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🚫 Clear Stack
                  </button>
                </>
              )}

              {activeDS === "queue" && (
                <>
                  <button
                    onClick={handleQueueEnqueue}
                    className="bg-neoGreen border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    📥 Enqueue Value
                  </button>
                  <button
                    onClick={handleQueueDequeue}
                    className="bg-neoRed border-4 border-black text-white font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    📤 Dequeue Value
                  </button>
                  <button
                    onClick={handleQueueClear}
                    className="bg-stone-200 border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🚫 Clear Queue
                  </button>
                </>
              )}

              {activeDS === "linkedlist" && (
                <>
                  <button
                    onClick={handleListInsertHead}
                    className="bg-neoPurple border-4 border-black text-white font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🏁 Insert Head
                  </button>
                  <button
                    onClick={handleListInsertTail}
                    className="bg-neoBlue border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🏁 Insert Tail
                  </button>
                  <button
                    onClick={handleListDelete}
                    className="bg-neoRed border-4 border-black text-white font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🗑️ Delete Node (by Value)
                  </button>
                  <button
                    onClick={handleListClear}
                    className="bg-stone-200 border-4 border-black text-black font-black text-xs py-2.5 px-4 shadow-neo hover:-translate-y-0.5 active:translate-y-0.5 transition-all uppercase cursor-pointer text-center"
                  >
                    🚫 Clear List
                  </button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Right Side Canvas (8 columns) */}
        <section className="lg:col-span-8 space-y-6 flex flex-col">
          {/* Main Visual Arena Canvas */}
          <div className="bg-[#FFFDEB] border-4 border-black p-8 rounded-xl shadow-neo min-h-[450px] relative flex flex-col items-center justify-center overflow-x-auto">
            {/* Visualizer Status Bar */}
            <div className="absolute top-4 left-4 right-4 flex flex-wrap justify-between items-center gap-2 border-b-2 border-black pb-2 text-xs font-black uppercase text-black">
              <span>Data Structure: {activeDS}</span>
              <div className="flex items-center gap-2">
                {frames.length > 0 && (
                  <span className="bg-neoYellow px-2 py-0.5 border border-black shadow-neo-sm text-[10px]">
                    Step {currentFrameIdx + 1} / {frames.length}
                  </span>
                )}
                {isRunning ? (
                  <span className="bg-neoGreen px-2 py-0.5 border border-black shadow-neo-sm animate-pulse text-[10px]">
                    Playing
                  </span>
                ) : (
                  <span className="bg-stone-200 px-2 py-0.5 border border-black shadow-neo-sm text-[10px]">
                    Idle
                  </span>
                )}
              </div>
            </div>

            {/* Display Narratives */}
            {stepDescription && (
              <div className="absolute top-14 left-4 right-4 bg-white border-2 border-black p-2.5 rounded shadow-neo-sm text-xs font-black text-gray-700 uppercase leading-snug">
                💬 {stepDescription}
              </div>
            )}

            {/* Dynamic Rendering Panels */}
            <div className="mt-14 mb-8 flex justify-center items-center w-full min-h-[220px]">
              {/* Array Renderer */}
              {activeDS === "array" && (
                <div className="flex items-center justify-center gap-3 md:gap-4 flex-wrap pt-8">
                  {currentArray.map((val, idx) => {
                    const isHighlighted = activeHighlights.includes(idx);
                    let nodeColor = "bg-white";
                    if (isHighlighted) {
                      if (highlightType === "compare") nodeColor = "bg-neoYellow";
                      if (highlightType === "swap") nodeColor = "bg-neoRed text-white";
                      if (highlightType === "found") nodeColor = "bg-neoGreen";
                      if (highlightType === "sorted") nodeColor = "bg-neoGreen";
                    }

                    const hasPointerI = activePointers["i"] === idx;
                    const hasPointerJ = activePointers["j"] === idx;

                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        {/* Pointers mapping above */}
                        <div className="h-8 flex items-center justify-center space-x-1 mb-1">
                          {hasPointerI && (
                            <span className="bg-black text-white px-2 py-0.5 border border-black text-[9px] font-black uppercase rounded shadow-neo-sm">
                              i
                            </span>
                          )}
                          {hasPointerJ && (
                            <span className="bg-neoYellow text-black px-2 py-0.5 border border-black text-[9px] font-black uppercase rounded shadow-neo-sm">
                              j
                            </span>
                          )}
                        </div>

                        {/* Array Cell Node */}
                        <div className={`w-14 h-14 md:w-16 md:h-16 border-4 border-black text-black font-black text-lg md:text-xl rounded-xl flex items-center justify-center shadow-neo transition-all duration-300 ${nodeColor}`}>
                          {val}
                        </div>

                        {/* Index Indicator below */}
                        <span className="text-[10px] font-black text-gray-500 mt-2 font-mono">
                          [{idx}]
                        </span>
                      </div>
                    );
                  })}
                  {currentArray.length === 0 && (
                    <span className="text-gray-500 font-bold uppercase text-xs">
                      Array is empty. Insert elements to start.
                    </span>
                  )}
                </div>
              )}

              {/* Stack Beaker Renderer */}
              {activeDS === "stack" && (
                <div className="flex flex-col items-center pt-8">
                  {/* Pointers indicator top */}
                  <div className="h-6 mb-2">
                    {stackData.length > 0 && (
                      <span className="bg-black text-white px-2.5 py-0.5 border border-black text-[10px] font-black uppercase rounded shadow-neo-sm">
                        TOP (IDX: {stackData.length - 1})
                      </span>
                    )}
                  </div>

                  {/* Vertical stack container beaker */}
                  <div className="border-4 border-black border-t-0 bg-stone-50/50 p-3 rounded-b-2xl w-24 flex flex-col-reverse gap-3 min-h-[260px] justify-start transition-all">
                    {stackData.map((val, idx) => {
                      const isHighlighted = activeHighlights.includes(idx);
                      let nodeColor = "bg-white";
                      if (isHighlighted) nodeColor = "bg-neoGreen";

                      return (
                        <div
                          key={idx}
                          className={`w-16 h-12 border-4 border-black text-black font-black text-md rounded-lg flex items-center justify-center shadow-neo-sm transition-all duration-300 ${nodeColor} animate-[slideDown_0.25s_ease-out]`}
                        >
                          {val}
                        </div>
                      );
                    })}
                    {stackData.length === 0 && (
                      <div className="h-full flex items-center justify-center text-center">
                        <span className="text-gray-400 font-black text-[10px] uppercase">
                          EMPTY
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Queue Pipeline Renderer */}
              {activeDS === "queue" && (
                <div className="flex flex-col items-center w-full pt-8 px-4">
                  {/* Pipeline Box with open entries */}
                  <div className="w-full max-w-lg border-t-4 border-b-4 border-black bg-stone-50/50 py-6 px-6 flex gap-3 items-center min-h-[120px] justify-start relative">
                    {queueData.map((val, idx) => {
                      const isFront = idx === 0;
                      const isRear = idx === queueData.length - 1;

                      return (
                        <div key={idx} className="flex flex-col items-center relative shrink-0">
                          {/* Pointers above node */}
                          <div className="absolute -top-12 flex flex-col gap-1 items-center">
                            {isFront && (
                              <span className="bg-black text-white px-1.5 py-0.5 border border-black text-[8px] font-black uppercase rounded shadow-neo-sm">
                                FRONT
                              </span>
                            )}
                            {isRear && (
                              <span className="bg-neoYellow text-black px-1.5 py-0.5 border border-black text-[8px] font-black uppercase rounded shadow-neo-sm">
                                REAR
                              </span>
                            )}
                          </div>

                          {/* Queue Node element */}
                          <div className="w-14 h-14 border-4 border-black bg-white text-black font-black text-md rounded-xl flex items-center justify-center shadow-neo-sm transition-all animate-[slideInRight_0.2s_ease-out]">
                            {val}
                          </div>

                          {/* Queue Index below */}
                          <span className="text-[9px] font-black text-gray-500 mt-1 font-mono">
                            [{idx}]
                          </span>
                        </div>
                      );
                    })}
                    {queueData.length === 0 && (
                      <div className="w-full text-center">
                        <span className="text-gray-500 font-black text-xs uppercase">
                          Queue Pipeline Empty (Enqueue elements)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Linked List Renderer */}
              {activeDS === "linkedlist" && (
                <div className="flex items-center justify-center gap-1 md:gap-2 flex-wrap pt-8">
                  {getOrderedListNodes().map((node, idx, arr) => {
                    const isHead = idx === 0;
                    const isTail = idx === arr.length - 1;

                    return (
                      <div key={node.id} className="flex items-center gap-1">
                        {/* Node Card wrapper with pointer label */}
                        <div className="flex flex-col items-center relative">
                          <div className="h-6 mb-1.5 flex items-center justify-center space-x-1">
                            {isHead && (
                              <span className="bg-black text-white px-2 py-0.5 border border-black text-[9px] font-black uppercase rounded shadow-neo-sm">
                                HEAD
                              </span>
                            )}
                            {isTail && (
                              <span className="bg-neoYellow text-black px-2 py-0.5 border border-black text-[9px] font-black uppercase rounded shadow-neo-sm">
                                TAIL
                              </span>
                            )}
                          </div>

                          <div className="w-16 h-16 border-4 border-black bg-white text-black rounded-xl shadow-neo flex flex-col overflow-hidden">
                            {/* Node Value */}
                            <div className="flex-1 flex items-center justify-center font-black text-md border-b-2 border-black">
                              {node.val}
                            </div>
                            {/* Next pointer index */}
                            <div className="bg-stone-50 text-[9px] font-mono font-black text-gray-500 text-center py-0.5 uppercase">
                              {node.next !== null ? `ptr →` : "null"}
                            </div>
                          </div>
                        </div>

                        {/* Arrow Link to next element */}
                        {node.next !== null && (
                          <div className="w-8 h-16 flex items-center justify-center text-black font-black text-2xl select-none pt-4 shrink-0">
                            →
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {listNodes.length === 0 && (
                    <span className="text-gray-500 font-bold uppercase text-xs">
                      List is empty. Create nodes to visualize.
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Animation Playback Panel */}
            {frames.length > 0 && (
              <div className="w-full max-w-md bg-white border-4 border-black p-3.5 shadow-neo rounded-xl flex items-center justify-between gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setCurrentFrameIdx((p) => Math.max(0, p - 1));
                    }}
                    disabled={currentFrameIdx <= 0}
                    className="w-8 h-8 bg-stone-100 border-2 border-black font-black flex items-center justify-center shadow-neo-sm active:translate-y-0.5 disabled:opacity-40 cursor-pointer text-black"
                    title="Previous Step"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => setIsRunning(!isRunning)}
                    className={`px-4 py-1.5 border-2 border-black text-black font-black text-xs uppercase shadow-neo-sm active:translate-y-0.5 cursor-pointer ${
                      isRunning ? "bg-neoPink" : "bg-neoGreen"
                    }`}
                  >
                    {isRunning ? "⏸ Pause" : "▶ Play"}
                  </button>
                  <button
                    onClick={() => {
                      setIsRunning(false);
                      setCurrentFrameIdx((p) => Math.min(frames.length - 1, p + 1));
                    }}
                    disabled={currentFrameIdx >= frames.length - 1}
                    className="w-8 h-8 bg-stone-100 border-2 border-black font-black flex items-center justify-center shadow-neo-sm active:translate-y-0.5 disabled:opacity-40 cursor-pointer text-black"
                    title="Next Step"
                  >
                    ▶
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black text-gray-500 uppercase">
                    Speed
                  </span>
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(parseInt(e.target.value))}
                    className="border-2 border-black font-black text-xs p-1 bg-white cursor-pointer focus:outline-none text-black"
                  >
                    <option value={1500}>Slow</option>
                    <option value={1000}>Normal</option>
                    <option value={500}>Fast</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Complexity Reference Chart */}
          <div className="bg-white border-4 border-black p-5 shadow-neo rounded-xl w-full">
            <h4 className="font-black text-sm uppercase mb-3 text-black border-b border-black pb-1">
              Data Structure Complexity
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="font-bold text-gray-500 block uppercase text-[10px]">
                  Access
                </span>
                <code className="font-black text-sm text-black">{complexity?.access}</code>
              </div>
              <div>
                <span className="font-bold text-gray-500 block uppercase text-[10px]">
                  Search
                </span>
                <code className="font-black text-sm text-black">{complexity?.search}</code>
              </div>
              <div>
                <span className="font-bold text-gray-500 block uppercase text-[10px]">
                  Insertion
                </span>
                <code className="font-black text-sm text-black">{complexity?.insert}</code>
              </div>
              <div>
                <span className="font-bold text-gray-500 block uppercase text-[10px]">
                  Deletion
                </span>
                <code className="font-black text-sm text-black">{complexity?.delete}</code>
              </div>
            </div>
          </div>

          {/* Console Command Logs History */}
          <div className="bg-black border-4 border-black p-4 rounded-xl shadow-neo flex flex-col h-48">
            <h4 className="text-[10px] font-black uppercase text-neoYellow tracking-wider mb-2 border-b border-gray-800 pb-1.5 flex justify-between">
              <span>Terminal Log Console</span>
              <button
                onClick={() => setLogs([])}
                className="text-gray-500 hover:text-white font-mono text-[9px] uppercase cursor-pointer"
              >
                Clear Log
              </button>
            </h4>
            <div className="flex-1 overflow-y-auto font-mono text-[11px] leading-relaxed space-y-1 pr-1 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
              {logs.map((log, idx) => {
                let colorClass = "text-white";
                if (log.type === "success") colorClass = "text-green-400";
                if (log.type === "warning") colorClass = "text-yellow-400";
                if (log.type === "danger") colorClass = "text-red-400";

                return (
                  <div key={idx} className="flex gap-2">
                    <span className="text-gray-600 shrink-0">[{log.time}]</span>
                    <span className={colorClass}>{log.message}</span>
                  </div>
                );
              })}
              <div ref={logEndRef} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
