import { useEffect, useState } from "react";
import useGameStore from "../../store/gameStore";
import { useNavigate } from "react-router-dom";

const ANSWER = 42;
const REWARD_ID = "loading-puzzle";
const REWARD_POINTS = 20;

export default function LoadingPuzzle() {
  const navigate =useNavigate();
  const addScore = useGameStore((state) => state.addScore);

  const [progress, setProgress] = useState(32);
  const [stage, setStage] = useState("loading");
  const [answer, setAnswer] = useState(0);
  const [solved, setSolved] = useState(false);
  const canSubmit = answer === ANSWER;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const percentage = Math.min(
        100,
        Math.max(0, Math.round((e.clientX / window.innerWidth) * 100))
      );

      if (stage === "loading") {
        setProgress(percentage);

        if (percentage >= 100) {
          setTimeout(() => {
            setStage("question");
          }, 500);
        }
      }

      if (stage === "question") {
        setAnswer(percentage);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [stage]);

  useEffect(() => {
    const handleClick = () => {
      if (stage !== "question" || !canSubmit || solved) {
        return;
      }

      setSolved(true);
      addScore(REWARD_ID, REWARD_POINTS);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [addScore, canSubmit, solved, stage]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
      {stage === "loading" && (
        <div className="w-full max-w-xl text-center">
          <h1 className="text-4xl font-bold mb-10">SYSTEM INITIALIZING</h1>

          <div className="w-full h-5 bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-400 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="mt-6 text-3xl font-bold text-cyan-400">{progress}%</p>

          <p className="mt-8 text-slate-400">
            Initialization in progress...
          </p>
        </div>
      )}

      {stage === "question" && !solved && (
        <div className="w-full max-w-xl text-center">
          <h1 className="text-3xl font-bold mb-8">
            Initialization Complete
          </h1>

          {canSubmit && (
            <div className="mt-6 text-green-400 font-semibold animate-pulse">
              Signal detected. Click anywhere to proceed.
            </div>
          )}

          <p className="text-xl mb-10">What is 17 + 25?</p>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
            <p className="text-slate-400 mb-4">
              Move your mouse horizontally
            </p>

            <div className="text-6xl font-bold text-cyan-400 mb-8">
              {answer}
            </div>

            <div className="w-full h-3 bg-slate-800 rounded-full relative">
              <div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full"
                style={{
                  left: `${answer}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {solved && (
        <div className="w-full max-w-2xl">
          <div className="bg-slate-900 border border-green-500/20 rounded-3xl p-10 text-center shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                <span className="text-4xl" aria-hidden="true">
                  OK
                </span>
              </div>
            </div>

            <h1 className="text-4xl font-bold text-green-400 mb-3">
              Puzzle 1 Complete
            </h1>

            <p className="text-slate-400 mb-8">
              Congratulations! You have successfully completed the first
              challenge.
            </p>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-left mb-8">
              <p className="text-slate-300 mb-4">
                You discovered the first anomaly.
              </p>

              <p className="text-slate-300 mb-4">
                That was only a warm-up.
              </p>

              <p className="text-slate-300 mb-4">
                The next challenges will require sharper observation and a
                little more patience.
              </p>

              <p className="text-slate-300">
                Trust what you see. Question what you do not.
              </p>
            </div>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-8">
              <span className="text-xl font-bold text-amber-400">
                +{REWARD_POINTS} Points Awarded
              </span>
            </div>

            <div>
              <button
                onClick={() => navigate("/surface/hiddenScroll")}
               className="px-10 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-lg transition-all duration-200 hover:scale-105">
                
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
