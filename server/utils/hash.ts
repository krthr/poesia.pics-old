import { createHash } from "node:crypto";
import { logger } from "../logger";

export function generateSignature(data: any = {}) {
  try {
    const ordered = Object.keys(data)
      .sort()
      .reduce((obj: any, key) => {
        if (typeof data[key] === "undefined") {
          return obj;
        }

        obj[key] = data[key];
        return obj;
      }, {});

    const buffer = Buffer.from(JSON.stringify(ordered));
    return createHash("sha256").update(buffer).digest("hex");
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export function validateSignature(signature: string, data: any) {
  return generateSignature(data) === signature;
}
