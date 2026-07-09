import { parseImageInformationRequestURI } from "./internal/parseImageInformationRequestURI.js";
import { parseImageRequest } from "./internal/parseImageRequest/index.js";
import type { MalformedURI, ParseError, ParseResult } from "./types.js";

export function parseURI(uri: string): ParseResult {
  try {
    const url = new URL(uri);

    if (url.pathname.endsWith("info.json")) {
      return parseImageInformationRequestURI(url);
    }
    return parseImageRequest(url);
  } catch {
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
