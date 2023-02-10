import Crypto from "node:crypto";
import Sharp from "sharp";

export async function processImage(base64: string) {
  const uri = base64.split(";base64,").pop();
  if (!uri) {
    return undefined;
  }

  try {
    const imgBuffer = Buffer.from(uri, "base64");
    const buffer = await Sharp(imgBuffer).jpeg().resize(800, null).toBuffer();
    const base64 = `data:image/jpeg;base64,` + buffer.toString("base64");

    return { buffer, base64 };
  } catch (error) {
    return undefined;
  }
}
