import React, { useEffect, useState } from "react";
import { messgaeProps } from "../../interfaces/interface";
import { socket } from "../../socket/socketio";
import { useDispatch, useSelector } from "react-redux";
import faceup, { setfaceup } from "../../redux/features/faceup";

const Messages = (props: any) => {
  return (
    <div className="right-side-container messages-container">
      <h1>Messages</h1>
      <div className="message-box">
        <div className="message-content-container">
          {`It is Player  ${props.nextplayer} turn`}
        </div>
        <div className="message-content-container">{props?.message}</div>
      </div>
    </div>
  );
};

export default Messages;
