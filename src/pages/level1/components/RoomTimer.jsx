import { Clock3 } from "lucide-react";

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function RoomTimer({ remainingSeconds }) {
  return (
    <div className="flex min-h-14 items-center gap-3 border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-lg shadow-cyan-950/10">
      <Clock3 size={18} className="text-cyan-300" />
      <span>
        <span className="block text-xs uppercase tracking-[0.25em] text-slate-400">
          Room Timer
        </span>
        <span className="block font-mono text-lg font-bold text-cyan-200">
          {formatTime(remainingSeconds)}
        </span>
      </span>
    </div>
  );
}
