// Game interface

export interface gameProps {
  players: string[];
  faceUp: string;
  cards: string[];
  nextplayer: number;
}

export interface cards {
  cards: string[];
}

export interface messgaeProps {
  nextplayer: number;
}
