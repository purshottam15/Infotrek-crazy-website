import { Outlet } from "react-router-dom";
import ScoreNavbar from "../components/ScoreNavbar";

export default function GameLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      <ScoreNavbar />

      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}