import React, { useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../../socket/socketio";
import { messgaeProps } from "../../interfaces/interface";

const Events = (props: messgaeProps) => {
  const userId = useSelector((state: any) => state.userIdSlice.id);
  const [checkDeckPick, setCheckDeckPick] = useState(false);

  const pickHandler = (e: any) => {
    e.currentTarget.disabled = true;
    const myData = { id: userId };
    socket.emit("pickCard", myData);
    setCheckDeckPick(true);
  };
  const passHandler = (e: any) => {
    e.currentTarget.disabled = true;
    const myData = { id: userId };
    socket.emit("passTurn", myData);
  };

  return (
    <div className="select-rang-container">
      <button
        disabled={userId !== props.nextplayer}
        onClick={(e) => pickHandler(e)}
        className="button-select-rang"
      >
        Pick from deck
      </button>
      <button
        disabled={userId !== props.nextplayer || !checkDeckPick}
        onClick={(e) => passHandler(e)}
        className="button-select-rang"
      >
        Pass
      </button>
    </div>
  );
};

export default Events;
