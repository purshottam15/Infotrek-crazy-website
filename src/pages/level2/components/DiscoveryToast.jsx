import { useEffect } from "react";
import { Sparkles } from "lucide-react";

export default function DiscoveryToast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = setTimeout(onClose, 3200);
    return () => clearTimeout(timer);
  }, [onClose, toast]);

  if (!toast) {
    return null;
  }

  return (
    <div className="fixed right-4 top-24 z-[80] w-[min(22rem,calc(100vw-2rem))] border border-cyan-400/40 bg-slate-950/95 p-4 text-white shadow-2xl shadow-cyan-950/40 backdrop-blur animate-[level2Toast_240ms_ease-out]">
      <style>
        {`
          @keyframes level2Toast {
            from {
              opacity: 0;
              transform: translateX(18px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-cyan-400/40 bg-cyan-400/10 text-cyan-300">
          <Sparkles size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Discovery Found
          </p>
          <p className="mt-1 text-lg font-bold text-white">+{toast.points}</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">
            {toast.message}
          </p>
        </div>
      </div>
    </div>
  );
}
