import { notionClient } from "@/lib/notion-client";

export class ContactService {
  async getAll() {
    const response = await notionClient.databases.query({
      database_id: "7d20b04590f54e81a64b921ccff93656",
    });

    return response;
  }

  async createContact(body: any) {
    const response = await notionClient.pages.create({
      parent: {
        type: "database_id",
        database_id: "7d20b04590f54e81a64b921ccff93656",
      },
      properties: body,
    });
    return response;
  }
}
