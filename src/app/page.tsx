import HomeContainer from "@/containers/HomeContainer";
import { api } from "@/services";

async function page() {
  const projects = await api.project.getAll();

  return <HomeContainer {...(projects && { projects })} />;
}

export default page;
