// src/store/gameStore.js

import { create } from "zustand";
import { persist } from "zustand/middleware";

const useGameStore = create(
  persist(
    (set, get) => ({
      score: 0,
      currentLevel: 1,

      discoveries: [],
      claimedRewards: [],
      completedPuzzles: [],

      discover: (id, points = 0) => {
        const { discoveries = [], claimedRewards = [] } = get();

        if (discoveries.includes(id) || claimedRewards.includes(id)) {
          return false;
        }

        set((state) => ({
          score: state.score + points,
          discoveries: [...(state.discoveries || []), id],
          claimedRewards: [...new Set([...(state.claimedRewards || []), id])],
        }));

        return true;
      },

      addScore: (rewardId, points) => {
        return get().discover(rewardId, points);
      },

      completePuzzle: (puzzleId) => {
        const { completedPuzzles } = get();

        if (completedPuzzles.includes(puzzleId)) return;

        set({
          completedPuzzles: [
            ...completedPuzzles,
            puzzleId,
          ],
        });
      },

      setCurrentLevel: (level) =>
        set({
          currentLevel: level,
        }),

      resetGame: () =>
        set({
          score: 0,
          currentLevel: 1,
          discoveries: [],
          claimedRewards: [],
          completedPuzzles: [],
        }),
    }),
    {
      name: "infotrek-storage",
    }
  )
);

export default useGameStore;
