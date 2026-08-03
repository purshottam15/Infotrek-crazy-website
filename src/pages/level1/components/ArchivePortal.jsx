import { DoorOpen } from "lucide-react";

export default function ArchivePortal({ onEnter }) {
  return (
    <button
      type="button"
      onClick={onEnter}
      className="group relative w-full overflow-hidden border border-cyan-300/30 bg-cyan-400/5 px-5 py-8 text-left shadow-2xl shadow-cyan-950/30 transition hover:border-cyan-200/80 hover:bg-cyan-300/10"
    >
      <span className="absolute inset-x-8 top-0 h-px bg-cyan-200/70" />
      <span className="flex items-center gap-4">
        <DoorOpen size={28} className="text-cyan-200 transition group-hover:scale-110" />
        <span>
          <span className="block text-xs uppercase tracking-[0.35em] text-cyan-300">
            Archive Signal
          </span>
          <span className="mt-2 block text-sm text-slate-300">
            A quiet cyan opening waits where the footer used to be certain.
          </span>
        </span>
      </span>
    </button>
  );
}
