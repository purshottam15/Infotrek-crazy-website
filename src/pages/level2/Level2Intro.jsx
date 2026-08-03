import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";

export default function Level2Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-950 px-6 py-16 text-white">
      <main className="mx-auto flex min-h-[calc(100vh-13rem)] max-w-3xl items-center">
        <section className="w-full border border-cyan-500/20 bg-slate-900/75 p-8 shadow-2xl shadow-cyan-950/25 backdrop-blur">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center border border-cyan-400/35 bg-cyan-400/10 text-cyan-200">
              <ShieldAlert size={24} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
                Level 2
              </p>
              <h1 className="mt-2 text-4xl font-bold">SIGNAL ACCEPTED</h1>
            </div>
          </div>

          <div className="mt-8 border-l border-cyan-400/30 pl-5">
            <p className="text-lg text-slate-200">
              Participant identity could not be verified.
            </p>
            <p className="mt-3 text-slate-400">
              To continue, complete the Verification Request Form.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/cracks/verify")}
            className="mt-10 w-full bg-cyan-500 px-6 py-4 font-bold uppercase tracking-[0.22em] text-slate-950 transition hover:bg-cyan-300"
          >
            BEGIN VERIFICATION
          </button>
        </section>
      </main>
    </div>
  );
}
