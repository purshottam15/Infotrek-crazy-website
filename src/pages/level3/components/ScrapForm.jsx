import { useEffect, useEffectEvent, useState } from "react";
import { Brain, Shield, ArrowRight } from "lucide-react";
import useGameStore from "../../../store/gameStore";

const KEY_CONFIG = [
  {
    id: "logger-key",
    answer: "MOVIE",
    points: 20,
  },
  {
    id: "server-key",
    answer: "LOVE STORY",
    points: 20,
  },
  {
    id: "access-key",
    answer: "1912",
    points: 30,
  },
  {
    id: "invisible-key",
    answer: "ATLANTIC OCEAN",
    points: 30,
  },
  {
    id: "identity-key",
    answer: "TITANIC",
    points: 50,
  },
];

function normalize(value) {
  return value.trim().replace(/\s+/g, " ").toLowerCase();
}

export default function ScrapForm() {
  const addScore = useGameStore((state) => state.addScore);
  const resetGame = useGameStore((state)=>state.resetGame);
  const [answers, setAnswers] = useState({
    "logger-key": "",
    "server-key": "",
    "access-key": "",
    "invisible-key": "",
    "identity-key": "",
  });

  const claimedRewards = useGameStore((state) => state.claimedRewards);

  const handleChange = (id, value) => {
    setAnswers((prev) => ({
      ...prev,
      [id]: value,
    }));

    const key = KEY_CONFIG.find((item) => item.id === id);

    if (!key) return;

    if (normalize(value) === normalize(key.answer)) {
      const awarded = addScore(key.id, key.points);
    }

  };

  // useEffect(()=>{
  //   resetGame();
  // },[])

  useEffect(() => {
    // Hidden clues
    fetch("/clues/THERE_IS_NOTHING_SECRET_HERE.txt");

    console.log(KEY_CONFIG[0].answer);
    sessionStorage.setItem("Secret", KEY_CONFIG[1].answer);

    return () => {
      sessionStorage.removeItem("Secret");
    };
  }, []);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <main className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-4 border border-cyan-500/20 bg-slate-900/65 p-5 shadow-2xl shadow-cyan-950/15 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-cyan-400/35 bg-cyan-400/10 text-cyan-200">
              <Brain size={24} />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                Infotrek Security Breach
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Internal Investigation Console
              </p>
            </div>
          </div>

          <div className="border border-slate-700 bg-slate-950/70 px-4 py-3">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
              Mission Status
            </p>

            <p className="mt-1 font-mono text-sm text-cyan-200">
              BREACH_DETECTED
            </p>
          </div>
        </header>

        {/* Brief */}
        <section className="border border-cyan-500/20 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center gap-3">
            <Shield className="text-cyan-300" size={20} />

            <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
              Mission Brief
            </p>
          </div>

          <h1 className="mt-5 text-4xl font-bold text-white">
            Recover The Hidden Access Keys
          </h1>

          <p className="mt-5 max-w-4xl leading-8 text-slate-300">
            Intelligence reports indicate that multiple access keys have been
            scattered throughout this webpage. Some are visible, others are
            intentionally hidden. Use every browser tool at your disposal to
            investigate the page. The network panel, storage, source code and
            console may reveal more than they appear to.
          </p>

          <div className="mt-6 border-l-2 border-cyan-400 pl-4">
            <p className="font-mono text-sm text-cyan-200">
              Objective: Locate every hidden key and find the final answer.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="border border-cyan-500/20 bg-slate-900/75 p-6 shadow-2xl shadow-cyan-950/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
                Investigation Form
              </p>

              <h2 className="mt-2 text-3xl font-bold">Target Information</h2>
            </div>

            <div className="hidden border border-slate-700 bg-slate-950/70 px-4 py-2 md:block">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                Clearance
              </p>

              <p className="mt-1 font-mono text-cyan-200">LEVEL-03</p>
            </div>
          </div>

          <form className="mt-8">
            <div className="grid gap-6 md:grid-cols-2">
              <label>
                <span className="text-sm font-semibold text-slate-200">
                  Logger Key
                </span>

                <input
                  type="text"
                  value={answers["logger-key"]}
                  disabled={claimedRewards.includes("logger-key")}
                  onChange={(e) => handleChange("logger-key", e.target.value)}
                  placeholder={
                    claimedRewards.includes("logger-key")
                      ? "KEY RECOVERED ✓"
                      : "Really ? You Want A Hint 😒"
                  }
                  className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-200">
                  Server Is Compromised
                </span>

                <input
                  type="text"
                  value={answers["server-key"]}
                  disabled={claimedRewards.includes("server-key")}
                  onChange={(e) => handleChange("server-key", e.target.value)}
                  placeholder={
                    claimedRewards.includes("server-key")
                      ? "KEY RECOVERED ✓"
                      : "Server Leaked Key"
                  }
                  className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-200">
                  Access Key
                </span>

                <input
                  type="text"
                  value={answers["access-key"]}
                  disabled={claimedRewards.includes("access-key")}
                  onChange={(e) => handleChange("access-key", e.target.value)}
                  placeholder={
                    claimedRewards.includes("access-key")
                      ? "KEY RECOVERED ✓"
                      : "Recovered Key From Storage Room"
                  }
                  className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>

              <label>
                <span className="text-sm font-semibold text-slate-200">
                  Key is <span className="m-4 invisible">{KEY_CONFIG[3].answer}</span>{" "}
                  Here
                </span>

                <input
                  type="text"
                  value={answers["invisible-key"]}
                  disabled={claimedRewards.includes("invisible-key")}
                  onChange={(e) =>
                    handleChange("invisible-key", e.target.value)
                  }
                  placeholder={
                    claimedRewards.includes("invisible-key")
                      ? "KEY RECOVERED ✓"
                      : "In the plain sight"
                  }
                  className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>
            </div>

            <div className="mt-6">
              <label>
                <span className="text-sm font-semibold text-slate-200">
                  Who Am I ?
                </span>
                <input
                  type="text"
                  value={answers["identity-key"]}
                  disabled={claimedRewards.includes("identity-key")}
                  onChange={(e) => handleChange("identity-key", e.target.value)}
                  placeholder={
                    claimedRewards.includes("identity-key")
                      ? "KEY RECOVERED ✓"
                      : "Secret Name...?"
                  }
                  className="mt-2 w-full border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 flex w-full items-center justify-center gap-3 border border-cyan-400/20 bg-cyan-400/20 px-6 py-4 font-bold uppercase tracking-[0.22em] text-cyan-100 opacity-60 shadow-lg shadow-cyan-950/20 transition hover:border-cyan-200 hover:bg-cyan-400 hover:text-slate-950 hover:opacity-100"
            >
              Finish Investigation
              <ArrowRight size={18} />
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
