import React from "react";

export interface LinkedListNodeState {
  id: number;
  val: number;
  nextId: number | null;
}

export interface LinkedListStep {
  nodes: LinkedListNodeState[];
  pointers: Record<string, number | null>; // e.g. { head: 0, slow: 1, fast: 2, prev: 0, curr: 1 }
  links: Record<number, number | null>;    // Map of nodeId -> nextNodeId
  description: string;
  codeLine: number;
  problemType: "reverse" | "middle" | "cycle" | "dll";
  cycleDetected?: boolean;
}

export function generateLinkedListSteps(problemId: string, initialArray = [1, 2, 3, 4, 5]): LinkedListStep[] {
  const steps: LinkedListStep[] = [];
  
  if (problemId.includes("middle")) {
    // Tortoise and Hare
    const nodes: LinkedListNodeState[] = initialArray.map((val, idx) => ({
      id: idx,
      val,
      nextId: idx === initialArray.length - 1 ? null : idx + 1,
    }));
    
    const initialLinks: Record<number, number | null> = {};
    nodes.forEach(n => { initialLinks[n.id] = n.nextId; });

    let slow: number | null = 0;
    let fast: number | null = 0;

    steps.push({
      nodes,
      pointers: { head: 0, slow, fast },
      links: { ...initialLinks },
      description: "Initialize both slow and fast pointers to the head of the list.",
      codeLine: 2,
      problemType: "middle",
    });

    while (fast !== null && nodes[fast] && nodes[fast].nextId !== null) {
      const nextFast: number | null = nodes[fast as number].nextId;
      const nextNextFast: number | null = nextFast !== null && nodes[nextFast] ? nodes[nextFast].nextId : null;
      
      slow = nodes[slow!].nextId;
      fast = nextNextFast;

      steps.push({
        nodes,
        pointers: { head: 0, slow, fast },
        links: { ...initialLinks },
        description: `Move slow pointer forward by one node (now at: ${nodes[slow!].val}). Move fast pointer forward by two nodes (now at: ${fast !== null && nodes[fast] ? nodes[fast].val : "null"}).`,
        codeLine: 5,
        problemType: "middle",
      });
    }

    steps.push({
      nodes,
      pointers: { head: 0, slow, fast },
      links: { ...initialLinks },
      description: `Fast pointer reached the end of the list. The slow pointer points to the middle node: ${nodes[slow!].val}.`,
      codeLine: 8,
      problemType: "middle",
    });

    return steps;
  } else if (problemId.includes("loop") || problemId.includes("cycle")) {
    // Cycle Detection (Detect loop)
    const nodes: LinkedListNodeState[] = initialArray.map((val, idx) => ({
      id: idx,
      val,
      nextId: idx === initialArray.length - 1 ? 1 : idx + 1, // Node index 4 points back to Node index 1 (creating a loop)
    }));
    
    const initialLinks: Record<number, number | null> = {};
    nodes.forEach(n => { initialLinks[n.id] = n.nextId; });

    let slow: number | null = 0;
    let fast: number | null = 0;

    steps.push({
      nodes,
      pointers: { head: 0, slow, fast },
      links: { ...initialLinks },
      description: "Initialize slow and fast pointers at head. Note: Node 5 points back to Node 2, forming a cycle.",
      codeLine: 2,
      problemType: "cycle",
    });

    let met = false;
    for (let i = 0; i < 10; i++) { // Limit iterations to avoid infinite loop safety check
      if (fast === null || nodes[fast] === undefined || nodes[fast].nextId === null) {
        break;
      }
      
      const nextFast: number | null = nodes[fast as number].nextId;
      const nextNextFast: number | null = nextFast !== null && nodes[nextFast] ? nodes[nextFast].nextId : null;

      slow = nodes[slow!].nextId;
      fast = nextNextFast;

      if (slow === fast) {
        met = true;
        steps.push({
          nodes,
          pointers: { head: 0, slow, fast },
          links: { ...initialLinks },
          description: `Slow pointer and fast pointer meet at Node ${nodes[slow!].val}! Cycle detected successfully.`,
          codeLine: 7,
          problemType: "cycle",
          cycleDetected: true,
        });
        break;
      }

      steps.push({
        nodes,
        pointers: { head: 0, slow, fast },
        links: { ...initialLinks },
        description: `Slow pointer moves to Node ${nodes[slow!].val}. Fast pointer moves twice as fast to Node ${fast !== null && nodes[fast] ? nodes[fast].val : "null"}.`,
        codeLine: 5,
        problemType: "cycle",
      });
    }

    if (!met) {
      steps.push({
        nodes,
        pointers: { head: 0, slow: null, fast: null },
        links: { ...initialLinks },
        description: "Fast pointer reached end. No cycle detected in the list.",
        codeLine: 8,
        problemType: "cycle",
        cycleDetected: false,
      });
    }

    return steps;
  } else {
    // Default: Reverse Linked List
    const nodes: LinkedListNodeState[] = initialArray.map((val, idx) => ({
      id: idx,
      val,
      nextId: idx === initialArray.length - 1 ? null : idx + 1,
    }));

    const currentLinks: Record<number, number | null> = {};
    nodes.forEach(n => { currentLinks[n.id] = n.nextId; });

    let prev: number | null = null;
    let curr: number | null = 0;

    steps.push({
      nodes,
      pointers: { head: 0, prev, curr, nextTemp: null },
      links: { ...currentLinks },
      description: "Initialize prev = null, curr = head. We will traverse the list and reverse links.",
      codeLine: 3,
      problemType: "reverse",
    });

    while (curr !== null && nodes[curr]) {
      const nextTemp: number | null = nodes[curr].nextId;
      
      steps.push({
        nodes,
        pointers: { head: 0, prev, curr, nextTemp },
        links: { ...currentLinks },
        description: `Store the next node: nextTemp = ${nextTemp !== null && nodes[nextTemp] ? nodes[nextTemp].val : "null"}.`,
        codeLine: 5,
        problemType: "reverse",
      });

      // Reverse pointer
      currentLinks[curr] = prev;

      steps.push({
        nodes,
        pointers: { head: 0, prev, curr, nextTemp },
        links: { ...currentLinks },
        description: `Reverse link: set Node ${nodes[curr].val}'s next to point to prev (${prev !== null && nodes[prev] ? nodes[prev].val : "null"}).`,
        codeLine: 6,
        problemType: "reverse",
      });

      prev = curr;
      curr = nextTemp;

      steps.push({
        nodes,
        pointers: { head: prev, prev, curr, nextTemp: null },
        links: { ...currentLinks },
        description: `Advance pointers: prev = ${prev !== null && nodes[prev] ? nodes[prev].val : "null"}, curr = ${curr !== null && nodes[curr] ? nodes[curr].val : "null"}.`,
        codeLine: 8,
        problemType: "reverse",
      });
    }

    steps.push({
      nodes,
      pointers: { head: prev, prev, curr: null, nextTemp: null },
      links: { ...currentLinks },
      description: `Traversed all nodes. The reversed linked list head is now Node ${prev !== null && nodes[prev] ? nodes[prev].val : "null"}.`,
      codeLine: 10,
      problemType: "reverse",
    });

    return steps;
  }
}

export function LinkedListVisualizer({ step }: { step: LinkedListStep }) {
  return (
    <div className="flex flex-col items-center gap-10 w-full py-8">
      {/* Target Status Info Badge */}
      <div className="flex gap-4 mb-2 flex-wrap justify-center">
        {step.pointers && step.pointers.head !== null && step.nodes && step.nodes[step.pointers.head] && (
          <div className="bg-neoYellow border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm">
            Head Value: {step.nodes[step.pointers.head].val}
          </div>
        )}
        {step.problemType === "cycle" && step.cycleDetected !== undefined && (
          <div className={`border-4 border-black px-4 py-2 font-black text-sm uppercase rounded shadow-neo-sm ${
            step.cycleDetected ? "bg-neoGreen" : "bg-neoRed text-white"
          }`}>
            {step.cycleDetected ? "Cycle Found!" : "No Cycle"}
          </div>
        )}
      </div>

      {/* Nodes display */}
      <div className="flex flex-wrap items-center justify-center gap-y-12 select-none min-h-[160px] w-full max-w-2xl px-6">
        {(step.nodes || []).map((node) => {
          const isHead = (step.pointers || {}).head === node.id;
          const isSlow = (step.pointers || {}).slow === node.id;
          const isFast = (step.pointers || {}).fast === node.id;
          const isPrev = (step.pointers || {}).prev === node.id;
          const isCurr = (step.pointers || {}).curr === node.id;
          const isNextTemp = (step.pointers || {}).nextTemp === node.id;

          let highlightBg = "bg-white";
          if (step.problemType === "reverse") {
            if (isCurr) highlightBg = "bg-neoYellow";
            else if (isPrev) highlightBg = "bg-neoGreen";
            else if (isNextTemp) highlightBg = "bg-neoBlue";
          } else {
            if (isSlow && isFast) highlightBg = "bg-neoPurple text-white";
            else if (isSlow) highlightBg = "bg-neoBlue";
            else if (isFast) highlightBg = "bg-neoPink";
          }

          const targetId = (step.links || {})[node.id];
          const isDeleted = (node as any).deleted;
          
          return (
            <div key={node.id} className="relative flex items-center">
              {/* Pointer tags above the node */}
              <div className="absolute -top-11 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 z-10 w-32 justify-end h-10">
                {step.problemType === "reverse" ? (
                  <>
                    {isHead && <span className="bg-neoYellow border border-black px-1 rounded text-[7px] font-black uppercase">Head</span>}
                    {isPrev && <span className="bg-neoGreen border border-black px-1 rounded text-[7px] font-black uppercase">Prev</span>}
                    {isCurr && <span className="bg-neoYellow border border-black px-1 rounded text-[7px] font-black uppercase">Curr</span>}
                    {isNextTemp && <span className="bg-neoBlue border border-black px-1 rounded text-[7px] font-black uppercase">NextTemp</span>}
                  </>
                ) : (
                  <>
                    {isHead && <span className="bg-neoYellow border border-black px-1 rounded text-[7px] font-black uppercase">Head</span>}
                    {isSlow && <span className="bg-neoBlue border border-black px-1 rounded text-[7px] font-black uppercase">Slow (Tortoise)</span>}
                    {isFast && <span className="bg-neoPink border border-black px-1 rounded text-[7px] font-black uppercase">Fast (Hare)</span>}
                  </>
                )}
              </div>

              {/* The node circle */}
              <div className={`w-14 h-14 rounded-full border-4 border-black ${
                isDeleted ? "bg-gray-200 opacity-25 line-through decoration-red-500 decoration-4" : highlightBg
              } shadow-neo flex items-center justify-center font-black text-xl transition-all duration-300`}>
                {node.val}
              </div>

              {/* Arrow linking to next node */}
              {targetId !== null && targetId !== undefined && (
                <div className="flex items-center justify-center w-10 relative">
                  {/* Draw DLL bidirectional arrow, loopback arrow, or simple forward arrow */}
                  {step.problemType === "dll" ? (
                    <span className="text-2xl font-black text-neoPurple">⇄</span>
                  ) : targetId > node.id ? (
                    <span className="text-2xl font-black">➔</span>
                  ) : (
                    <div className="absolute -bottom-8 flex flex-col items-center z-0 w-32 border-2 border-black border-t-0 h-8 rounded-b-lg border-dashed">
                      <span className="text-xs font-black bg-white border border-black px-1 rounded -bottom-2 absolute">loop back</span>
                    </div>
                  )}
                </div>
              )}
              {(targetId === null || targetId === undefined) && (
                <div className="w-10 flex items-center justify-center">
                  <span className="text-[10px] font-black border-2 border-black bg-gray-200 px-1 py-0.5 rounded uppercase">null</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
