import { ImageAnnotatorClient } from "@google-cloud/vision";

const runtimeConfig = useRuntimeConfig();

const credentials = runtimeConfig.googleApplicationCredentialsJson as any;
const client = new ImageAnnotatorClient({
  credentials,
});

interface Color {
  fraction: string;
  color: string;
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
          maxResults: 5,
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

    const dominantColors =
      result.imagePropertiesAnnotation.dominantColors.colors
        .filter((color) => !!color.pixelFraction)
        .sort((a, b) => b.pixelFraction! - a.pixelFraction!)
        .map((color) => ({
          pixelFraction: color.pixelFraction || 0,
          color: color.color || {},
        })) || [];

    const totalColors = dominantColors.reduce(
      (sum, color) => sum + (color.pixelFraction || 0),
      0
    );

    const colors: Color[] = dominantColors.map(({ color, pixelFraction }) => {
      const fraction =
        (((pixelFraction || 0) / totalColors) * 100).toFixed(2) + "%";

      return {
        fraction,
        color: `rgb(${color?.red},${color?.green},${color?.blue})`,
      };
    });

    return { objects, colors, labels };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
