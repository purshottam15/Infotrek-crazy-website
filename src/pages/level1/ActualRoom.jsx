import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, ScanLine } from "lucide-react";
import useGameStore from "../../store/gameStore";
import AnomalyToggle from "./components/AnomalyToggle";
import ArchivePortal from "./components/ArchivePortal";
import DiscoveryCounter from "./components/DiscoveryCounter";
import DiscoveryToast from "./components/DiscoveryToast";
import HoldButton from "./components/HoldButton";
import MovingMessage from "./components/MovingMessage";
import RoomTimer from "./components/RoomTimer";
import VerificationPuzzle from "./components/VerificationPuzzle";
import useRoomTimer from "./hooks/useRoomTimer";

const ROOM_DISCOVERIES = [
  "lying-counter",
  "hold-button",
  "moving-message",
  "anomaly-mode",
  "verification-puzzle",
  "archive-route",
];

export default function ActualRoom() {
  const navigate = useNavigate();
  const remainingSeconds = useRoomTimer(360);
  const discoveries = useGameStore((state) => state.discoveries || []);
  const discover = useGameStore((state) => state.discover);
  const [toast, setToast] = useState(null);
  const [anomalyMode, setAnomalyMode] = useState(() => {
    return (
      localStorage.getItem("infotrek-level1-anomaly") === "true" ||
      discoveries.includes("anomaly-mode")
    );
  });
  const portalTimerRef = useRef(null);

  const foundCount = useMemo(() => {
    return ROOM_DISCOVERIES.filter((id) => discoveries.includes(id)).length;
  }, [discoveries]);

  const hasDiscovery = useCallback(
    (id) => discoveries.includes(id),
    [discoveries]
  );

  const closeToast = useCallback(() => setToast(null), []);

  const claimDiscovery = useCallback(
    (id, points, message) => {
      const isNew = discover(id, points);

      if (isNew) {
        setToast({
          id: `${id}-${Date.now()}`,
          points,
          message,
        });
      }

      return isNew;
    },
    [discover]
  );

  const handleAnomalyToggle = (enabled) => {
    setAnomalyMode(enabled);
    localStorage.setItem("infotrek-level1-anomaly", String(enabled));

    if (enabled) {
      claimDiscovery("anomaly-mode", 20, "Reality has shifted.");
    }
  };

  const enterArchive = () => {
    claimDiscovery("archive-route", 15, "The archive noticed you.");
    portalTimerRef.current = setTimeout(() => {
      navigate("/surface/archive");
    }, 700);
  };

  useEffect(() => {
    return () => clearTimeout(portalTimerRef.current);
  }, []);

  return (
    <div
      className={`relative min-h-[calc(100vh-5rem)] overflow-hidden text-white transition-colors duration-500 ${
        anomalyMode ? "bg-[#061827]" : "bg-slate-950"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          anomalyMode
            ? "opacity-100 [background:radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.20),transparent_28%),linear-gradient(135deg,rgba(14,165,233,0.12),transparent_45%)]"
            : "opacity-70 [background:radial-gradient(circle_at_20%_0%,rgba(8,145,178,0.14),transparent_30%)]"
        }`}
      />

      <DiscoveryToast toast={toast} onClose={closeToast} />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <RoomTimer remainingSeconds={remainingSeconds} />
          <DiscoveryCounter
            found={foundCount}
            total={ROOM_DISCOVERIES.length}
            onClaim={() =>
              claimDiscovery(
                "lying-counter",
                10,
                "Some things are not what they seem."
              )
            }
          />
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="border border-cyan-500/20 bg-slate-900/70 p-6 shadow-2xl shadow-cyan-950/20 backdrop-blur">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
                <Eye size={22} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                  Actual Room
                </p>
                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  The website is not what it appears to be.
                </h1>
                <p className="mt-4 max-w-2xl text-slate-300">
                  Six irregularities are embedded in this chamber. Some respond to
                  attention, some to patience, and one changes the room completely.
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <HoldButton
                completed={hasDiscovery("hold-button")}
                onComplete={() =>
                  claimDiscovery("hold-button", 15, "Patience is rewarded.")
                }
              />

              <MovingMessage
                completed={hasDiscovery("moving-message")}
                onDiscover={() =>
                  claimDiscovery(
                    "moving-message",
                    15,
                    "You noticed something unusual."
                  )
                }
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <AnomalyToggle enabled={anomalyMode} onToggle={handleAnomalyToggle} />

            <div className="border border-slate-700 bg-slate-900/70 p-5">
              <div className="flex items-center gap-3 text-slate-300">
                <ScanLine size={18} className="text-cyan-300" />
                <p className="text-sm uppercase tracking-[0.25em]">
                  Surface Footer
                </p>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {anomalyMode
                  ? "Footer checksum failed. Hidden archive route exposed."
                  : "Footer checksum passed. Nothing else is available here."}
              </p>
            </div>
          </div>
        </section>

        {anomalyMode && (
          <section className="grid gap-6 lg:grid-cols-2">
            <VerificationPuzzle
              completed={hasDiscovery("verification-puzzle")}
              onComplete={() =>
                claimDiscovery(
                  "verification-puzzle",
                  25,
                  "Verification bypassed."
                )
              }
            />

            <ArchivePortal onEnter={enterArchive} />
          </section>
        )}

        <footer className="border-t border-cyan-500/20 py-5 text-sm text-slate-500">
          {anomalyMode
            ? "ANOMALY MODE ENABLED // archive handshake listening"
            : "NORMAL MODE // surface presentation stable"}
        </footer>
      </div>
    </div>
  );
}
