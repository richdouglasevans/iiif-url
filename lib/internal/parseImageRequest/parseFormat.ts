import type { Format, MissingFormat } from "../../types.js";

export function parseFormat(data: string): Format | MissingFormat {
  if (data?.length === 0) {
    return <MissingFormat>{
      tag: "missingFormat",
      value: data,
    };
  }

  return data;
}
