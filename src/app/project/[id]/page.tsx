import ProjectDetailContainer from "@/containers/ProjectDetailContainer";
import { api } from "@/services";
import { Project } from "@/types/project.type";
import { Metadata } from "next";
import { type ExtendedRecordMap } from "notion-types";
import { getPageTitle } from "notion-utils";

export function generateMetadata({
  item,
  recordMap,
}: {
  item: Project;
  recordMap: ExtendedRecordMap;
}): Metadata {
  if (!recordMap) return {};
  try {
    const title = getPageTitle(recordMap) as string;
    const description = item.description as string;
    const imageUrl = item.coverUrl as string;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: imageUrl }],
      },
    };
  } catch (error) {
    throw error;
  }
}

async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const recordMap = await api.project.getRecordMap(id);
  const item = await api.project.getOne(id);

  if (!recordMap) return null;
  if (!item) return null;

  return <ProjectDetailContainer recordMap={recordMap} item={item} />;
}

export default Page;
