import { PlayerDeck, discardPile } from "./states";

export function throwCard(playerId: string, card: string) {
  let playerCard = PlayerDeck[playerId];
  const index = playerCard.indexOf(card);

  //removing specific card from the player's cards
  if (index !== -1) {
    playerCard.splice(index, 1);
    PlayerDeck[playerId] = playerCard;
    // addiding that card to discard pile
    discardPile.push(card);
  }
}
