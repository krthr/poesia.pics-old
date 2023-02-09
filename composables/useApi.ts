import Axios from "axios";
import LogRocket from "logrocket";

export interface GeneratePoem {
  author: string;
  colors: {
    fraction: string;
    color: string;
  }[];
  generatedAt: string;
  imgHash: string;
  keywords: string[];
  poem: string;
  signature: string;
}

export default function () {
  const config = useRuntimeConfig();

  const client = Axios.create({
    baseURL: config.public.apiBase,
  });

  async function request<T>(path: string, body: any, params?: any) {
    try {
      const response = await client.post<T>(path, body, { params });
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

  async function generatePoem(file: File, mode?: string) {
    const form = new FormData();
    form.append("image", file);

    return request<GeneratePoem>("/poems/generate", form, {
      mode,
    });
  }

  return { generatePoem };
}
