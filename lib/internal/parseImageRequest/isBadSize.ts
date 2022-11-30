import type { BadSize } from "../../types.js";

export function isBadSize(data: unknown): data is BadSize {
  return !!(data && (data as BadSize).tag === "badSize");
}
