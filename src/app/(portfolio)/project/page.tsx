import ProjectContainer from "@/containers/ProjectContainer";
import { api } from "@/services";
import { Tag } from "@/types/project.type";
import { isArray } from "lodash";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ category: string; tags: string }>;
}) {
  const category = (await searchParams)?.category;
  const tags = (await searchParams)?.tags;

  const filters = [];

  if (category) {
    filters.push({
      property: "category",
      status: {
        equals: category,
      },
    });
  }

  if (tags) {
    const tagList = isArray(tags) ? tags : [tags];
    tagList.map((tag) => {
      filters.push({
        property: "tags",
        multi_select: {
          contains: tag,
        },
      });
    });
  }

  const items = await api.project.getAll("notion-project-all", filters);
  const allTags = (await api.project.getAllTags(category)) as Tag[];

  if (!items || !allTags) return;

  return <ProjectContainer items={items} tags={allTags} />;
}

export default page;
