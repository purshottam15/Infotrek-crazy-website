import { RadioTower } from "lucide-react";

export default function AnomalyToggle({ enabled, onToggle }) {
  return (
    <div className="border border-cyan-500/20 bg-slate-950/80 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <RadioTower size={20} className={enabled ? "text-cyan-200" : "text-slate-400"} />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {enabled ? "ANOMALY MODE ENABLED" : "NORMAL MODE"}
            </p>
            <p className="mt-1 text-sm text-slate-300">
              {enabled ? "The surface is no longer stable." : "All systems report ordinary behavior."}
            </p>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          onClick={() => onToggle(!enabled)}
          className={`relative h-8 w-16 shrink-0 border transition ${
            enabled
              ? "border-cyan-300 bg-cyan-400/30"
              : "border-slate-600 bg-slate-800"
          }`}
        >
          <span
            className={`absolute top-1 h-6 w-6 bg-white transition ${
              enabled ? "left-9 shadow-lg shadow-cyan-300/40" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
