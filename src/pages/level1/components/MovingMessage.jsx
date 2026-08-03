import { useState } from "react";

export default function MovingMessage({ completed, onDiscover }) {
  const [hovered, setHovered] = useState(false);

  const reveal = () => {
    setHovered(true);
    onDiscover();
  };

  return (
    <button
      type="button"
      onMouseEnter={reveal}
      onFocus={reveal}
      className="w-full overflow-hidden border border-slate-700 bg-slate-950/80 px-4 py-5 text-left text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-200"
    >
      <style>
        {`
          @keyframes slowDrift {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(28px);
            }
          }
        `}
      </style>
      <span className="block animate-[slowDrift_5s_ease-in-out_infinite]">
        {hovered || completed ? "The room changes." : "Nothing important here."}
      </span>
    </button>
  );
}
