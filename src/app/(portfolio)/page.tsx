import HomeContainer from "@/containers/HomeContainer";
import { api } from "@/services";

async function page() {
  const projects = await api.project.getAll("notion-project-main", {
    property: "isMain",
    checkbox: {
      equals: true,
    },
  });

  if (!projects) return <></>;
  return <HomeContainer projects={projects} />;
}

export default page;
