import { useCallback, useEffect, useRef, useState } from "react";

const HOLD_MS = 2000;

export default function HoldButton({ completed, onComplete }) {
  const [progress, setProgress] = useState(completed ? 100 : 0);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const cancelHold = useCallback(() => {
    if (!timeoutRef.current || completed) {
      return;
    }

    clearTimers();
    setProgress(0);
  }, [clearTimers, completed]);

  const beginHold = useCallback(() => {
    if (completed || timeoutRef.current) {
      return;
    }

    const startedAt = Date.now();
    setProgress(1);

    intervalRef.current = setInterval(() => {
      const nextProgress = Math.min(99, ((Date.now() - startedAt) / HOLD_MS) * 100);
      setProgress(nextProgress);
    }, 50);

    timeoutRef.current = setTimeout(() => {
      clearTimers();
      setProgress(100);
      onComplete();
    }, HOLD_MS);
  }, [clearTimers, completed, onComplete]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <button
      type="button"
      onPointerDown={beginHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onPointerCancel={cancelHold}
      className="relative min-h-14 w-full overflow-hidden border border-cyan-500/25 bg-slate-950 px-6 py-4 text-lg font-bold text-cyan-100 transition hover:border-cyan-300/60"
    >
      <span
        className="absolute inset-y-0 left-0 bg-cyan-400/20 transition-[width]"
        style={{ width: `${progress}%` }}
      />
      <span className="relative">{completed ? "Held" : "Continue"}</span>
    </button>
  );
}
