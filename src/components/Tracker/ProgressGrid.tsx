"use client";

import React from "react";

interface ProgressGridProps {
  solvedMap: Record<string, { solved: boolean; date?: string }>;
}

// Helper to format YYYY-MM-DD to DD-MM-YYYY
const formatToDdMmYyyy = (dateStr: string) => {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

export default function ProgressGrid({ solvedMap }: ProgressGridProps) {
  // Use the current year to show a full-year calendar starting from January
  const currentYear = new Date().getFullYear();

  const weeks: string[][] = [];
  const monthStartIndices: number[] = [];

  // Generate calendar days grouped by month to start new months in a new column (LeetCode-style)
  for (let month = 0; month < 12; month++) {
    // Record the column index where this month starts
    monthStartIndices.push(weeks.length);

    // Number of days in the current month
    const daysInMonth = new Date(Date.UTC(currentYear, month + 1, 0)).getUTCDate();

    // Day of the week for the 1st of this month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(Date.UTC(currentYear, month, 1));
    const startDayOfWeek = firstDay.getUTCDay();

    const monthDays: string[] = [];

    // 1. Pad the beginning of the month with empty spaces to align day of week correctly
    for (let i = 0; i < startDayOfWeek; i++) {
      monthDays.push("");
    }

    // 2. Add the actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = `${currentYear}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      monthDays.push(dateString);
    }

    // 3. Pad the end of the month to complete the final week column for this month
    const remaining = monthDays.length % 7;
    if (remaining !== 0) {
      const padding = 7 - remaining;
      for (let i = 0; i < padding; i++) {
        monthDays.push("");
      }
    }

    // 4. Split monthDays into week columns of 7 days
    for (let i = 0; i < monthDays.length; i += 7) {
      weeks.push(monthDays.slice(i, i + 7));
    }
  }

  // Get month label for each column header
  const getMonthLabel = (index: number) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIdx = monthStartIndices.indexOf(index);
    if (monthIdx !== -1) {
      return monthNames[monthIdx];
    }
    return "";
  };

  // Calculate occurrences of solved questions grouped by date
  const dateCounts: Record<string, number> = {};
  Object.values(solvedMap).forEach((item) => {
    if (item.solved && item.date) {
      dateCounts[item.date] = (dateCounts[item.date] || 0) + 1;
    }
  });

  const getColorClass = (count: number) => {
    if (!count) return "bg-[#ebedf0] hover:bg-[#dcdfe4]";
    if (count === 1) return "bg-[#9be9a8] hover:bg-[#82d690]";
    if (count === 2) return "bg-[#40c463] hover:bg-[#34b254]";
    if (count === 3) return "bg-[#30a14e] hover:bg-[#258a40]";
    return "bg-[#216e39] hover:bg-[#1a5a2e]";
  };

  return (
    <div className="bg-white border-4 border-black p-4 rounded-xl shadow-neo w-full select-none">
      {/* Calendar Header with Year */}
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-black uppercase text-gray-500">
          Activity Calendar
        </span>
        <span className="bg-black text-white text-xs font-black px-2 py-0.5 rounded shadow-neo-sm">
          {currentYear}
        </span>
      </div>

      <div className="overflow-x-auto scrollbar-none w-full">
        <div className="min-w-max pb-1 flex flex-col">
          {/* Top Row: Month Labels aligned with week columns */}
          <div className="flex mb-1.5 items-end h-4">
            <div className="w-6 shrink-0 mr-1 h-4" />
            <div className="flex gap-1 h-4">
              {weeks.map((_, idx) => {
                const label = getMonthLabel(idx);
                return (
                  <div key={idx} className="w-3 h-4 flex-shrink-0 relative">
                    {label && (
                      <span className="absolute bottom-0 left-0 text-[9px] font-black text-gray-400 uppercase tracking-wider whitespace-nowrap">
                        {label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-start">
            {/* Day-of-week Labels column on left */}
            <div className="grid grid-rows-7 gap-1 text-[9px] font-black text-gray-400 uppercase w-6 select-none shrink-0 mr-1">
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Mon</div>
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Wed</div>
              <div className="h-3 flex items-center"></div>
              <div className="h-3 flex items-center">Fri</div>
              <div className="h-3 flex items-center"></div>
            </div>

            {/* Calendar Grid cells by week column */}
            <div className="flex gap-1">
              {weeks.map((week, weekIdx) => {
                return (
                  <div key={weekIdx} className="grid grid-rows-7 gap-1">
                    {week.map((dateStr, dayIdx) => {
                      // If it's an empty padding day (month boundary alignment spacer)
                      if (!dateStr) {
                        return (
                          <div
                            key={`empty-${weekIdx}-${dayIdx}`}
                            className="w-3 h-3 rounded-[2px] bg-gray-100/30 select-none pointer-events-none"
                          />
                        );
                      }

                      const count = dateCounts[dateStr] || 0;
                      const isTopRow = dayIdx < 2;

                      return (
                        <div
                          key={dateStr}
                          className={`w-3 h-3 rounded-[2px] cursor-pointer relative group transition-all hover:scale-125 hover:z-50 ${getColorClass(
                            count
                          )}`}
                        >
                          {/* Custom pop-up tooltips (flip to top/bottom depending on row index) */}
                          <div
                            className={`absolute left-1/2 transform -translate-x-1/2 hidden group-hover:block z-30 pointer-events-none ${
                              isTopRow ? "top-full mt-2" : "bottom-full mb-2"
                            }`}
                          >
                            <div className="bg-black text-white text-[9px] font-extrabold px-2 py-0.5 rounded border border-white whitespace-nowrap shadow-neo-sm">
                              {formatToDdMmYyyy(dateStr)}: {count} solved
                            </div>
                          </div>
                        </div>
                      );
                    })}
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
