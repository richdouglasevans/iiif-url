import type {
  ImageInformationRequest,
  ImageRequest,
  Scheme,
  Server,
  UnsupportedScheme,
} from "../types.js";

export { parseImageRequest } from "./parseImageRequest";

export function parseScheme(protocol: string): Scheme | UnsupportedScheme {
  switch (protocol) {
    case "http:":
      return "http";

    case "https:": {
      return "https";
    }

    default: {
      return <UnsupportedScheme>{
        tag: "unsupportedScheme",
        // strip off the trailing colon
        value: protocol.substring(0, protocol.length - 1),
        message: "The only supported schemes are http and https",
      };
    }
  }
}

export function parseServer(host: string, port: string): Server {
  return {
    host,
    port: port === "" ? undefined : port,
  };
}

export function isUnsupportedScheme(data: unknown): data is UnsupportedScheme {
  return !!(data && (data as UnsupportedScheme).tag === "unsupportedScheme");
}

/**
 * Used internally when we've parsed most of the IIIF state.
 *
 * We don't have the URI yet because that'll be derived from this
 * intermediary type.
 */
export type ParsedImageRequest = Omit<ImageRequest, "uri">;

/**
 * Used internally when we've parsed most of the IIIF state.
 *
 * We don't have the URI yet because that'll be derived from this
 * intermediary type.
 */
export type ParsedImageInformationRequest = Omit<
  ImageInformationRequest,
  "uri"
>;
