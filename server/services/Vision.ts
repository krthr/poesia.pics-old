import { ImageAnnotatorClient, protos } from "@google-cloud/vision";
import { logger } from "../logger";

const runtimeConfig = useRuntimeConfig();

const credentials = runtimeConfig.googleApplicationCredentialsJson as any;
const client = new ImageAnnotatorClient({
  credentials,
});

export interface Color {
  color: {
    red: number;
    green: number;
    blue: number;
  };
  pixelFraction: number;
}

interface AnnotateImage {
  labels: string[];
  objects: string[];
  colors: Color[];
}

export async function annotateImage(
  content: Buffer
): Promise<AnnotateImage | undefined> {
  try {
    const [result] = await client.annotateImage({
      image: {
        content,
      },
      features: [
        {
          maxResults: 10,
          type: "OBJECT_LOCALIZATION",
        },
        {
          maxResults: 10,
          type: "LABEL_DETECTION",
        },
        {
          maxResults: 10,
          type: "IMAGE_PROPERTIES",
        },
      ],
    });

    if (
      !(
        result.localizedObjectAnnotations &&
        result.labelAnnotations &&
        result.imagePropertiesAnnotation?.dominantColors?.colors?.length
      )
    ) {
      return undefined;
    }

    const objects =
      result.localizedObjectAnnotations
        .filter((object) => object.name && object.score && object.score >= 0.7)
        .map((o) => o.name!) || [];

    const labels =
      result.labelAnnotations
        .filter(
          (label) =>
            label.score &&
            label.score >= 0.7 &&
            label.description &&
            label.description.length <= 25
        )
        .map((l) => l.description!) || [];

    const total = result.imagePropertiesAnnotation.dominantColors.colors.reduce(
      (sum, color) => {
        return sum + (color.pixelFraction || 0);
      },
      0
    );

    const colors: Color[] =
      result.imagePropertiesAnnotation.dominantColors.colors
        .sort((a, b) => b.pixelFraction! - a.pixelFraction!)
        .map(({ color, pixelFraction }) => ({
          color: {
            red: color?.red || 0,
            green: color?.green || 0,
            blue: color?.blue || 0,
          },
          pixelFraction: (pixelFraction || 0) / total,
        })) || [];

    return { objects, colors, labels };
  } catch (error) {
    logger.error(error);
    return undefined;
  }
}
