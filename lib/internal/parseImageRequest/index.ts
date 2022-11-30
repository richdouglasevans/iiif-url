import type {
  Format,
  ImageRequest,
  MalformedPath,
  ParseError,
  ParseErrorReason,
  Quality,
  Scheme,
} from "../../types.js";
import {
  isUnsupportedScheme,
  ParsedImageRequest,
  parseScheme,
  parseServer,
} from "../index.js";
import { toURI } from "../toURI.js";
import { isBadRegion } from "./isBadRegion.js";
import { isBadRotation } from "./isBadRotation.js";
import { isBadSize } from "./isBadSize.js";
import { isMissingFormat } from "./isMissingFormat.js";
import { isMissingQuality } from "./isMissingQuality.js";
import { parseQualityAndFormat } from "./parseQualityAndFormat.js";
import { parseRegion } from "./parseRegion.js";
import { parseRotation } from "./parseRotation.js";
import { parseSize } from "./parseSize.js";

export function parseImageRequest(url: URL): ImageRequest | ParseError {
  const server = parseServer(url.hostname, url.port);

  const errors: ParseErrorReason[] = [];

  const scheme = parseScheme(url.protocol);
  if (isUnsupportedScheme(scheme)) {
    errors.push(scheme);
  }

  const paths = url.pathname.split("/");

  if (paths.length < 6) {
    errors.push(<MalformedPath>{
      tag: "malformedPath",
      value: url.pathname,
      message: "Not enough parameters in URI",
    });
  }

  let quality: Quality | undefined = undefined;
  let format: Format | undefined = undefined;

  const qf = parseQualityAndFormat(paths.pop()!);

  if (!Array.isArray(qf)) {
    errors.push(qf);
  } else {
    const [maybeQuality, maybeFormat] = qf;

    if (isMissingQuality(maybeQuality)) {
      errors.push(maybeQuality);
    } else {
      quality = maybeQuality;
    }

    if (isMissingFormat(maybeFormat)) {
      errors.push(maybeFormat);
    } else {
      format = maybeFormat;
    }
  }

  if (errors.length > 0) {
    return <ParseError>{
      tag: "error",
      uri: url.href,
      errors,
    };
  }

  const maybeRotation = parseRotation(paths.pop()!);
  if (isBadRotation(maybeRotation)) {
    return <ParseError>{
      tag: "error",
      uri: url.href,
      errors: [maybeRotation],
    };
  }
  const rotation = maybeRotation;

  const maybeSize = parseSize(paths.pop()!);
  if (isBadSize(maybeSize)) {
    return <ParseError>{
      tag: "error",
      uri: url.href,
      errors: [maybeSize],
    };
  }
  const size = maybeSize;

  const maybeRegion = parseRegion(paths.pop()!);
  if (isBadRegion(maybeRegion)) {
    return <ParseError>{
      tag: "error",
      uri: url.href,
      errors: [maybeRegion],
    };
  }
  const region = maybeRegion;

  const identifier = decodeURIComponent(paths.pop()!);
  const prefix = paths.length > 1 ? paths.join("/") : undefined;

  const result: ParsedImageRequest = {
    tag: "imageRequest",
    scheme: scheme as Scheme,
    server,
    prefix,
    identifier,
    region,
    size,
    rotation,
    quality: quality!,
    format: format!,
  };

  return {
    ...result,
    uri: toURI(result).href,
  };
}
