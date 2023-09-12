import { PlopTypes } from "@turbo/gen";
import path from "path";
import fs from "fs";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("table", {
    description: "Create a new database table",
    prompts: [
      {
        type: "list",
        name: "app",
        message: "What app should this created in?",
        choices: fs
          .readdirSync(path.join(__dirname, "../../apps"))
          .filter((folder) => folder !== ".DS_Store"),
      },
      {
        type: "input",
        name: "table",
        message: "What is the name of the table?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/{{ app }}/src/db/schema/{{ table }}.ts",
        templateFile: "templates/table/new-table.hbs",
      },
      {
        type: "append",
        path: "{{ turbo.paths.root }}/apps/{{ app }}/src/db/types.ts",
        templateFile: "templates/table/add-table-types.hbs",
      },
      {
        type: "append",
        path: "{{ turbo.paths.root }}/apps/{{ app }}/src/db/schema/index.ts",
        templateFile: "templates/table/add-table-index.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/apps/{{ app }}/src/services/{{ table }}.ts",
        templateFile: "templates/table/add-service.hbs",
      },
    ],
  });
}
