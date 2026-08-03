import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Archive as ArchiveIcon } from "lucide-react";
import useGameStore from "../../store/gameStore";
import DiscoveryToast from "./components/DiscoveryToast";

export default function Archive() {
  const navigate = useNavigate();
  const discover = useGameStore((state) => state.discover);
  const [countdown, setCountdown] = useState(20);
  const [toast, setToast] = useState(null);
  const returnTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);

  const closeToast = useCallback(() => setToast(null), []);

  const returnToRoom = useCallback((delay = 0) => {
    clearTimeout(returnTimerRef.current);
    returnTimerRef.current = setTimeout(() => {
      navigate("/surface/actual", { replace: true });
    }, delay);
  }, [navigate]);

  const discoverArchive = () => {
    const isNew = discover("hidden-archive", 40);

    if (isNew) {
      setToast({
        id: `hidden-archive-${Date.now()}`,
        points: 40,
        message: "Hidden Archive Discovered.",
      });
      returnToRoom(1400);
      return;
    }

    returnToRoom(500);
  };

  useEffect(() => {
    countdownTimerRef.current = setInterval(() => {
      setCountdown((current) => Math.max(0, current - 1));
    }, 1000);

    returnToRoom(20000);

    return () => {
      clearInterval(countdownTimerRef.current);
      clearTimeout(returnTimerRef.current);
    };
  }, [returnToRoom]);

  return (
    <div className="relative min-h-[calc(100vh-5rem)] overflow-hidden bg-[#04111f] px-4 py-14 text-white">
      <div className="pointer-events-none absolute inset-0 [background:linear-gradient(180deg,rgba(34,211,238,0.10),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.16),transparent_30%)]" />

      <DiscoveryToast toast={toast} onClose={closeToast} />

      <main className="relative mx-auto max-w-3xl border border-cyan-400/25 bg-slate-950/80 p-8 shadow-2xl shadow-cyan-950/30">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center border border-cyan-300/40 bg-cyan-400/10 text-cyan-200">
            <ArchiveIcon size={24} />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Secret Area
            </p>
            <h1 className="mt-2 text-3xl font-bold">You were not expected here.</h1>
          </div>
        </div>

        <p className="mt-8 text-lg leading-8 text-slate-300">
          This archive records every participant who noticed the{" "}
          <button
            type="button"
            onClick={discoverArchive}
            className="text-cyan-200 underline decoration-cyan-400/30 underline-offset-4 transition hover:text-white hover:decoration-cyan-200"
          >
            expected
          </button>{" "}
          path and then questioned it.
        </p>

        <div className="mt-10 border border-cyan-500/20 bg-cyan-400/5 p-5">
          <p className="text-sm uppercase tracking-[0.25em] text-slate-400">
            Returning in {countdown} seconds...
          </p>
          <div className="mt-4 h-2 overflow-hidden bg-slate-800">
            <div
              className="h-full bg-cyan-300 transition-all duration-1000"
              style={{ width: `${(countdown / 20) * 100}%` }}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
