import type {
  MalformedPath,
  MissingFormat,
  MissingQuality,
} from "../../types.js";
import { parseFormat } from "./parseFormat.js";
import { parseQuality } from "./parseQuality.js";

export function parseQualityAndFormat(
  data: string
):
  | [ReturnType<typeof parseQuality>, ReturnType<typeof parseFormat>]
  | MalformedPath
  | MissingQuality
  | MissingFormat {
  const indexOfDot = data.indexOf(".");

  if (indexOfDot === -1) {
    // we've got something like "default" or "jpg"
    return <MalformedPath>{
      tag: "malformedPath",
      value: data,
    };
  }

  if (indexOfDot === 0) {
    // we've got something like ".jpg" so we're missing the quality
    return <MissingQuality>{
      tag: "missingQuality",
      value: data,
    };
  }

  if (indexOfDot === data.length - 1) {
    // we've got something like "default." so we're missing the format (the file extension)
    return <MissingFormat>{
      tag: "missingFormat",
      value: data,
    };
  }

  const parts = data.split(".");

  if (parts.length != 2) {
    // we've got something like "default.funky.jpg"
    return <MalformedPath>{
      tag: "malformedPath",
      value: data,
    };
  }

  return [parseQuality(parts[0]!), parseFormat(parts[1]!)];
}
