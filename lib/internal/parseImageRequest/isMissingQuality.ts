import type { MissingQuality } from "../../types.js";

export function isMissingQuality(data: unknown): data is MissingQuality {
  return !!(data && (data as MissingQuality).tag === "missingQuality");
}
