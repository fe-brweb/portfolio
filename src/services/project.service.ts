import {
  cache,
  getPreviewImageMap,
  notion,
  notionClient,
} from "@/lib/notion-client";
import { Project } from "@/types/project.type";
import { type ExtendedRecordMap } from "notion-types";

const resultData = (result: any): Project => {
  const images = result.properties?.images?.files.map(
    (file: any) => file.file?.url || file.external.url,
  );

  return {
    id: result.id,
    title: result.properties.name?.title[0]?.plain_text,
    description: result.properties.description?.rich_text[0]?.plain_text,
    contents: result.properties.contents?.rich_text[0]?.plain_text,
    coverUrl: result.cover?.file?.url || result.cover?.external?.url,
    thumbUrl:
      result.properties?.thumbnail?.files[0]?.file?.url ||
      result.properties?.thumbnail?.files[0]?.external?.url,
    images: images,
    tags: result.properties.tags?.multi_select,
    period: result.properties.period?.date,
    repository: result.properties.repository?.url,
    website: result.properties.website?.url,
    url: result.public_url,
    category: result.properties.category?.status,
    isMain: result.properties.isMain.checkbox,
    isMoreView: result.properties.isMoreView.checkbox,
    status: result.properties.status?.status,
  };
};

export class ProjectService {
  async getAll(key: string, filter?: any) {
    const cacheKey = key;
    const databaseId = process.env.NOTION_DB_ID;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData as Project[];

    if (databaseId) {
      const response = await notionClient.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "period",
            direction: "descending",
          },
        ],
        filter: {
          and: [
            ...(Array.isArray(filter) ? filter : [filter]),
            {
              property: "isVisible",
              checkbox: {
                equals: true,
              },
            },
          ],
        },
      });

      const data: Project[] = response.results.map((result: any) =>
        resultData(result),
      );
      cache.set(cacheKey, data);
      return data;
    }
  }
  async getOne(pageId: string) {
    const cacheKey = `notion-project-${pageId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData as Project;

    const response = await notionClient.pages.retrieve({
      page_id: pageId,
    });
    cache.set(cacheKey, resultData(response));
    return resultData(response);
  }
  async getRecordMap(pageId: string) {
    const cacheKey = `notion-project-recordMap-${pageId}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) return cachedData as ExtendedRecordMap;

    const recordMap = await notion.getPage(pageId);

    const previewImageMap = await getPreviewImageMap(recordMap);
    (recordMap as any).preview_images = previewImageMap;
    cache.set(cacheKey, recordMap);
    return recordMap;
  }
  async getAllTags(category?: string) {
    const databaseId = process.env.NOTION_DB_ID;
    if (databaseId) {
      const response = await notionClient.databases.query({
        database_id: databaseId,
        sorts: [
          {
            property: "period",
            direction: "descending",
          },
        ],
      });

      const data: Project[] = response.results.map((result: any) =>
        resultData(result),
      );

      const uniqueTags = [
        ...new Map(
          data
            .filter((item) =>
              category
                ? item.category.name.toLowerCase() === category.toLowerCase()
                : item,
            )
            .flatMap((item) => item.tags)
            .map((tag) => [tag?.name, tag]),
        ).values(),
      ];

      return uniqueTags;
    }
  }
}
