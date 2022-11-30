import type { MissingQuality, Quality } from "../../types.js";

export function parseQuality(data: string): Quality | MissingQuality {
  if (data?.length === 0) {
    return <MissingQuality>{
      tag: "missingQuality",
      value: data,
    };
  }

  return data;
}
