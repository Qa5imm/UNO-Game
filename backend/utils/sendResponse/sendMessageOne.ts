import { io } from "../../server";
import { PlayerDeck, discardPile, playerIdMap, playerTurn } from "../states";

export function sendMessageOne(playerId: any) {
  io.to(playerIdMap[playerId].id).emit("response", {
    faceupCard: discardPile[discardPile.length - 1],
    nextplayer: playerTurn.value,
    cards: PlayerDeck[playerId],
    success: false,
    message: "invalid move",
  });
}
