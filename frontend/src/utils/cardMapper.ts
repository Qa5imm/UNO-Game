export function cardMapper(card: string): [string, string, boolean] {
  const colorMapper: any = { r: "red", b: "blue", g: "green", y: "yellow" };
  const typeMapper: any = {
    sk: "skip",
    d2: "draw-two",
    wd4: "draw-4",
    rv: "reverse",
    wd: "wild",
  };
  const array: string[] = card.split("_");
  let value: string = "";
  let color: string = colorMapper[array[1]];
  let numCheck = false;
  if (Number.isInteger(Number(array[0]))) {
    value = "num-" + array[0];
    numCheck = true;
  } else {
    value = typeMapper[array[0]];
  }
  return [color, value, numCheck];
}
