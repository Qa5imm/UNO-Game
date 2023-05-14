import React from "react";

export const Players = (props: any) => {
  return (
    <div>
      {props.players.map((element: any, index: any) => {
        return (
          <div className="game-players-container">
            <div className={`player-tag player-${index + 1}`}>{element}</div>
          </div>
        );
      })}
    </div>
  );
};
