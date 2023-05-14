import { useEffect, useState } from "react";
import "./Main.css";
import HomePage from "../Home/Home";
import Game from "../Game/Game";
import { socket } from "../../socket/socketio";

const Main = () => {
  const [gameState, setGameState] = useState(false);
  const [players, setPlayers] = useState([]);
  const [faceUp, setFaceup] = useState("");
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);

  // listeing to requests
  socket.on("game", (myData: any) => {
    setGameState(true);
    setPlayers(myData.players);
    setFaceup(myData.faceUp);
    setCards(myData.cards);
    setTurn(myData.turn);
    socket.off("game");
  });

  return (
    <div>
      {gameState ? (
        <Game
          players={players}
          faceupCard={faceUp}
          cards={cards}
          nextplayer={turn}
        />
      ) : (
        <HomePage />
      )}
    </div>
  );
};

export default Main;
