import type { BadRegion } from "../../types.js";

export function isBadRegion(data: unknown): data is BadRegion {
  return !!(data && (data as BadRegion).tag === "badRegion");
}
