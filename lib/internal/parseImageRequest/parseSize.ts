import type {
  BadSize,
  Size,
  SizeHeight,
  SizeMax,
  SizePercentage,
  SizeConstrained,
  SizeWidth,
  SizeWidthAndHeight,
} from "../../types.js";
import { isBadSize } from "./isBadSize.js";

export function parseSize(input: string): Size | BadSize {
  const parseInteger = parseNumber(
    (n) => parseInt(n, 10),
    input,
    1 /* minimum */
  );

  const isScaled = input.startsWith("^");

  const data = isScaled ? input.substring(1) : input;

  // pct:n
  if (data.indexOf("pct:") === 0) {
    const percentage = parseNumber(
      parseFloat,
      data,
      0 /* minimum */
    )(data.substring(4));

    if (isBadSize(percentage)) {
      return percentage;
    }

    return <SizePercentage>{
      tag: "percentage",
      percentage,
      scaled: isScaled,
    };
  }

  // w,
  if (data.endsWith(",")) {
    const width = parseInteger(data.substring(0, data.length - 1));

    if (isBadSize(width)) {
      return width;
    }

    return <SizeWidth>{
      tag: "width",
      w: width,
      scaled: isScaled,
    };
  }

  // ,h
  if (data.startsWith(",")) {
    const height = parseInteger(data.substring(1));

    if (isBadSize(height)) {
      return height;
    }

    return <SizeHeight>{
      tag: "height",
      h: height,
      scaled: isScaled,
    };
  }

  // !w,h
  if (data.startsWith("!")) {
    if (data.indexOf(",") < 0) {
      return <BadSize>{
        tag: "badSize",
        value: data,
        message: "Unable to parse value into a size",
      };
    }

    const result = parseTwoNumbers(
      parseInteger,
      data.substring(1) /* strip off the leading ! */
    );

    if (isBadSize(result)) {
      return result;
    }

    return <SizeConstrained>{
      tag: "constrained",
      w: result[0],
      h: result[1],
      scaled: isScaled,
    };
  }

  // w,h
  if (data.indexOf(",") >= 0) {
    const result = parseTwoNumbers(parseInteger, data);

    if (isBadSize(result)) {
      return result;
    }

    return <SizeWidthAndHeight>{
      tag: "widthAndHeight",
      w: result[0],
      h: result[1],
      scaled: isScaled,
    };
  }

  // max
  if (data === "max") {
    return <SizeMax>{
      tag: "max",
      scaled: isScaled,
    };
  }

  if (data === "full") {
    return <BadSize>{
      tag: "badSize",
      value: data,
      message:
        "The value full is no longer allowed for the size parameter, max must be used instead",
    };
  }

  return <BadSize>{
    tag: "badSize",
    value: data,
    message: "Unable to parse value into a size",
  };
}

function parseNumber(
  parse: (data: string) => number,
  data: string,
  minimum: number
): (input: string) => number | BadSize {
  return (input) => {
    const n = parse(input);

    if (isNaN(n)) {
      return <BadSize>{
        tag: "badSize",
        value: data,
        message: `Error parsing '${input}'`,
      };
    }

    if (n < minimum) {
      return <BadSize>{
        tag: "badSize",
        value: data,
      };
    }

    return n;
  };
}

function parseTwoNumbers(
  parse: (input: string) => number | BadSize,
  data: string
): BadSize | [x: number, y: number] {
  const ns = data.split(",");
  if (ns.length != 2) {
    return <BadSize>{
      tag: "badSize",
      value: data,
      message: `Error parsing size: expecting 2 values, got ${ns.length}`,
    };
  }

  const [x, y] = ns as [string, string];

  const X = parse(x);
  if (isBadSize(X)) {
    return X;
  }

  const Y = parse(y);
  if (isBadSize(Y)) {
    return Y;
  }

  return [X, Y];
}
