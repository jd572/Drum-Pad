import React, { useRef, useEffect } from "react";

function DrumPad({
  name,
  keyTrigger,
  sound,
  onPlay,
  active,
  volume,
  trigger
}) {
  // Reference to the HTML audio element
  const audioRef = useRef(null);

  // Function to play the sound
  const playSound = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    // Start the sound from the beginning
    audio.currentTime = 0;

    // Set volume
    audio.volume = volume / 100;

    // Play the audio
    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });

    // Tell App.js that this pad was played
    onPlay();
  };

  // Play sound when keyboard trigger changes
  useEffect(() => {
    if (trigger) {
      playSound();
    }
  }, [trigger]);

  return (
    <button
      className={`drum-pad ${active ? "active" : ""}`}
      onClick={playSound}
      type="button"
    >
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={`/sounds/${sound}`}
        preload="auto"
      />

      {/* Keyboard key */}
      <span className="pad-key">
        {keyTrigger}
      </span>

      {/* Drum name */}
      <span className="pad-name">
        {name}
      </span>
    </button>
  );
}

export default DrumPad;