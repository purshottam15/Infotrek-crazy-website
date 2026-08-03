import { CheckCircle2, Timer } from "lucide-react";

function formatElapsed(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
}

export default function ScoreSummary({ elapsedSeconds, points, wasRecorded }) {
  return (
    <section className="border border-green-400/25 bg-green-400/5 p-6 text-white shadow-2xl shadow-green-950/20">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-green-300/40 bg-green-400/10 text-green-200">
          <CheckCircle2 size={24} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-green-200">
            Verification Complete
          </p>
          <h2 className="mt-2 text-3xl font-bold">Identity reluctantly accepted.</h2>
          <p className="mt-3 text-slate-300">
            The portal recorded your completion time and calculated the score.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="border border-slate-700 bg-slate-950/70 p-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Timer size={16} />
            <span className="text-xs uppercase tracking-[0.25em]">Time</span>
          </div>
          <p className="mt-2 font-mono text-2xl font-bold text-cyan-200">
            {formatElapsed(elapsedSeconds)}
          </p>
        </div>

        <div className="border border-slate-700 bg-slate-950/70 p-4">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
            Earned Score
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-300">+{points}</p>
        </div>
      </div>

      {!wasRecorded && (
        <p className="mt-4 text-sm text-slate-400">
          This completion was already recorded, so the total score was not duplicated.
        </p>
      )}
    </section>
  );
}
