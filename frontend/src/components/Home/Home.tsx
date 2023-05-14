import { Socket } from "socket.io-client";
import "./Home.css";
import { useState } from "react";
import { socket } from "../../socket/socketio";
import { useDispatch } from "react-redux";
import { setUserId } from "../../redux/features/userId";

function HomePage() {
  const [name, setName] = useState("");
  const [buttonSate, setButtonState] = useState(false);
  const [waitingState, setwaitingState] = useState(false);
  const [msgState, setMsgState] = useState(false);

  const dispatch = useDispatch();

  // to check if new user don't exceed the player limit
  socket.on("added", (myData) => {
    setMsgState(true);
    if (myData.added) {
      setwaitingState(true);
      dispatch(setUserId(myData.id));
    }
  });

  //click handler
  const handleClick = (socket: Socket) => {
    // connection to the server
    socket.connect();

    // generating a randomId to control for renders on refresh
    const randomId = String(Math.random());
    const myData = { userId: randomId, name: name };
    localStorage.setItem("gameState", "inprogress");
    socket.emit("newUser", myData);

    // making the button disabled and waiting msg to be displayed
    setButtonState(true);
  };

  // event handler
  const eventHandler = (e: any) => {
    if (e.key === "Enter") {
      handleClick(socket);
    }
  };

  return (
    <>
      <div className="sampleHomePage">
        <h1 className="sampleTitle">My Game</h1>
        <div className="sampleMessage">
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder="message"
            onKeyDown={(e) => eventHandler(e)}
            disabled={buttonSate}
            autoFocus
          ></input>
          <button
            className="ml-3 border-2 bg-gray-400 disabled:opacity-75"
            disabled={buttonSate}
            onClick={() => handleClick(socket)}
          >
            Enter your name
          </button>
          {msgState &&
            (waitingState ? (
              <p className="text-white  mt-12 text-2xl">
                Wait for other players to join!
              </p>
            ) : (
              <p className="text-white  mt-12 text-2xl">
                player limit exceeded!
              </p>
            ))}
        </div>
      </div>
    </>
  );
}
export default HomePage;
