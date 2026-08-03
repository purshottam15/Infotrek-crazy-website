import { useNavigate } from "react-router-dom";

export default function Level1Intro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-8 md:p-10">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Level 1
          </h1>

          <p className="text-cyan-400 text-lg mt-2">
            The Surface
          </p>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Instructions
          </h2>

          <div className="space-y-3 text-slate-300">
            <p>
              Welcome to Level 1.
            </p>

            <p>
              This level is designed to test your observation skills.
            </p>

            <p>
              Pay close attention to everything on the website.
            </p>

            <p>
              Some clues may be hidden in unexpected places.
            </p>

            <p>
              There may be more than one way to discover information.
            </p>
          </div>
        </div>

        {/* Rules */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-white mb-4">
            Rules
          </h2>

          <ul className="space-y-2 text-slate-300 list-disc list-inside">
            <li>Use of external help is not allowed.</li>
            <li>Do not share clues with other participants.</li>
            <li>All required information can be found within the website.</li>
            <li>Observe carefully before submitting answers.</li>
            <li>Points are awarded for solving puzzles and discovering clues.</li>
          </ul>
        </div>

        {/* Note */}
        <div className="mb-8 bg-slate-800 border border-slate-700 rounded-lg p-4">
          <p className="text-slate-300">
            Your current score will be displayed in the navigation bar.
            Bonus discoveries may award additional points.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate("/surface/loading")}
          className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg transition duration-200"
        >
          Enter Gameplay
        </button>

      </div>
    </div>
  );
}
