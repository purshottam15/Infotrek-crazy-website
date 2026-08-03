import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "../../store/gameStore";

export default function HiddenScrollPuzzle() {
  const navigate = useNavigate();
  const discover = useGameStore((state) => state.discover);
  const [hint, setHint] = useState("");
  const [foundSecret, setFoundSecret] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const hint1 = setTimeout(() => {
      setHint("Are you sure you've seen everything?");
    }, 8000);

    const hint2 = setTimeout(() => {
      setHint("Some pages are longer than they appear.");
    }, 15000);

    const hint3 = setTimeout(() => {
      setHint("Try scrolling.");
    }, 60000);

    return () => {
      clearTimeout(hint1);
      clearTimeout(hint2);
      clearTimeout(hint3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;

      setProgress(Math.min(100, Math.floor(currentProgress)));

      if (currentProgress >= 98) {
        setFoundSecret(true);
        discover("hidden-scroll", 20);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [discover]);

  return (
    <div
      className="bg-slate-950 text-white overflow-x-hidden"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>
        {`
          ::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className="fixed right-4 top-28 z-40 w-40 border border-cyan-500/20 bg-slate-950/85 p-3 shadow-lg shadow-cyan-950/20 backdrop-blur sm:right-8">
        <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
          Exploration
        </p>
        <div className="mt-2 h-2 overflow-hidden bg-slate-800">
          <div
            className="h-full bg-cyan-400 transition-all duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 text-right text-sm font-semibold text-cyan-300">
          {progress}%
        </p>
      </div>

      <section className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-3xl text-center">
          <h1 className="text-5xl font-bold mb-6">
            Verification Successful
          </h1>

          <p className="text-slate-300 text-lg mb-10">
            Your next clue is somewhere on this page.
          </p>

          <button className="px-8 py-4 bg-cyan-500 text-slate-950 font-bold cursor-default">
            Continue
          </button>

          <div className="h-16 mt-10">
            {hint && (
              <p className="text-cyan-400 animate-pulse">
                {hint}
              </p>
            )}
          </div>
        </div>
      </section>

      {Array.from({ length: 8 }).map((_, index) => (
        <section key={index} className="h-screen flex items-center justify-center">
          <p className="text-slate-700 text-3xl">v</p>
        </section>
      ))}

      <section className="h-screen flex items-center justify-center">
        <p className="text-slate-600 text-2xl">Still looking?</p>
      </section>

      <section className="h-screen flex items-center justify-center">
        <p className="text-slate-700 text-2xl">
          Most participants stop here
          <span className="text-cyan-500">.</span>
        </p>
      </section>

      <section className="h-screen flex items-center justify-center">
        <p className="text-slate-500 text-2xl">Keep going.</p>
      </section>

      <section className="h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-cyan-400 text-lg mb-4">Searching...</p>

          <div className="w-72 h-3 bg-slate-800 overflow-hidden">
            <div className="w-[68%] h-full bg-cyan-400" />
          </div>
        </div>
      </section>

      <section className="h-screen flex items-center justify-center">
        <p className="text-slate-500 text-2xl">Almost there...</p>
      </section>

      <section className="min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl w-full">
          <div className="bg-slate-900 border border-cyan-500/20 p-10 text-center shadow-2xl shadow-cyan-950/20">
            <h2 className="text-4xl font-bold text-cyan-400 mb-6">
              Interesting.
            </h2>

            <p className="text-slate-300 mb-8">
              You kept going when most would not.
            </p>

            <div className="border border-cyan-500/20 bg-cyan-500/5 p-8">
              <p className="text-slate-400 mb-3">Hidden Key Revealed</p>

              <p className="text-4xl font-black tracking-[0.35em] text-cyan-400 sm:text-5xl">
                SURFACE
              </p>
            </div>

            {foundSecret && (
              <div className="mt-8">
                <p className="text-green-400 text-xl font-semibold">
                  +20 Points Awarded
                </p>

                <button
                  onClick={() => navigate("/surface/actual")}
                  className="mt-6 px-8 py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition"
                >
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
