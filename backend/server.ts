import {
  drawPile,
  userMap,
  nameMap,
  playerIdMap,
  tPlayers,
  PlayerDeck,
  playerTurn,
  discardPile,
  shuffleDrawPile,
} from "./utils/states";
import { randomPicker } from "./utils/randomPicker";
import { nextTurn } from "./utils/nextTurn";
import { resGenerator } from "./utils/resGenerator";
import { pickFromDeck } from "./utils/pickFromDeck";
import { sendMessageAll } from "./utils/sendResponse/sendMessageAll";
import { sendMessageOne } from "./utils/sendResponse/sendMessageOne";
import { sendWinMessage } from "./utils/sendResponse/sendWinMessage";
import { sendDrawMessage } from "./utils/sendResponse/sendDrawMessage";
const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// middle wares
app.use(cors());

// Routers
app.use("/user", require("./Router/userRoute"));

// // STATE VARIBLES

// count, track player number
let count: number = 0;
shuffleDrawPile();

// socket setup
const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

//local funtions
function getKey(obj: any, elem: any) {
  for (let key in obj) {
    if (obj[key] === elem) {
      return key;
    }
  }
  return "";
}

// path for communication with client
io.on("connection", (socket: any) => {
  // adding a new user
  socket.on("newUser", (myData: any) => {
    if (Object.keys(userMap).length < tPlayers) {
      count = count + 1;
      myData.name = String(count) + ". " + myData.name;
      userMap[myData.userId] = socket;
      nameMap[myData.name] = socket;
      playerIdMap[count] = socket;

      // to send confirmation msg
      myData = { added: true, id: count };
      socket.emit("added", myData);
    } else {
      // incase user limit exceeded
      myData = { added: false };
      socket.emit("added", myData);
    }
    // checking for 4 players to start the game
    if (Object.keys(userMap).length === tPlayers) {
      const socketId = Object.values(userMap);

      // picking the faceup card
      const randIndex = Math.floor(Math.random() * drawPile.length);
      const faceUp = drawPile.splice(randIndex, 1);
      // const faceUp = ["0_b"];
      // adding card to the discard pile
      discardPile.push(faceUp[0]);

      // sending all players the starting information (player names, faceUp card and respective player cards)
      socketId.forEach((socketClient: any) => {
        const playerNames = Object.keys(nameMap);
        const cards = randomPicker();
        const clientId = getKey(playerIdMap, socketClient);
        PlayerDeck[clientId] = cards;
        socketClient.emit("game", {
          players: playerNames,
          faceUp: faceUp[0],
          cards: cards,
          turn: 1,
        });
      });
    }
  });
  // intial faceup card
  socket.on("intialCard", (data: any) => {
    const id = data.id;
    const card = data.card;
    // checking the condition if correct player takes the turn
    if (id === playerTurn.value) {
      // generating the response to the move
      const { success, message, faceupCard, nextplayer } = resGenerator(
        card,
        playerTurn.value,
        true
      );
      sendMessageAll(success, message, faceupCard, nextplayer);
    } else {
      sendMessageOne(id);
    }
  });
  socket.on("cardThrown", (data: any) => {
    const id = data.id;
    const card = data.card;
    // checking the condition if correct player takes the turn
    if (id === playerTurn.value) {
      // generating the response to the move
      const { success, message, faceupCard, nextplayer } = resGenerator(
        card,
        playerTurn.value,
        false
      );

      sendMessageAll(success, message, faceupCard, nextplayer);
      // in case a player has no card left
      if (PlayerDeck[id].length === 0) {
        sendWinMessage(socket);
      }
    } else {
      sendMessageOne(id);
    }
  });

  socket.on("pickCard", (myData: any) => {
    const playerId = myData.id;
    if (playerId === playerTurn.value) {
      pickFromDeck(playerId);
      const myData = {
        message: `Players ${playerId} pick card from deck`,
        faceupCard: discardPile[discardPile.length - 1],
        success: true,
        nextplayer: playerId,
      };
      sendMessageAll(
        myData.success,
        myData.message,
        myData.faceupCard,
        myData.nextplayer
      );

      // in case there's no more card in deck(Draw Pile)
      if (drawPile.length === 0) {
        sendDrawMessage();
      }
    } else {
      sendMessageOne(playerId);
    }
  });
  socket.on("passTurn", (myData: any) => {
    const playerId = myData.id;
    if (playerId === playerTurn.value) {
      const nextplayer = nextTurn();
      const myData = {
        message: `Players ${playerId} pass turn`,
        faceupCard: discardPile[discardPile.length - 1],
        success: true,
        nextplayer: nextplayer,
      };
      sendMessageAll(
        myData.success,
        myData.message,
        myData.faceupCard,
        myData.nextplayer
      );
    } else {
      sendMessageOne(playerId);
    }
  });
});

// backend port setup
server.listen(3001, () => {
  console.log("SERVER IS LISTENING ON PORT 3001");
});
