import { parseImageInformationRequestURI } from "./internal/parseImageInformationRequestURI.js";
import { parseImageRequest } from "./internal/parseImageRequest";
import type { MalformedURI, ParseError, ParseResult } from "./types.js";

export function parseURI(uri: string): ParseResult {
  try {
    const url = new URL(uri);

    if (url.pathname.endsWith("info.json")) {
      return parseImageInformationRequestURI(url);
    } else {
      return parseImageRequest(url);
    }
  } catch (err) {
    return <ParseError>{
      tag: "error",
      uri,
      errors: [
        <MalformedURI>{
          tag: "malformedURI",
          value: uri,
        },
      ],
    };
  }
}
