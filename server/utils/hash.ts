import { createHash } from "node:crypto";

export function generateSignature(data: any) {
  data = JSON.stringify(data);
  const buffer = Buffer.from(data);
  return createHash("sha256").update(buffer).digest("hex");
}

export function validateSignature(signature: string, data: any) {
  return generateSignature(data) === signature;
}
