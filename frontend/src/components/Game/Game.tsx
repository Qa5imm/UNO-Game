import React, { useEffect, useState } from "react";
import "./uno.css";
import "./uno-cards.css";
import { gameProps } from "../../interfaces/interface";
import { Table } from "../Table/Table";
import Cards from "../Cards/Cards";
import Messages from "../Messages/Messages";
import { socket } from "../../socket/socketio";
import { useSelector } from "react-redux";
import Events from "../Events/Events";
import { cardMapper } from "../../utils/cardMapper";

const Game = (props: any) => {
  // states
  const userId = useSelector((state: any) => state.userIdSlice.id);
  const [response, setResponse] = useState<any>({});
  const [finalMessaage, setfinalMessage] = useState("");
  const [disable, setdisable] = useState(false);

  useEffect(() => {
    // starting request
    if (props.nextplayer === Number(userId)) {
      const cardtype = props.faceupCard.split("_")[0];
      if (!cardMapper(props.faceupCard)[2]) {
        if (cardtype !== "wd" && cardtype !== "wd4") {
          const myData = {
            id: 1,
            card: props.faceupCard,
          };
          socket.emit("intialCard", myData);
        }
      }
    }
  }, []);

  socket.on("win", (body) => {
    setfinalMessage(body.message);
    setdisable(true);
    socket.off("win");
  });
  socket.on("draw", (body) => {
    setfinalMessage(body.message);
    setdisable(true);
    socket.off("draw");
  });

  socket.on("response", (data: any) => {
    setResponse(data);
    socket.off("response");
  });

  return (
    <div>
      {finalMessaage !== "" && (
        <h1 className="text-3xl font-bold flex justify-center items-center text-red-500 p-4">
          {finalMessaage}
        </h1>
      )}
      <div className={disable ? "disable-screen" : "main-container"}>
        <div className="game-container">
          <div className="heading-container">
            <h1>UNO</h1>
            {Object.keys(response).length}
          </div>

          <Table {...props} {...response} />
          <Events {...props} {...response} />
        </div>

        <div className="messages-and-cards-container">
          <Messages {...props} {...response} />
          <Cards {...props} {...response} />
        </div>
      </div>
    </div>
  );
};

export default Game;
