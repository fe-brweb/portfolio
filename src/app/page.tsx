import HomeContainer from "@/containers/HomeContainer";
import { api } from "@/services";
import { Project } from "@/types/project.type";

async function page() {
  const projects = (await api.project.getAll()) as Project[];

  return <HomeContainer projects={projects} />;
}

export default page;
