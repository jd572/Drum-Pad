import React from "react";

function Display({ message, volume, power }) {
  return (
    <div className="display">

      <div className="display-title">
        DRUM MACHINE
      </div>

      <div className="display-message">
        {message}
      </div>

      <div className="display-info">
        <span>
          VOL: {volume}%
        </span>

        <span>
          POWER: {power ? "ON" : "OFF"}
        </span>
      </div>

    </div>
  );
}

export default Display;