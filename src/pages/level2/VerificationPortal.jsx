import { useCallback, useRef, useState } from "react";
import { Building2 } from "lucide-react";
import useGameStore from "../../store/gameStore";
import DiscoveryToast from "./components/DiscoveryToast";
import ScoreSummary from "./components/ScoreSummary";
import TermsModal from "./components/TermsModal";
import VerificationForm from "./components/VerificationForm";

function scoreForTime(seconds) {
  if (seconds < 60) return 100;
  if (seconds < 90) return 80;
  if (seconds < 120) return 60;
  if (seconds < 180) return 40;
  return 20;
}

export default function VerificationPortal() {
  const discover = useGameStore((state) => state.discover);
  const [termsOpen, setTermsOpen] = useState(true);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [toast, setToast] = useState(null);
  const [summary, setSummary] = useState(null);
  const startedAtRef = useRef(Date.now());

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

  const closeTerms = () => {
    setTermsAccepted(true);
    setTermsOpen(false);
  };

  const completeVerification = () => {
    const elapsedSeconds = Math.floor((Date.now() - startedAtRef.current) / 1000);
    const points = scoreForTime(elapsedSeconds);
    const wasRecorded = discover("level2-verification-complete", points);

    setSummary({
      elapsedSeconds,
      points,
      wasRecorded,
    });
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <DiscoveryToast toast={toast} onClose={closeToast} />

      {/* <TermsModal
        open={termsOpen}
        onClose={closeTerms}
        onDiscover={() =>
          claimDiscovery(
            "level2-terms-section",
            25,
            "The boring section number was not boring."
          )
        }
      /> */}

      <main className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-col gap-4 border border-cyan-500/20 bg-slate-900/65 p-5 shadow-2xl shadow-cyan-950/15 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() =>
              claimDiscovery(
                "level2-logo-click",
                10,
                "Official seals enjoy being clicked."
              )
            }
            className="flex items-center gap-4 text-left"
          >
            <div className="flex h-12 w-12 items-center justify-center border border-cyan-400/35 bg-cyan-400/10 text-cyan-200">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                Infotrek Verification Authority
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Identity Assurance Desk
              </p>
            </div>
          </button>

          <div className="border border-slate-700 bg-slate-950/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Request State
            </p>
            <p className="mt-1 font-mono text-sm text-cyan-200">
              PENDING_VERIFICATION
            </p>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-6">
            {summary ? (
              <ScoreSummary
                elapsedSeconds={summary.elapsedSeconds}
                points={summary.points}
                wasRecorded={summary.wasRecorded}
              />
            ) : (
              <VerificationForm
                termsAccepted={termsAccepted}
                onTermsRequest={() => setTermsOpen(true)}
                onComplete={completeVerification}
                onTitleDiscovery={() =>
                  claimDiscovery(
                    "level2-title-double-click",
                    15,
                    "The form title had a second layer."
                  )
                }
                onProgressDiscovery={() =>
                  claimDiscovery(
                    "level2-progress-hover",
                    10,
                    "The progress bar admitted nothing."
                  )
                }
              />
            )}
          </div>

          <aside className="border border-cyan-500/20 bg-slate-900/60 p-5 shadow-2xl shadow-cyan-950/15">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
              Scoring Window
            </p>
            <div className="mt-5 space-y-3 text-sm text-slate-300">
              <ScoreRow label="Under 60 sec" points="100" />
              <ScoreRow label="Under 90 sec" points="80" />
              <ScoreRow label="Under 120 sec" points="60" />
              <ScoreRow label="Under 180 sec" points="40" />
              <ScoreRow label="Else" points="20" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function ScoreRow({ label, points }) {
  return (
    <div className="flex items-center justify-between border border-slate-800 bg-slate-950/55 px-3 py-2">
      <span>{label}</span>
      <span className="font-mono text-cyan-200">+{points}</span>
    </div>
  );
}
