import type { MissingFormat } from "../../types.js";

export function isMissingFormat(data: unknown): data is MissingFormat {
  return !!(data && (data as MissingFormat).tag === "missingFormat");
}
