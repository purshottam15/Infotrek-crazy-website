import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TIMER_KEY = "infotrek-level1-room-started-at";

function readStartTime() {
  const existing = localStorage.getItem(TIMER_KEY);

  if (existing) {
    return Number(existing);
  }

  const now = Date.now();
  localStorage.setItem(TIMER_KEY, String(now));
  return now;
}

function getRemainingSeconds(startedAt, durationSeconds) {
  const elapsed = Math.floor((Date.now() - startedAt) / 1000);
  return Math.max(0, durationSeconds - elapsed);
}

export default function useRoomTimer(durationSeconds = 360) {
  const navigate = useNavigate();
  const [startedAt] = useState(readStartTime);
  const [remainingSeconds, setRemainingSeconds] = useState(() =>
    getRemainingSeconds(startedAt, durationSeconds)
  );

  useEffect(() => {
    const tick = () => {
      const nextRemaining = getRemainingSeconds(startedAt, durationSeconds);
      setRemainingSeconds(nextRemaining);

      if (nextRemaining <= 0) {
        navigate("/cracks/intro", { replace: true });
      }
    };

    tick();
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [durationSeconds, navigate, startedAt]);

  return remainingSeconds;
}
