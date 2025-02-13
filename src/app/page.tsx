import HomeContainer from "@/containers/HomeContainer";
import { api } from "@/services";

async function page() {
  const projects = await api.project.getAll();

  if (!projects) return <></>;
  return <HomeContainer projects={projects} />;
}

export default page;
