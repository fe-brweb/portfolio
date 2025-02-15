import { ContactService } from "./contact.service";
import { ProjectService } from "./project.service";

class NotionApi {
  project = new ProjectService();
  contact = new ContactService();
}

export const api = new NotionApi();
