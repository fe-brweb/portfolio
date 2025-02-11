import { Client } from "@notionhq/client";
import ky from "ky";
import lqip from "lqip-modern";
import { NotionAPI } from "notion-client";
import {
  type ExtendedRecordMap,
  type PreviewImage,
  type PreviewImageMap,
} from "notion-types";
import {
  defaultMapImageUrl as defaultMapImageUrlRaw,
  getPageImageUrls,
} from "notion-utils";
import pMap from "p-map";
import pMemoize from "p-memoize";

export const notion = new NotionAPI();

export const notionClient = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
): Promise<PreviewImageMap> {
  const defaultMapImageUrl = defaultMapImageUrlRaw as (
    url: string,
    block: any,
  ) => string;

  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl: defaultMapImageUrl,
  });

  const previewImagesMap = Object.fromEntries(
    await pMap(urls, async (url) => [url, await getPreviewImage(url)], {
      concurrency: 8,
    }),
  );

  return previewImagesMap;
}

async function createPreviewImage(url: string): Promise<PreviewImage | null> {
  try {
    const body = await ky(url).arrayBuffer();
    const result = await lqip(body);

    return {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64,
    };
  } catch (err: any) {
    if (err.message === "Input buffer contains unsupported image format") {
      return null;
    }

    console.warn("failed to create preview image", url, err.message);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
