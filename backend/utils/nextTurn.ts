import { tPlayers, reverse, playerTurn } from "./states";

// change and return the next turn
export function nextTurn(jump = 1) {
  // check for the reverse value
  if (!reverse.value) {
    if (playerTurn.value + jump >= tPlayers + 1) {
      playerTurn.value = playerTurn.value + jump - tPlayers;
    } else {
      playerTurn.value = playerTurn.value + jump;
    }
  } else {
    if (playerTurn.value - jump <= 0) {
      playerTurn.value = playerTurn.value - jump + tPlayers;
    } else {
      playerTurn.value = playerTurn.value - jump;
    }
  }
  return playerTurn.value;
}
