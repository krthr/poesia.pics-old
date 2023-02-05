import Axios from "axios";
import LogRocket from "logrocket";

export interface AnnotateImage {
  keywords: string[];
  colors: {
    fraction: string;
    color: string;
  }[];
  signature: string;
}

export interface GeneratePoem {
  poem: string;
  author: string;
  generatedAt: string;
  signature: string;
}

export default function () {
  const config = useRuntimeConfig();

  const client = Axios.create({
    baseURL: config.public.apiBase,
  });

  async function request<T>(path: string, body: any) {
    try {
      const response = await client.post<T>(path, body);
      const data = response.data;
      return data;
    } catch (error: any) {
      if (error.response?.data.errors?.at(0)?.message) {
        throw new Error(error.response.data.errors.at(0).message);
      } else {
        LogRocket.captureException(error);
        throw new Error(error.message);
      }
    }
  }

  async function annotateImage(file: File) {
    const form = new FormData();
    form.append("image", file);
    return request<AnnotateImage>("/annotateImage", form);
  }

  async function generatePoem(
    signature: string,
    keywords: string[],
    mode: string | undefined
  ) {
    const body = { keywords, mode };
    return request<GeneratePoem>("/generatePoem?signature=" + signature, body);
  }

  return { generatePoem, annotateImage };
}
