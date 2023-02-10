import { createHash } from "node:crypto";
import { logger } from "../logger";

export function generateSignature(data: any) {
  try {
    data = JSON.stringify(data);
    const buffer = Buffer.from(data);
    return createHash("sha256").update(buffer).digest("hex");
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}

export function validateSignature(signature: string, data: any) {
  return generateSignature(data) === signature;
}
