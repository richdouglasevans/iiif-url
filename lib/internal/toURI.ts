import type { Region, Rotation, Size } from "../types.js";

import type {
  ParsedImageInformationRequest,
  ParsedImageRequest,
} from "./index.js";

export function toURI(
  request: ParsedImageRequest | ParsedImageInformationRequest
): URL {
  switch (request.tag) {
    case "imageRequest":
      return toImageRequestURI(request);

    case "imageInformationRequest":
      return toImageInformationRequestURI(request);

    default:
      return ((_: never) => _)(request);
  }
}

function toImageInformationRequestURI(
  request: ParsedImageInformationRequest
): URL {
  return new URL(`${toPath(request)}/info.json`, toBase(request));
}

function toImageRequestURI(request: ParsedImageRequest): URL {
  const region = serializeRegion(request.region);
  const size = serializeSize(request.size);
  const rotation = serializeRotation(request.rotation);

  return new URL(
    `${toPath(request)}/${region}/${size}/${rotation}/${request.quality}.${
      request.format
    }`,
    toBase(request)
  );
}

function serializeRegion(region: Region): string {
  switch (region.tag) {
    case "full":
      return "full";

    case "square":
      return "square";

    case "pixels":
      return `${region.x},${region.y},${region.w},${region.h}`;

    case "percentages":
      return `pct:${region.x},${region.y},${region.w},${region.h}`;

    default:
      return ((_: never) => _)(region);
  }
}

function serializeSize(size: Size): string {
  switch (size.tag) {
    case "full":
      return "full";

    case "max":
      return "max";

    case "percentage":
      return `pct:${size.percentage}`;

    case "width":
      return `${size.w},`;

    case "height":
      return `,${size.h}`;

    case "widthAndHeight":
      return `${size.w},${size.h}`;

    case "constrained":
      return `!${size.w},${size.h}`;

    default:
      return ((_: never) => _)(size);
  }
}

function serializeRotation(rotation: Rotation): string {
  switch (rotation.tag) {
    case "clockwise":
      return `${rotation.degrees}`;

    case "mirrored":
      return `!${rotation.degrees}`;

    default:
      return ((_: never) => _)(rotation);
  }
}

function toBase(
  request: ParsedImageRequest | ParsedImageInformationRequest
): URL {
  const server = request.server.port
    ? `${request.server.host}:${request.server.port}`
    : request.server.host;

  return new URL(`${request.scheme}://${server}`);
}

function toPath(
  request: ParsedImageRequest | ParsedImageInformationRequest
): string {
  return request.prefix
    ? `${request.prefix}/${encodeURIComponent(request.identifier)}`
    : encodeURIComponent(request.identifier);
}
