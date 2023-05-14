import { Players } from "../Players/Players";
import { cardMapper } from "../../utils/cardMapper";
import "./uno-cards.css";
import "./uno.css";
import { gameProps } from "../../interfaces/interface";
import { useEffect, useState } from "react";
import { socket } from "../../socket/socketio";
import { useDispatch, useSelector } from "react-redux";
import { setfaceup } from "../../redux/features/faceup";

export const Table = (props: any) => {
  return (
    <div>
      <div className="game-table-container">
        <div className="game-table">
          <div className="card-area">
            <div className="card discard-pile black">
              <span className="inner">
                <span className="mark">U</span>
              </span>
            </div>

            <div
              className={`card ${cardMapper(props.faceupCard)[1]} ${
                cardMapper(props.faceupCard)[0]
              }`}
            >
              <span className="inner">
                <span className="mark">
                  {cardMapper(props.faceupCard)[2]
                    ? cardMapper(props.faceupCard)[1].split("-")[1]
                    : ""}
                </span>
              </span>
            </div>
          </div>
          <Players players={props.players} />
        </div>
      </div>
    </div>
  );
};
