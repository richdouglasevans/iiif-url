import type {
  BadRotation,
  Rotation,
  RotationClockwise,
  RotationMirrored,
} from "../../types.js";

export function parseRotation(data: string): Rotation | BadRotation {
  const isMirrored = data.startsWith("!");

  const n = isMirrored ? data.substring(1) : data;

  const degrees = Number.parseFloat(n);

  if (isNaN(degrees)) {
    return <BadRotation>{
      tag: "badRotation",
      value: data,
      message: `Error parsing '${n}' into degree of rotation`,
    };
  }

  if (degrees < 0) {
    return <BadRotation>{
      tag: "badRotation",
      value: data,
      message: "The degree of rotation must be >= 0",
    };
  }

  if (degrees > 360) {
    return <BadRotation>{
      tag: "badRotation",
      value: data,
      message: "The degree of rotation must be <= 360",
    };
  }

  return isMirrored
    ? <RotationMirrored>{
        tag: "mirrored",
        degrees,
      }
    : <RotationClockwise>{
        tag: "clockwise",
        degrees,
      };
}
