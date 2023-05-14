// number of players
export const tPlayers=4

 
// map to store user
export let userMap: any = {}; // for id
export let nameMap: any = {}; // for name


// check is the game reverse or not
export let reverse: any = {vaue: false};
// palyer turn
export let playerTurn: any = {value:1};
// color on facedUp card in discarded pile
export let currentColor: any = {value:""};
// number on facedUp card in discarded pile
export let currentNumber: any = {value:0};

//  map socket to playerId
export let playerIdMap: any= {};

// player states
export const PlayerDeck:any={
    1:[],
    2:[],
    3:[],
    4:[]
}
// export let deckPlayer1:string []=[];
// export let deckPlayer2:string []=[];
// export let deckPlayer3:string []=[];
// export let deckPlayer4:string []=[];

// initial state of discarded pile
export let discardPile:string[]=[]



// the main deck
export let drawPile: string[]=[
    '0_r',  '1_r',  '1_r',  '2_r',  '2_r',  '3_r',  '3_r',  '4_r','4_r',  '5_r',  '5_r',  '6_r',  '6_r',  '7_r',  '7_r',  '8_r','8_r',  '9_r',  '9_r', 
    '0_y',  '1_y',  '1_y',  '2_y',  '2_y','3_y',  '3_y',  '4_y',  '4_y',  '5_y',  '5_y',  '6_y',  '6_y','7_y',  '7_y',  '8_y',  '8_y',  '9_y',  '9_y', 
    '0_g',  '1_g','1_g',  '2_g',  '2_g',  '3_g',  '3_g',  '4_g',  '4_g',  '5_g','5_g',  '6_g',  '6_g',  '7_g',  '7_g',  '8_g',  '8_g',  '9_g',  '9_g', 
    '0_b',  '1_b',  '1_b',  '2_b',  '2_b',  '3_b',  '3_b','4_b',  '4_b',  '5_b',  '5_b',  '6_b',  '6_b',  '7_b',  '7_b','8_b',  '8_b',  '9_b',  '9_b',  
    "d2_r", "d2_r", "d2_y" , "d2_y" , "d2_g" , "d2_g", "d2_b" , "d2_b",
    "rv_r", "rv_r","rv_y", "rv_y","rv_b", "rv_b","rv_g", "rv_g",
    "sk_r", "sk_r","sk_y", "sk_y","sk_b", "sk_b","sk_g", "sk_g",
    "wd_r", "wd_y", "wd_b", "wd_g",
    "wd4_w", "wd4_w", "wd4_w", "wd4_w"
]



// helper functions

// shuffle the the draw pile
export function shuffleDrawPile(){
    drawPile = drawPile.sort((a, b) => 0.5 - Math.random());
}

//return key given a value
export function getKey(obj: any, elem: any) {
    for (let key in obj) {
      if (obj[key] === elem) {
        return key;
      }
    }
    return "";
  }