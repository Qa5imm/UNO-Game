import { nextTurn } from "./nextTurn";
import { PlayerDeck, discardPile, playerTurn, reverse } from "./states";
import { throwCard } from "./throwCard";
import { cardMapper } from "./cardMapper";
import { pickFromDeck } from "./pickFromDeck";

// contain all game rules

export function resGenerator(card: any, playerId: any, intial = false) {
  const tempArr = card.split("_");
  const type = tempArr[0];
  const color = tempArr[1];
  let nextPlayerTurn = 0;
  let nextplayer = 0;
  let myReverse = false;
  let message = "";
  let success = false;
  const lastCard = discardPile[discardPile.length - 1];
  const lastCardType = lastCard.split("_")[0];
  const lastCardColor = lastCard.split("_")[1];
  let faceupCard = "";
  let currentPlayerId = playerId;

  //  Number Cards
  if (Number.isInteger(Number(type))) {
    if (
      color === lastCardColor ||
      type === lastCardType ||
      lastCard === "wd4_w" ||
      lastCardType == "wd"
    ) {
      success = true;
      nextplayer = nextTurn();
      throwCard(playerId, card);
      message = `Player ${playerId} played  ${cardMapper(card)[1]} of ${
        cardMapper(card)[0]
      } `;
    } else {
      message = "invalid move";
    }
    if (success) {
      faceupCard = card;
    } else {
      let lastCard = discardPile[discardPile.length - 1];
      faceupCard = lastCard;
    }
  } else {
    // action Cards
    if (type === "sk") {
      if (
        lastCardColor === color ||
        lastCard === "wd4_w" ||
        lastCardType == "wd"
      ) {
        success = true;
        message = `faceup card was skip card`;

        //removing card from player's deck if it's not the first faceup card
        if (!intial) {
          message = `player ${playerId} played skip card`;
          throwCard(playerId, card);
        }
        // changing the turn
        nextPlayerTurn = nextTurn(2);
      } else {
        message = "invalid move";
      }
    }
    if (type === "rv") {
      if (
        lastCardColor === color ||
        lastCard === "wd4_w" ||
        lastCardType == "wd"
      ) {
        reverse.value = !reverse.value;
        success = true;
        message = `faceup card was reverse`;
        //removing card from player's deck if it's not the first faceup card
        if (!intial) {
          message = `player ${playerId} played reverse card`;
          throwCard(playerId, card);
        }
        // changing the turn
        nextPlayerTurn = nextTurn();
      } else {
        message = "invalid move";
      }
    }

    if (type === "d2") {
      if (lastCardColor === color || lastCardType === "d2") {
        success = true;
        message = `faceup card was draw 2,two cards added to next player's deck`;
        //removing card from player's deck if it's not the first faceup card
        if (!intial) {
          throwCard(playerId, card);
          message = `player ${playerId} played draw 2 card,two cards added to next player's deck`;
        }
        throwCard(playerId, card);
        let nextplayer = nextTurn();
        for (let i = 0; i < 2; i++) {
          pickFromDeck(nextplayer);
        }
      } else {
        message = "invalid move";
      }
    }

    if (type === "wd") {
      if (lastCardType !== "d2" && lastCardType !== "wd4") {
        if (intial) {
          // implmented on the frontend
        } else {
          success = true;
          message = `player ${playerId} played wild card, player ${playerId} will take another move`;
          //removing card from player's deck
          throwCard(playerId, card);
        }
      } else {
        message = "invalid move";
      }
    }
    if (type === "wd4") {
      if (lastCardType !== "d2" && lastCardType !== "wd4") {
        if (intial) {
          // implemented on the frontend
        } else {
          let playerCards = PlayerDeck[playerId];
          let colorCheck = false;
          // checking if the player has any color that matches the color of the card previouly played
          playerCards.forEach((card: string) => {
            const cardColor = card.split("_")[1];
            if (cardColor === lastCardColor) {
              colorCheck = true;
            }
          });
          // incase a same color card exist
          if (colorCheck) {
            message = "invalid move";
          } else {
            success = true;
            message = `player ${playerId} played wild card 4, four cards added to next player's deck`;
            //removing card from current player's deck
            throwCard(playerId, card);
            let nextplayer = nextTurn();
            for (let i = 0; i < 4; i++) {
              pickFromDeck(nextplayer);
            }
            //skipping the turn of the next player
            nextplayer = nextTurn();
          }
        }
      } else {
        message = "invalid move";
      }
    }
    if (success) {
      faceupCard = card;
    } else {
      let lastCard = discardPile[discardPile.length - 1];
      faceupCard = lastCard;
    }
  }

  return {
    success: success,
    faceupCard: faceupCard,
    message: message,
    nextplayer: playerTurn.value,
    currentPlayerDeck: PlayerDeck[currentPlayerId],
    nextPlayerDeck: PlayerDeck[playerTurn.value],
  };
}
