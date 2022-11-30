export type ParseResult = ImageRequest | ImageInformationRequest | ParseError;

export type Scheme = "http" | "https";

/**
 * The host server on which the service resides.
 */
export type Server = {
  host: string;
  port: string | undefined;
};

/**
 * The path on the host server to the service.
 */
export type Prefix = string;

/**
 * The identifier of the requested image.
 *
 * This may be an ark, URN, filename, or other identifier.
 */
export type Identifier = string;

/**
 * The format of the returned image.
 *
 * @example `jpg`
 * @example `tif`
 * @example `png`
 */
export type Format = string;

/**
 * The rectangular portion of the full image to be returned.
 */
export type Region =
  | RegionFull
  | RegionSquare
  | RegionPixels
  | RegionPercentages;

/**
 * The complete image is returned, without any cropping.
 */
export type RegionFull = {
  tag: "full";
};

/**
 * The region is defined as an area where the width and height are
 * both equal to the length of the shorter dimension of the complete image.
 */
export type RegionSquare = {
  tag: "square";
};

/**
 * The region of the full image to be returned
 * is specified in terms of absolute pixel values.
 */
export type RegionPixels = {
  tag: "pixels";
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * The region of the full image to be returned
 * is specified as a sequence of percentages of
 * the full image’s dimensions.
 */
export type RegionPercentages = {
  tag: "percentages";
  x: number;
  y: number;
  w: number;
  h: number;
};

/**
 * The dimensions to which the extracted region,
 * which might be the full image, is to be scaled.
 */
export type Size =
  | SizeMax
  | SizePercentage
  | SizeWidth
  | SizeHeight
  | SizeWidthAndHeight
  | SizeConstrained;

/**
 * The extracted region is returned at the maximum size
 * available, but will not be upscaled.
 */
export type SizeMax = {
  tag: "max";
  scaled: boolean;
};

/**
 * The width and height of the returned image is scaled
 * to `n` percent of the width and height of the extracted region.
 */
export type SizePercentage = {
  tag: "percentage";
  percentage: number;
  scaled: boolean;
};

/**
 * The extracted region should be scaled so that the
 * width of the returned image is exactly equal to `w`.
 */
export type SizeWidth = {
  tag: "width";
  w: number;
  scaled: boolean;
};

/**
 * The extracted region should be scaled so that the
 * width of the returned image is exactly equal to `h`.
 */
export type SizeHeight = {
  tag: "height";
  h: number;
  scaled: boolean;
};

/**
 * The width and height of the returned image are exactly `w` and `h`.
 */
export type SizeWidthAndHeight = {
  tag: "widthAndHeight";
  w: number;
  h: number;
  scaled: boolean;
};

/**
 * The extracted region is scaled so that the width and height
 * of the returned image are not greater than `w` and `h`.
 */
export type SizeConstrained = {
  tag: "constrained";
  w: number;
  h: number;
  scaled: boolean;
};

/**
 * Specifies rotation and mirroring.
 */
export type Rotation = RotationClockwise | RotationMirrored;

/**
 * The degrees of clockwise rotation from `0` up to `360`.
 */
export type RotationClockwise = {
  tag: "clockwise";
  degrees: number;
};

/**
 * The image should be mirrored and then rotated.
 */
export type RotationMirrored = {
  tag: "mirrored";
  degrees: number;
};

/**
 * Whether the image is delivered in color, grayscale, or black and white.
 */
export type Quality = "color" | "gray" | "bitonal" | "default" | string;

type Request = {
  uri: string;
  scheme: Scheme;
  server: Server;
  prefix: Prefix | undefined;
  identifier: Identifier;
};

/**
 * A request for an image.
 *
 * @see https://iiif.io/api/image/3.0/#4-image-requests
 */
export type ImageRequest = Request & {
  tag: "imageRequest";
  region: Region;
  size: Size;
  rotation: Rotation;
  quality: Quality;
  format: Format;
};

/**
 * A request for image information.
 *
 * @see https://iiif.io/api/image/3.0/#5-image-information
 */
export type ImageInformationRequest = Request & {
  tag: "imageInformationRequest";
};

export type ParseErrorReason =
  | MalformedURI
  | UnsupportedScheme
  | MalformedPath
  | BadSize
  | BadRegion
  | BadRotation
  | MissingQuality
  | MissingFormat;

export type ParseError = {
  tag: "error";
  uri: string;
  errors: [ParseErrorReason, ...ParseErrorReason[]];
};

export type UnsupportedScheme = {
  tag: "unsupportedScheme";
  value: string;
  message: string;
};

export type BadRotation = {
  tag: "badRotation";
  value: string;
  message: string;
};

export type BadSize = {
  tag: "badSize";
  value: string;
  message: string;
};

export type BadRegion = {
  tag: "badRegion";
  value: string;
};

export type MalformedURI = {
  tag: "malformedURI";
  value: string;
};

export type MalformedPath = {
  tag: "malformedPath";
  value: string;
  message: string;
};

export type MissingQuality = {
  tag: "missingQuality";
  value: string;
};

export type MissingFormat = {
  tag: "missingFormat";
  value: string;
};
