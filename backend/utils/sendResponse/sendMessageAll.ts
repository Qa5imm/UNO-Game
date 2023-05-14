import {
  PlayerDeck,
  getKey,
  playerIdMap,
  userMap,
} from '../states';


// sending all players the updated game informtaion
export function sendMessageAll(
  success: any,
  message: any,
  faceupCard: any,
  nextplayer: any
) {
  const socketId = Object.values(userMap);
  socketId.forEach((socketClient: any) => {
    const clientId = getKey(playerIdMap, socketClient);
    const myData = {
      message,
      faceupCard,
      success,
      nextplayer,
      cards: PlayerDeck[clientId],
    };
    socketClient.emit("response", myData);
  });
}

