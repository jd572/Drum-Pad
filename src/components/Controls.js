import React from "react";

function Controls({ volume, setVolume, power, setPower }) {

  return (
    <div className="controls">

      <div className="volume-control">

        <label>
          MASTER VOLUME
        </label>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
        />

        <span>
          {volume}%
        </span>

      </div>

      <button
        className={`power-button ${power ? "on" : "off"}`}
        onClick={() => setPower(!power)}
      >
        {power ? "POWER ON" : "POWER OFF"}
      </button>

    </div>
  );
}

export default Controls;