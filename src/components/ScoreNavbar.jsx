import { Trophy, Shield, Activity } from "lucide-react";
import useGameStore from "../store/gameStore";

export default function ScoreNavbar() {
  const score = useGameStore((state) => state.score);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav className="h-20 border-b border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl">
        
        {/* Glow Line */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

        <div className="h-full px-8 flex items-center justify-between">

          {/* Left Section */}
          <div className="flex items-center gap-4">

            <div className="relative">
              <div className="w-12 h-12 rounded-xl border border-cyan-500/30 bg-cyan-500/10 flex items-center justify-center">
                <Shield
                  size={24}
                  className="text-cyan-400"
                />
              </div>

              <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
            </div>

            <div>
              <h1 className="text-white text-xl font-bold tracking-wider">
                INFOTREK
              </h1>

              <p className="text-xs text-cyan-400 tracking-[0.35em] uppercase">
                THE SURFACE
              </p>
            </div>
          </div>

          {/* Center Section */}
          <div className="hidden md:flex items-center gap-4 px-5 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5">

            <Activity
              size={16}
              className="text-cyan-400 animate-pulse"
            />

            <span className="text-slate-300 text-sm">
              Phase 01
            </span>

            <span className="h-4 w-px bg-slate-700" />

            <span className="text-cyan-400 text-sm font-medium">
              System Stable
            </span>

          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-2">

              <div className="flex items-center gap-3">

                <Trophy
                  size={20}
                  className="text-amber-400"
                />

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-slate-400">
                    Score
                  </p>

                  <p className="text-white text-lg font-bold">
                    {score}
                  </p>
                </div>

              </div>

            </div>

          </div>
        </div>
      </nav>
    </header>
  );
}