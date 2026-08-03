import { Search } from "lucide-react";

export default function DiscoveryCounter({ found, total, onClaim }) {
  return (
    <button
      type="button"
      onClick={onClaim}
      className="group flex min-h-14 items-center gap-3 border border-cyan-500/25 bg-slate-900/80 px-4 py-3 text-left text-white shadow-lg shadow-cyan-950/10 transition hover:border-cyan-300/60 hover:bg-cyan-500/10"
    >
      <Search size={18} className="text-cyan-300" />
      <span>
        <span className="block text-xs uppercase tracking-[0.25em] text-slate-400">
          Discoveries Found
        </span>
        <span className="block text-lg font-bold text-cyan-200">
          {found} / {total}
        </span>
      </span>
    </button>
  );
}
