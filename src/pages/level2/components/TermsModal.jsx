import { useEffect, useRef, useState } from "react";
import { FileText, X } from "lucide-react";

const TERMS_SECTIONS = [
  ["1.0", "Identity signals must be interpreted literally unless the portal claims otherwise."],
  ["2.0", "Participants agree that progress bars are decorative instruments of institutional confidence."],
  ["3.0", "Any label may be renamed for clarity, confusion, compliance, or Tuesday maintenance."],
  ["4.0", "Checkboxes may adjust their position by a reasonable operational distance."],
  ["5.0", "Disabled visual states do not guarantee disabled behavior, only a lack of enthusiasm."],
  ["6.0", "Required marks may be omitted when the portal believes subtlety improves morale."],
  ["7.0", "Optional marks may be included when the portal believes certainty improves posture."],
  ["8.0", "The participant name field recognizes the accepted signal more readily than the participant."],
  ["9.0", "Department values are stored in a cabinet that is present for regulatory symmetry."],
  ["10.0", "Access codes may be inferred from numbers that insist on changing their minds."],
  ["11.0", "Security phrases are most reliable when copied from places built to be ignored."],
  ["12.0", "The close control is available after the full document has received adequate attention."],
  ["13.0", "The top right X is retained for decorative refusal and does not dismiss this document."],
  ["14.7", "A section number may act as a discovery when treated as less boring than expected."],
  ["15.0", "Submission timing begins when verification begins, not when confidence arrives."],
  ["16.0", "Every incorrect error message is correct in a departmental sense not disclosed here."],
  ["17.0", "The portal may accept a request while continuing to look disappointed."],
  ["18.0", "By closing this document, the participant confirms they reached the end on purpose."],
];

export default function TermsModal({ open, onClose, onDiscover }) {
  const [reachedBottom, setReachedBottom] = useState(false);
  const [xMessage, setXMessage] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setReachedBottom(false);
    setXMessage("");
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    });
  }, [open]);

  if (!open) {
    return null;
  }

  const handleScroll = () => {
    const node = scrollRef.current;

    if (!node) {
      return;
    }

    const bottomGap = node.scrollHeight - node.scrollTop - node.clientHeight;
    if (bottomGap < 16) {
      setReachedBottom(true);
    }
  };

  const handleFakeClose = () => {
    setXMessage("Close request denied. The close button is at the bottom.");
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 px-4 py-6 text-white backdrop-blur">
      <section className="flex max-h-[min(44rem,calc(100vh-2rem))] w-full max-w-3xl flex-col border border-cyan-400/25 bg-slate-950 shadow-2xl shadow-cyan-950/40">
        <header className="flex items-start justify-between gap-4 border-b border-cyan-500/20 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border border-cyan-400/30 bg-cyan-400/10 text-cyan-200">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">
                Mandatory Review
              </p>
              <h2 className="mt-1 text-xl font-bold">Terms and Conditions</h2>
            </div>
          </div>

          <button
            type="button"
            onClick={handleFakeClose}
            aria-label="Decorative close request"
            className="flex h-9 w-9 items-center justify-center border border-slate-700 text-slate-400 transition hover:border-cyan-300 hover:text-cyan-200"
          >
            <X size={18} />
          </button>
        </header>

        {xMessage && (
          <p className="border-b border-cyan-500/20 bg-cyan-400/5 px-5 py-3 text-sm text-cyan-200">
            {xMessage}
          </p>
        )}

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="min-h-0 flex-1 overflow-y-auto px-5 py-4"
        >
          <div className="space-y-5 pb-6 text-sm leading-7 text-slate-300">
            {TERMS_SECTIONS.map(([section, text]) => (
              <p key={section}>
                <button
                  type="button"
                  onClick={() => {
                    if (section === "14.7") {
                      onDiscover();
                    }
                  }}
                  className={`mr-2 font-mono ${
                    section === "14.7"
                      ? "text-slate-400 transition hover:text-cyan-200"
                      : "cursor-default text-slate-500"
                  }`}
                >
                  {section}
                </button>
                {text} Additional verification language confirms that continued reading
                does not increase clarity, but it does satisfy the portal requirement.
              </p>
            ))}

            <button
              type="button"
              onClick={onClose}
              disabled={!reachedBottom}
              className={`mt-4 w-full px-5 py-4 font-bold uppercase tracking-[0.22em] transition ${
                reachedBottom
                  ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300"
                  : "cursor-not-allowed border border-slate-700 bg-slate-900 text-slate-500"
              }`}
            >
              CLOSE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
