import { io } from "../../server";
import { getKey, nameMap } from "../states";

export function sendWinMessage(socket: any) {
  const playerName = getKey(nameMap, socket);
  const myData = {
    message: `Player ${playerName} wins the game`,
  };
  io.emit("win", myData);
}
