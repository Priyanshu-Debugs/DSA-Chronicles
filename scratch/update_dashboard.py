with open("src/components/Dashboard/DsaDashboard.tsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add dashboardTopics interface and array
target_decl = "export default function DsaDashboard({ stepIdFilter }: DsaDashboardProps) {"
insertion_decl = """interface DashboardTopic {
  name: string;
  href: string;
  stepIds: string[];
  color: string;
  icon: string;
}

const dashboardTopics: DashboardTopic[] = [
  { name: "Arrays", href: "/arrays", stepIds: ["step-1"], color: "bg-neoPink", icon: "ti ti-list-numbers" },
  { name: "Binary Search", href: "/binary-search", stepIds: ["step-2"], color: "bg-neoBlue", icon: "ti ti-binary" },
  { name: "Strings", href: "/strings", stepIds: ["step-3", "step-7"], color: "bg-neoYellow", icon: "ti ti-abc" },
  { name: "Linked List", href: "/linked-list", stepIds: ["step-4"], color: "bg-neoGreen", icon: "ti ti-dots-vertical" },
  { name: "Recursion", href: "/recursion", stepIds: ["step-5"], color: "bg-neoPurple", icon: "ti ti-refresh" },
  { name: "Two Pointers", href: "/two-pointers", stepIds: ["step-6"], color: "bg-neoRed", icon: "ti ti-arrows-left-right" },
  { name: "Bit Manipulation", href: "/bit-manipulation", stepIds: ["step-8"], color: "bg-neoYellow", icon: "ti ti-cpu" },
  { name: "Stack & Queue", href: "/stack-n-queue", stepIds: ["step-9"], color: "bg-neoGreen", icon: "ti ti-layers-difference" },
  { name: "Heaps", href: "/heaps", stepIds: ["step-10"], color: "bg-neoPink", icon: "ti ti-binary-tree-2" },
  { name: "Greedy", href: "/greedy", stepIds: ["step-11"], color: "bg-neoBlue", icon: "ti ti-coins" },
  { name: "Binary Tree", href: "/binary-tree", stepIds: ["step-12"], color: "bg-neoPurple", icon: "ti ti-git-fork" },
  { name: "Binary Search Tree", href: "/binary-search-tree", stepIds: ["step-13"], color: "bg-neoRed", icon: "ti ti-binary-tree" },
  { name: "Graphs", href: "/graphs", stepIds: ["step-14"], color: "bg-neoYellow", icon: "ti ti-network" },
  { name: "DP", href: "/dp", stepIds: ["step-15"], color: "bg-neoGreen", icon: "ti ti-subtask" },
  { name: "Tries", href: "/tries", stepIds: ["step-16"], color: "bg-neoPink", icon: "ti ti-hierarchy" },
];

"""

if target_decl in content and "dashboardTopics" not in content:
    content = content.replace(target_decl, insertion_decl + target_decl)
    print("Inserted dashboardTopics array configuration.")
else:
    print("dashboardTopics configuration already present or target not found.")

# 2. Add getTopicStats helper function
target_helper = """  const formatTimestamp = (timestampStr: string) => {
    const ts = parseInt(timestampStr);
    if (isNaN(ts)) return "";
    const date = new Date(ts * 1000);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };"""

insertion_helper = """

  const getTopicStats = (stepIds: string[]) => {
    const steps = a2zDsaSheetData.filter((step) => stepIds.includes(step.stepId));
    let total = 0;
    let solved = 0;
    steps.forEach((step) => {
      step.lessons.forEach((l) => {
        l.topics.forEach((t) => {
          t.problems.forEach((p) => {
            total += 1;
            if (solvedMap[p.id]?.solved) {
              solved += 1;
            }
          });
        });
      });
    });
    const percent = total > 0 ? Math.round((solved / total) * 100) : 0;
    return { total, solved, percent };
  };"""

if target_helper in content and "getTopicStats" not in content:
    content = content.replace(target_helper, target_helper + insertion_helper)
    print("Inserted getTopicStats helper function.")
else:
    print("getTopicStats helper function already present or target not found.")

# 3. Replace the accordion section with the conditional Grid / Accordion
start_tag = "      {/* Main Track Accordion */}"
if start_tag in content:
    start_idx = content.find(start_tag)
    end_tag = "</section>"
    # We want to find the closing </section> of the main track accordion
    end_idx = content.find(end_tag, start_idx) + len(end_tag)
    
    target_accordion = content[start_idx:end_idx]
    
    replacement_grid_accordion = """      {/* Main Track Grid or Accordion based on filter */}
      {!stepIdFilter ? (
        /* Dashboard Grid of Topics */
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b-4 border-black pb-2">
            <h2 className="text-2xl md:text-3xl font-black uppercase flex items-center gap-2 text-black">
              🗺️ DSA Topics Roadmap
            </h2>
            <span className="bg-neoYellow border-2 border-black font-black text-xs px-2.5 py-1 uppercase shadow-neo-sm text-black">
              15 Topics Total
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardTopics.map((topic) => {
              const stats = getTopicStats(topic.stepIds);
              return (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="bg-white border-4 border-black p-5 rounded-xl shadow-neo hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-md active:translate-x-0 active:translate-y-0 active:shadow-neo transition-all flex flex-col justify-between h-44 group select-none cursor-pointer"
                >
                  <div>
                    {/* Topic Header Card */}
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`${topic.color} text-black border-2 border-black w-10 h-10 rounded-lg flex items-center justify-center font-black shadow-neo-sm transform -rotate-3 group-hover:rotate-0 transition-transform`}>
                          <i className={`${topic.icon} text-lg`} />
                        </div>
                        <h3 className="font-black text-base md:text-lg uppercase group-hover:underline text-black">
                          {topic.name}
                        </h3>
                      </div>
                      <span className="text-[10px] font-black uppercase text-gray-400 bg-gray-100 border border-gray-300 px-2 py-0.5 rounded shrink-0">
                        {topic.stepIds.map(s => s.replace("step-", "S")).join(" & ")}
                      </span>
                    </div>

                    {/* Solved Progress Counter */}
                    <div className="mt-4 flex justify-between items-center text-xs font-black text-gray-500 uppercase">
                      <span>Progress</span>
                      <span className="text-black font-black">
                        {stats.solved} / {stats.total} Solved
                      </span>
                    </div>
                  </div>

                  {/* Neubrutalist Progress bar */}
                  <div className="mt-3 space-y-1">
                    <div className="w-full bg-stone-100 border-2 border-black h-4 rounded-md overflow-hidden relative">
                      <div
                        className={`${topic.color} h-full border-r-2 border-black transition-all duration-300`}
                        style={{ width: `${stats.percent}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-extrabold text-black uppercase">
                      <span>{stats.percent}% Complete</span>
                      <span className="text-neoPurple font-black group-hover:translate-x-1 transition-transform inline-flex items-center gap-0.5">
                        Start <i className="ti ti-arrow-right font-black" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      ) : (
        /* Main Track Accordion for Topic-Specific Pages */
        <section className="space-y-4">
          {filteredSteps.map((step) => {
            const isOpened = activeStepId === step.stepId;
            return (
              <div
                key={step.stepId}
                className="border-4 border-black shadow-neo rounded-xl bg-white overflow-hidden"
              >
                {/* Step Header Toggle */}
                <button
                  onClick={() => setActiveStepId(isOpened ? null : step.stepId)}
                  className="w-full text-left bg-neoPink p-4 md:p-5 font-black text-lg md:text-2xl uppercase border-b-4 border-black flex justify-between items-center neo-clickable cursor-pointer text-black"
                >
                  <span>{step.stepTitle}</span>
                  <span className="text-xl md:text-2xl">{isOpened ? "▲" : "▼"}</span>
                </button>

                {/* Accordion Content */}
                {isOpened && (
                  <div className="p-4 md:p-6 space-y-6 bg-neoCream">
                    {step.lessons.map((lesson) => (
                      <div key={lesson.lessonId} className="space-y-4">
                        <h3 className="text-lg md:text-xl font-extrabold border-b-2 border-black pb-1 uppercase tracking-wide text-black">
                          {lesson.lessonTitle}
                        </h3>

                        {lesson.topics.map((topic) => (
                          <div
                            key={topic.topicId}
                            className="bg-white border-2 border-black p-4 rounded-lg shadow-neo space-y-3"
                          >
                            <h4 className="font-black text-md text-gray-700 uppercase text-black">
                              {topic.topicTitle}
                            </h4>

                            {/* Problems List */}
                            <div className="overflow-x-auto">
                              <table className="w-full text-left border-collapse min-w-[500px]">
                                <thead>
                                  <tr className="border-b-2 border-black text-xs font-black uppercase tracking-wider text-gray-500">
                                    <th className="py-2 px-3 w-16">Done</th>
                                    <th className="py-2 px-3">Problem Name</th>
                                    <th className="py-2 px-3 w-24 text-center">Visual</th>
                                    <th className="py-2 px-3 w-40 text-center">Practice</th>
                                    <th className="py-2 px-3 w-20 text-center">Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {topic.problems.map((problem) => {
                                    const isSolved = !!solvedMap[problem.id]?.solved;
                                    const hasNote = !!notesMap[problem.id];
                                    return (
                                      <tr
                                        key={problem.id}
                                        className={`border-b border-gray-300 hover:bg-yellow-50 transition-colors ${
                                          isSolved ? "bg-green-50/50" : ""
                                        }`}
                                      >
                                        {/* Status Toggle Box */}
                                        <td className="py-3 px-3">
                                          <button
                                            onClick={() => toggleSolved(problem.id)}
                                            className={`w-6 h-6 border-2 border-black flex items-center justify-center font-bold text-xs neo-clickable cursor-pointer transition-all ${
                                              isSolved
                                                ? "bg-neoGreen shadow-none text-black"
                                                : "bg-white shadow-neo-sm hover:bg-gray-100 text-black"
                                            }`}
                                          >
                                            {isSolved ? "✓" : ""}
                                          </button>
                                        </td>

                                        {/* Name */}
                                        <td className="py-3 px-3">
                                          <span
                                            className={`font-bold text-sm md:text-base ${
                                              isSolved ? "line-through text-gray-400" : "text-black"
                                            }`}
                                          >
                                            {problem.name}
                                          </span>
                                        </td>

                                        {/* Visualizer play button */}
                                        <td className="py-3 px-3 text-center">
                                          <button
                                            onClick={() => setVisualizingProblem(problem)}
                                            className="px-3 py-1 bg-neoYellow border-2 border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer inline-block text-black"
                                          >
                                            🎬 Play
                                          </button>
                                        </td>

                                        {/* External Practice Portals */}
                                        <td className="py-3 px-3 text-center">
                                          <div className="flex justify-center space-x-2">
                                            {problem.leetcodeUrl ? (
                                              <a
                                                href={problem.leetcodeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-yellow-400 border border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 neo-clickable inline-block text-black"
                                              >
                                                LeetCode
                                              </a>
                                            ) : (
                                              <span className="px-3 py-1 bg-gray-200 border border-gray-400 font-extrabold text-xs text-gray-400 inline-block cursor-not-allowed">
                                                LeetCode
                                              </span>
                                            )}
                                            {problem.gfgUrl ? (
                                              <a
                                                href={problem.gfgUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1 bg-green-400 border border-black font-extrabold text-xs shadow-neo-sm hover:-translate-y-0.5 neo-clickable inline-block text-black"
                                              >
                                                GFG
                                              </a>
                                            ) : (
                                              <span className="px-3 py-1 bg-gray-200 border border-gray-400 font-extrabold text-xs text-gray-400 inline-block cursor-not-allowed">
                                                GFG
                                              </span>
                                            )}
                                          </div>
                                        </td>

                                        {/* Custom Notes Toggle */}
                                        <td className="py-3 px-3 text-center">
                                          <button
                                            onClick={() => setEditingProblem(problem)}
                                            className={`py-1 px-3 border-2 border-black rounded font-black text-xs transition-all neo-clickable cursor-pointer uppercase ${
                                              hasNote ? "bg-neoPurple text-white shadow-none" : "bg-white text-black hover:bg-gray-100 shadow-neo-sm"
                                            }`}
                                            title="View/Add Notes"
                                          >
                                            {hasNote ? "Edit Note" : "Add Note"}
                                          </button>
                                        </td>
                                      </tr>
                                    );
                                  })}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </section>
      )"""
    
    content = content.replace(target_accordion, replacement_grid_accordion)
    print("Replaced main track accordion with conditional Grid/Accordion.")
else:
    print("Main track accordion not found.")

with open("src/components/Dashboard/DsaDashboard.tsx", "w", encoding="utf-8") as f:
    f.write(content)

print("Finished updating DsaDashboard.tsx!")
