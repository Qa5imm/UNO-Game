import { io } from "../../server";

export function sendDrawMessage() {
  const myData = {
    message: `Game Drawn,no more cards in deck`,
  };
  io.emit("draw", myData);
}
