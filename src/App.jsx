import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./pages/level1/Home";
import GameLayout from "./Layout/GameLayout";
import LoadingPuzzle from "./pages/level1/LoadingPuzzle";
import HiddenScrollPuzzle from "./pages/level1/HiddenScrollPuzzle";
import ActualRoom from "./pages/level1/ActualRoom";
import Archive from "./pages/level1/Archive";
import Level2Intro from "./pages/level2/Level2Intro";
import VerificationPortal from "./pages/level2/VerificationPortal";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/surface/intro" replace />} />

        <Route element={<GameLayout />}>
          <Route path="/surface/intro" element={<Home />} />

          <Route path="/surface/loading" element={<LoadingPuzzle />} />

          <Route path="/surface/hiddenScroll" element={<HiddenScrollPuzzle />} />

          <Route path="/surface/actual" element={<ActualRoom />} />
          <Route path="/surface/archive" element={<Archive />} />
          <Route path="/cracks/intro" element={<Level2Intro />} />
          <Route path="/cracks/verify" element={<VerificationPortal />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
