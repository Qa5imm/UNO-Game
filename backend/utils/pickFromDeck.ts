import { PlayerDeck, drawPile } from "./states";

export function pickFromDeck(playerId: any) {
  const lastIndex = drawPile.length - 1;
  const lastCard = drawPile[lastIndex];

  // topmost card removed from the draw pile
  drawPile.splice(lastIndex, 1);
  // Add an card to the players deck'
  PlayerDeck[playerId].push(lastCard);
}
