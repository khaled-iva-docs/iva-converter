import { readFileSync } from "fs";
import { basename } from "path";
import Axios from "axios";
let API_KEY = "NO_KEY_YET";

export function initIva(apiKey: string): void {
  API_KEY = apiKey;
}

export async function docxToPdfFromPath(
  path: string,
  fileName?: string
): Promise<any> {
  const file = readFileSync(path);
  return await docxToPdfFromBase64(
    typeof fileName === "string"
      ? fileName
      : basename(path).concat(path.indexOf(".docx") === -1 ? ".docx" : ""),
    file.toString("base64")
  );
}

export async function docxToPdfFromBase64(
  fileName: string,
  base64: string
): Promise<any> {
  try {
    if (API_KEY === "NO_KEY_YET") {
      console.error(
        "Iva is not properly set up, please provide an API Key (https://app.iva-docs.com/api)"
      );
      throw 401;
    }
    const res = await Axios.post(
      "https://converter.iva-docs.com/api/v1/to-pdf/from-base64",
      {
        fileName: fileName,
        base64: base64,
      },
      {
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        responseType: "arraybuffer",
      }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.status) {
      throw err.response.status;
    }
    throw err;
  }
}

export async function convertDocxToPDFFromFile(file: any): Promise<Blob> {
  try {
    if (API_KEY === "NO_KEY_YET") {
      console.error(
        "Iva is not properly set up, please provide an API Key (https://app.iva-docs.com/api)"
      );
      throw 401;
    }
    // @ts-ignore
    const formData = new FormData();
    formData.append("file", file);
    const res = await Axios.post(
      "https://converter.iva-docs.com/api/v1/to-pdf/from-file",
      formData,
      {
        headers: {
          authorization: `Bearer ${API_KEY}`,
        },
        responseType: "blob",
      }
    );
    return res.data;
  } catch (err) {
    if (err && err.response && err.response.status) {
      throw err.response.status;
    }
    throw err;
  }
}
