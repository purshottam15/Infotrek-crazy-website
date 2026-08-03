import { useMemo } from "react";

const DISPLAY_STEPS = [7, 18, 36, 50, 43, 61, 57, 74, 69, 82, 94];

export default function FakeProgressBar({ actualProgress, onHover }) {
  const displayProgress = useMemo(() => {
    const index = Math.min(
      DISPLAY_STEPS.length - 1,
      Math.floor((actualProgress / 100) * DISPLAY_STEPS.length)
    );

    return DISPLAY_STEPS[index];
  }, [actualProgress]);

  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onFocus={onHover}
      className="w-full border border-cyan-500/20 bg-slate-950/70 p-4 text-left"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-400">
        <span>Request Progress</span>
        <span className="font-mono text-cyan-200">{displayProgress}%</span>
      </div>

      <div className="mt-3 h-2 overflow-hidden bg-slate-800">
        <div
          className="h-full bg-cyan-300 transition-[width] duration-500"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </button>
  );
}
