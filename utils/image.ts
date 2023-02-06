import { toBlob } from "html-to-image";

export async function generateAndDownloadImage(
  node: HTMLElement,
  poem: string
) {
  const device = useDevice();

  if (device.isSafari || device.isIos || device.isMacOS) {
    // https://github.com/bubkoo/html-to-image/issues/361#issuecomment-1402537176
    await toBlob(node);
    await toBlob(node);
    await toBlob(node);
  }

  const blob = await toBlob(node, {
    type: "image/jpeg",
    backgroundColor: "white",
    pixelRatio: 2,
  });

  if (!blob) {
    return;
  }

  const dataUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = `poema-${new Date()}.jpg`;
  a.href = dataUrl;
  a.click();

  URL.revokeObjectURL(dataUrl);
}

export async function toDataURL(file: File) {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.onerror = () => {
      resolve("");
    };

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.readAsDataURL(file);
  });
}
