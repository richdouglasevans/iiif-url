import type {
  ImageInformationRequest,
  MalformedPath,
  ParseError,
  ParseErrorReason,
  Scheme,
} from "../types.js";
import {
  isUnsupportedScheme,
  ParsedImageInformationRequest,
  parseScheme,
  parseServer,
} from "./index.js";
import { toURI } from "./toURI.js";

/**
 * Parse a IIIF Image Informatio Request URI.
 *
 * @param url *must* end in `info.json`
 */
export function parseImageInformationRequestURI(
  url: URL
): ImageInformationRequest | ParseError {
  const server = parseServer(url.hostname, url.port);

  const errors: ParseErrorReason[] = [];

  const scheme = parseScheme(url.protocol);
  if (isUnsupportedScheme(scheme)) {
    errors.push(scheme);
  }

  const paths = url.pathname.split("/");

  if (paths.length <= 2) {
    errors.push(<MalformedPath>{
      tag: "malformedPath",
      value: url.pathname,
      message: "Missing <prefix>/identifier",
    });
  }

  if (errors.length > 0) {
    return <ParseError>{
      tag: "error",
      uri: url.href,
      errors,
    };
  }

  // strip the trailing "info.json"; we know the URL ends
  // in "info.json" else we wouldn't be in this function
  paths.pop();

  const identifier = decodeURIComponent(paths.pop()!);
  const prefix = paths.length > 1 ? paths.join("/") : undefined;

  const result: ParsedImageInformationRequest = {
    tag: "imageInformationRequest",
    scheme: scheme as Scheme,
    server,
    prefix,
    identifier,
  };

  return {
    ...result,
    uri: toURI(result).href,
  };
}
