import { ProjectService } from "./project.service";

class NotionApi {
  project = new ProjectService();
}

export const api = new NotionApi();
