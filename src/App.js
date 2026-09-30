import React, { useState, useEffect } from "react";
import Display from "./components/Display";
import DrumPad from "./components/DrumPad";
import Controls from "./components/Controls";
import "./App.css";

// All drum pads and their audio files
const pads = [
  {
    name: "Kick",
    key: "Q",
    sound: "kick.mp3.mpeg"
  },
  {
    name: "Snare",
    key: "W",
    sound: "snare.mp3.mpeg"
  },
  {
    name: "Hi-Hat",
    key: "E",
    sound: "closed-hat.mp3.mpeg"
  },
  {
    name: "Clap",
    key: "A",
    sound: "clap.mp3.mpeg"
  },
  {
    name: "Kick 2",
    key: "S",
    sound: "kick.mp3.mpeg"
  },
  {
    name: "Snare 2",
    key: "D",
    sound: "snare.mp3.mpeg"
  },
  {
    name: "Open Hat",
    key: "Z",
    sound: "open-hat.mp3.mpeg"
  },
  {
    name: "Tom",
    key: "X",
    sound: "tom.mp3.mpeg"
  },
  {
    name: "Crash",
    key: "C",
    sound: "cowbell.mp3.mpeg"
  }
];

function App() {
  // Master controls
  const [volume, setVolume] = useState(80);
  const [power, setPower] = useState(true);

  // Display message
  const [message, setMessage] = useState("READY");

  // Which pad should glow
  const [activePad, setActivePad] = useState(null);

  // Used to trigger sounds from the keyboard
  const [triggers, setTriggers] = useState({});

  // Handles both mouse clicks and keyboard-triggered pads
  const playPad = (pad) => {
    if (!power) {
      setMessage("POWER OFF");
      return;
    }

    setMessage(pad.name);
    setActivePad(pad.key);

    // Remove glow after a short time
    setTimeout(() => {
      setActivePad(null);
    }, 150);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key.toUpperCase();

      // Find the pad corresponding to the pressed key
      const pad = pads.find((pad) => pad.key === key);

      // Ignore other keyboard keys
      if (!pad) {
        return;
      }

      // Don't play anything when power is OFF
      if (!power) {
        setMessage("POWER OFF");
        return;
      }

      // Change trigger value so DrumPad's useEffect runs
      setTriggers((previousTriggers) => ({
        ...previousTriggers,
        [key]: Date.now()
      }));

      // Update display and visual effect
      setMessage(pad.name);
      setActivePad(key);

      setTimeout(() => {
        setActivePad(null);
      }, 150);
    };

    // Listen for keyboard presses
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [power]);

  // Turn power on/off
  const togglePower = () => {
    setPower((previousPower) => {
      const newPower = !previousPower;

      if (newPower) {
        setMessage("READY");
      } else {
        setMessage("POWER OFF");
        setActivePad(null);
      }

      return newPower;
    });
  };

  return (
    <div className="app">

      <h1>🥁 DRUM PAD</h1>

      <Display
        message={message}
        volume={volume}
        power={power}
      />

      <div className="drum-grid">

        {pads.map((pad) => (
          <DrumPad
            key={pad.key}
            name={pad.name}
            keyTrigger={pad.key}
            sound={pad.sound}
            volume={volume}
            active={activePad === pad.key}
            trigger={triggers[pad.key]}
            onPlay={() => playPad(pad)}
          />
        ))}

      </div>

      <Controls
        volume={volume}
        setVolume={setVolume}
        power={power}
        togglePower={togglePower}
      />

    </div>
  );
}

export default App;