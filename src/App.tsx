import { useState, useEffect } from "react";
import HRRushView from "./views/HRRushView";
import HRTimeView from "./views/HRTimeView";
import DevRushView from "./views/DevRushView";
import DevTimeView from "./views/DevTimeView";
import "./App.css";

const OPTIONS = [
  { id: "hr-rush", label: "HR's with rush" },
  { id: "hr-time", label: "HR's with time to know more detail" },
  { id: "dev-rush", label: "Developers in rush" },
  { id: "dev-time", label: "Developers free to look all my works" },
];

function App() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isBooting, setIsBooting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeView, setActiveView] = useState<string | null>(null);

  // Handle the simulated BIOS boot progress
  useEffect(() => {
    if (isBooting) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          // Randomly increment by 1 to 15 to make it feel organic
          return Math.min(prev + Math.floor(Math.random() * 15) + 1, 100);
        });
      }, 150); // Updates every 150ms

      return () => clearInterval(interval);
    }
  }, [isBooting]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If we are booting and progress is 100, any key transitions to the selected view
      if (isBooting && progress === 100) {
        e.preventDefault();
        setActiveView(OPTIONS[selectedIndex].id);
        return;
      }

      if (isBooting) return; // Disable keys while booting < 100%

      if (["ArrowUp", "ArrowDown", " ", "Enter"].includes(e.key)) {
        e.preventDefault();
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : OPTIONS.length - 1));
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < OPTIONS.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Enter") {
        setIsBooting(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, isBooting, progress]);

  if (activeView) {
    if (activeView === "hr-rush") return <HRRushView />;
    if (activeView === "hr-time") return <HRTimeView />;
    if (activeView === "dev-rush") return <DevRushView />;
    if (activeView === "dev-time") return <DevTimeView />;
    return null;
  }

  if (isBooting) {
    return (
      <div className="bios-container">
        <div className="bios-header">
          Portfolio OS BIOS v2.06
          <br />
          Copyright (C) 2026, Johan Portfolio Inc.
          <br />
          <br />
          Initializing {OPTIONS[selectedIndex].label}...
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="progress-text">{progress}%</div>
        </div>

        {progress === 100 && (
          <div className="bios-footer">
            <br />
            System check OK.
            <br />
            Press any key to enter...
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="boot-container">
      <div className="boot-header">GNU GRUB version 2.06</div>

      <div className="options-list">
        {OPTIONS.map((option, index) => (
          <div
            key={option.id}
            className={`option ${index === selectedIndex ? "selected" : ""}`}
            onClick={() => setSelectedIndex(index)}
            onDoubleClick={() => setIsBooting(true)}
          >
            {index === selectedIndex ? "*" : " "} {option.label}
          </div>
        ))}
      </div>

      <div className="boot-footer">
        <p>Use the ↑ and ↓ keys to select which entry is highlighted.</p>
        <p>Press enter to boot the selected mode.</p>
      </div>
    </div>
  );
}

export default App;
