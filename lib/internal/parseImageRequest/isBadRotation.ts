import type { BadRotation } from "../../types.js";

export function isBadRotation(data: unknown): data is BadRotation {
  return !!(data && (data as BadRotation).tag === "badRotation");
}
