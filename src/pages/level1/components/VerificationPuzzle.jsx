import { useEffect, useRef, useState } from "react";
import { CheckCircle2 } from "lucide-react";

const VERIFICATION_ID = "783451";
const CORRECT_SEQUENCE = ["1", "3", "4", "5", "7", "8"];

export default function VerificationPuzzle({ completed, onComplete }) {
  const [input, setInput] = useState([]);
  const [error, setError] = useState(false);
  const errorTimerRef = useRef(null);

  const handleDigit = (digit) => {
    if (completed) {
      return;
    }

    const expected = CORRECT_SEQUENCE[input.length];

    if (digit !== expected) {
      setInput(digit === CORRECT_SEQUENCE[0] ? [digit] : []);
      setError(true);
      clearTimeout(errorTimerRef.current);
      errorTimerRef.current = setTimeout(() => setError(false), 700);
      return;
    }

    const nextInput = [...input, digit];
    setInput(nextInput);

    if (nextInput.length === CORRECT_SEQUENCE.length) {
      onComplete();
    }
  };

  useEffect(() => {
    return () => clearTimeout(errorTimerRef.current);
  }, []);

  return (
    <div className="border border-cyan-500/25 bg-slate-950/80 p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
            Verification ID
          </p>
          <div className="mt-3 flex gap-2">
            {VERIFICATION_ID.split("").map((digit, index) => (
              <button
                key={`${digit}-${index}`}
                type="button"
                onClick={() => handleDigit(digit)}
                className="flex h-12 w-10 items-center justify-center border border-slate-700 bg-slate-900 font-mono text-xl font-bold text-cyan-100 transition hover:border-cyan-300 hover:bg-cyan-400/10"
              >
                {digit}
              </button>
            ))}
          </div>
        </div>

        <div className="min-w-32">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
            Sequence
          </p>
          <p className={`mt-2 font-mono text-xl ${error ? "text-red-300" : "text-cyan-200"}`}>
            {completed ? "BYPASSED" : input.join("") || "------"}
          </p>
        </div>
      </div>

      {completed && (
        <div className="mt-5 flex items-center gap-2 text-green-300 animate-pulse">
          <CheckCircle2 size={18} />
          <span className="font-semibold">Verification bypassed.</span>
        </div>
      )}
    </div>
  );
}
