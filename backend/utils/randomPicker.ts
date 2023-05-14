import { drawPile } from "./states";

export function randomPicker(): string[] {
  let subset: string[] = [];
  let count = 0;
  while (count != 7) {
    let randIndex = Math.floor(Math.random() * drawPile.length);
    let value = drawPile.splice(randIndex, 1)[0];
    subset.push(value);
    count++;
  }
  return subset;
}
