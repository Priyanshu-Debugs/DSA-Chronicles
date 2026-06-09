"use client";

import React from "react";

interface ProgressGridProps {
  solvedMap: Record<string, { solved: boolean; date?: string }>;
}

export default function ProgressGrid({ solvedMap }: ProgressGridProps) {
  // Generate tracking days: exactly 53 weeks (371 days) aligned to Sunday (full year)
  const columns = 53;
  const totalDays = columns * 7;

  // Find the current UTC date to avoid timezone offset discrepancies
  const now = new Date();
  const utcToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  
  // Get UTC day of week: 0 (Sun) to 6 (Sat)
  const currentUTCDayOfWeek = utcToday.getUTCDay();
  const daysUntilSaturday = 6 - currentUTCDayOfWeek;
  
  const utcEndDate = new Date(utcToday);
  utcEndDate.setUTCDate(utcToday.getUTCDate() + daysUntilSaturday);
  
  const utcStartDate = new Date(utcEndDate);
  utcStartDate.setUTCDate(utcEndDate.getUTCDate() - totalDays + 1);

  const daysArray = Array.from({ length: totalDays }).map((_, idx) => {
    const d = new Date(utcStartDate);
    d.setUTCDate(utcStartDate.getUTCDate() + idx);
    return d.toISOString().split("T")[0];
  });

  // Calculate occurrences of solved questions grouped by date
  const dateCounts: Record<string, number> = {};
  Object.values(solvedMap).forEach((item) => {
    if (item.solved && item.date) {
      dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
    }
  });

  // Split days into weeks arrays of size 7
  const weeks: string[][] = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    weeks.push(daysArray.slice(i, i + 7));
  }

  // Get month label for each column header
  const getMonthLabel = (weekDays: string[], index: number) => {
    const date = new Date(weekDays[0]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[date.getMonth()];

    // Show label if first column or if month changes from the previous week
    if (index === 0) return month;
    const prevDate = new Date(weeks[index - 1][0]);
    if (date.getMonth() !== prevDate.getMonth()) {
      return month;
    }
    return "";
  };

  const getColorClass = (count: number) => {
    if (!count) return "bg-[#ebedf0] hover:bg-[#dcdfe4]";
    if (count === 1) return "bg-[#9be9a8] hover:bg-[#82d690]";
    if (count === 2) return "bg-[#40c463] hover:bg-[#34b254]";
    if (count === 3) return "bg-[#30a14e] hover:bg-[#258a40]";
    return "bg-[#216e39] hover:bg-[#1a5a2e]";
  };

  return (
    <div className="bg-white border-4 border-black p-4 rounded-xl shadow-neo w-full select-none">
      <div className="overflow-x-auto scrollbar-none w-full">
        <div className="min-w-max pb-1 flex flex-col">
          {/* Top Row: Spacer + Month Labels */}
          <div className="flex mb-1.5">
            <div className="w-6 shrink-0" />
            <div className="relative h-3 w-full">
              {weeks.map((week, idx) => {
                const label = getMonthLabel(week, idx);
                if (!label) return null;
                return (
                  <div
                    key={idx}
                    className="absolute text-[9px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    style={{ left: `${idx * 16}px` }}
                  >
                    {label}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start">
            {/* Day-of-week Labels column on left */}
            <div className="grid grid-rows-7 gap-1 text-[9px] font-black text-gray-400 uppercase w-6 select-none shrink-0">
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Mon</div>
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Wed</div>
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Fri</div>
              <div className="h-3 flex items-center"></div>
            </div>

            {/* Calendar Grid cells */}
            <div className="grid grid-flow-col grid-rows-7 gap-1">
              {daysArray.map((dateStr) => {
                const count = dateCounts[dateStr] || 0;
                return (
                  <div
                    key={dateStr}
                    className={`w-3 h-3 rounded-[2px] cursor-pointer relative group transition-all hover:scale-125 ${getColorClass(
                      count
                    )}`}
                  >
                    {/* Custom pop-up tooltips */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-30 pointer-events-none">
                      <div className="bg-black text-white text-[9px] font-extrabold px-2 py-0.5 rounded border border-white whitespace-nowrap shadow-neo-sm">
                        {dateStr}: {count} solved
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Legend Scale */}
      <div className="flex items-center space-x-2 text-[10px] font-black uppercase mt-4 text-gray-500 pl-6">
        <span>Less</span>
        <span className="w-3 h-3 bg-[#ebedf0] rounded-[2px]" />
        <span className="w-3 h-3 bg-[#9be9a8] rounded-[2px]" />
        <span className="w-3 h-3 bg-[#40c463] rounded-[2px]" />
        <span className="w-3 h-3 bg-[#30a14e] rounded-[2px]" />
        <span className="w-3 h-3 bg-[#216e39] rounded-[2px]" />
        <span>More</span>
      </div>
    </div>
  );
}

