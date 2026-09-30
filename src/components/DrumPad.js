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
  const audioRef = useRef(null);

  // Used when the pad is clicked with the mouse
  const handleClick = () => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio.volume = volume / 100;

    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });

    onPlay();
  };

  // Used when the pad is triggered from the keyboard
  useEffect(() => {
    if (!trigger) {
      return;
    }

    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.currentTime = 0;
    audio.volume = volume / 100;

    audio.play().catch((error) => {
      console.error("Audio playback error:", error);
    });
  }, [trigger, volume]);

  return (
    <button
      className={`drum-pad ${active ? "active" : ""}`}
      onClick={handleClick}
      type="button"
    >
      <audio
        ref={audioRef}
        src={`/sounds/${sound}`}
        preload="auto"
      />

      <span className="pad-key">
        {keyTrigger}
      </span>

      <span className="pad-name">
        {name}
      </span>
    </button>
  );
}

export default DrumPad;