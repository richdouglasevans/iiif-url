import type {
  BadRegion,
  Region,
  RegionFull,
  RegionSquare,
} from "../../types.js";

export function parseRegion(data: string): Region | BadRegion {
  if (data === "full") {
    return <RegionFull>{
      tag: "full",
    };
  }

  if (data === "square") {
    return <RegionSquare>{
      tag: "square",
    };
  }

  if (data.split("").filter((char) => char === ",").length != 3) {
    // there must be exactly 3 commas: "x,y,w,h"
    return <BadRegion>{
      tag: "badRegion",
      value: data,
    };
  }

  const isUsingPercentages = data.startsWith("pct:");

  const parse = isUsingPercentages
    ? parseFloat
    : (n: string) => parseInt(n, 10);

  const ns = (isUsingPercentages ? data.substring(4) : data)
    .split(",")
    .map(parse)
    .filter((n: number | undefined): n is number => n != undefined)
    .filter((n: number): n is number => !isNaN(n))
    .filter((n: number): n is number => n >= 0);

  if (ns.length != 4) {
    return <BadRegion>{
      tag: "badRegion",
      value: data,
    };
  }

  const [x, y, w, h] = ns as [number, number, number, number];

  const tag = isUsingPercentages ? "percentages" : "pixels";

  return {
    tag,
    x,
    y,
    w,
    h,
  };
}
