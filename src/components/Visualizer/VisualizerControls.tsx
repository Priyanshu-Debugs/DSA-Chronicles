import React from "react";

interface VisualizerControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSkipToEnd: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  onSliderChange: (step: number) => void;
}

export default function VisualizerControls({
  currentStep,
  totalSteps,
  isPlaying,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSkipToEnd,
  speed,
  onSpeedChange,
  onSliderChange,
}: VisualizerControlsProps) {
  // Translate speed delay (ms) into readable speed text
  const speedLabel =
    speed === 1500
      ? "0.5x"
      : speed === 1000
      ? "1.0x"
      : speed === 500
      ? "1.5x"
      : speed === 250
      ? "2.0x"
      : "Custom";

  const handleSpeedToggle = () => {
    if (speed === 1500) onSpeedChange(1000);
    else if (speed === 1000) onSpeedChange(500);
    else if (speed === 500) onSpeedChange(250);
    else onSpeedChange(1500);
  };

  return (
    <div className="bg-white border-4 border-black p-4 rounded-xl shadow-neo flex flex-col md:flex-row items-center justify-between gap-4 w-full">
      {/* Progress & Drag Bar */}
      <div className="flex flex-col w-full md:max-w-xs gap-1">
        <div className="flex justify-between font-black text-xs uppercase tracking-wider text-gray-700">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(((currentStep + 1) / totalSteps) * 100)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max={totalSteps - 1}
          value={currentStep}
          onChange={(e) => onSliderChange(parseInt(e.target.value))}
          className="w-full accent-black cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none border border-black"
        />
      </div>

      {/* Button Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={onReset}
          disabled={currentStep === 0}
          className="w-10 h-10 bg-neoPink border-2 border-black flex items-center justify-center font-black shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none cursor-pointer"
          title="Reset"
        >
          ⏮
        </button>
        <button
          onClick={onStepBackward}
          disabled={currentStep === 0}
          className="w-10 h-10 bg-neoBlue border-2 border-black flex items-center justify-center font-black shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none cursor-pointer"
          title="Step Backward"
        >
          ◀
        </button>
        <button
          onClick={onPlayPause}
          className={`w-12 h-12 ${
            isPlaying ? "bg-neoRed" : "bg-neoGreen"
          } border-2 border-black flex items-center justify-center font-black text-lg shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer`}
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          onClick={onStepForward}
          disabled={currentStep === totalSteps - 1}
          className="w-10 h-10 bg-neoBlue border-2 border-black flex items-center justify-center font-black shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none cursor-pointer"
          title="Step Forward"
        >
          ▶
        </button>
        <button
          onClick={onSkipToEnd}
          disabled={currentStep === totalSteps - 1}
          className="w-10 h-10 bg-neoPink border-2 border-black flex items-center justify-center font-black shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none cursor-pointer"
          title="Skip to End"
        >
          ⏭
        </button>
      </div>

      {/* Speed Setting Toggle */}
      <button
        onClick={handleSpeedToggle}
        className="px-4 py-2 bg-neoYellow border-2 border-black font-black text-xs uppercase shadow-neo-sm hover:-translate-y-0.5 active:translate-y-0.5 neo-clickable cursor-pointer flex items-center gap-1.5 shrink-0"
      >
        <span>Speed:</span>
        <span className="bg-black text-neoYellow px-1.5 py-0.5 rounded text-[10px]">
          {speedLabel}
        </span>
      </button>
    </div>
  );
}
