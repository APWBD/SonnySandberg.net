import Settings from "./Settings.js";

export default class MultiplicationTablesSettingsView
{
   #mainView;
   #settingsView;

   constructor(container, mainView)
   {
      this.#mainView = mainView;
      this.#settingsView = container;
      this.settings = new Settings();
   }

   showSettingsView()
   {
      const d = document;
      const settingsDiv = d.createElement("div");
         settingsDiv.className = "tg-mt-settingsGrid";
      this.#settingsView.innerHTML = "";
      this.#settingsView.appendChild(settingsDiv);

         const headline = d.createElement("div");
            headline.className = "headline";
            headline.appendChild(d.createTextNode("Settings"));
         settingsDiv.appendChild(headline);

         const tablesSelect = d.createElement("div");
            tablesSelect.className = "tables-select";
         settingsDiv.appendChild(tablesSelect);

            this.#buildSelectTablesArea(tablesSelect);

         const done = d.createElement("div");
            done.className = "done";
         settingsDiv.appendChild(done);

            const button = d.createElement("button");
               button.appendChild(d.createTextNode("DONE"));
               button.addEventListener("click", () =>
               {
                  this.#mainView.showStartView();
               });
            done.appendChild(button);
   }

   #buildSelectTablesArea(container)
   {
      const d = document;
      container.innerHTML = "";
      const settings = this.#mainView.getSettings(); // Gettings access to settings

      const headline = d.createElement("div");
         headline.className = "headline";
         headline.appendChild(d.createTextNode("Choose tables"));
         headline.title = "Click to choose all tables";
         headline.addEventListener("click", () =>
         {
            settings.toggleAll();
            this.#buildSelectTablesArea(container);
         });
      container.appendChild(headline);

      const tables = d.createElement("div");
         tables.className = "select";
      container.appendChild(tables);

         const selectedTables = settings.tables;
         for (let i = 1; i <= 10; i++)
         {
            const div = d.createElement("div");

               const span = d.createElement("span");
                  span.appendChild(d.createTextNode(i));
               div.appendChild(span);

               const id = d.createElement("div");
                  id.className = "roundedOne";
               div.appendChild(id);

               const input = d.createElement("input");
                  input.type = "checkbox";
                  input.id = ""+i+1;
                  input.value = "None";
                  input.name = "check";
                  input.checked = (selectedTables[i]) ? "checked" : "";
                  input.addEventListener("click", () =>
                  {
                     settings.toggleTable(i);
                     this.#buildSelectTablesArea(container);
                  });
               id.appendChild(input);

               const label = d.createElement("label");
                  label.setAttribute("for", ""+i+1);
               id.appendChild(label);

            tables.appendChild(div);
         }

         this.#buildNumProblems(container, settings);
   }

   #buildNumProblems(container, settings)
   {
      const d = document;

      const div = d.createElement("div");
         div.className = "numProblems";
         div.appendChild(d.createTextNode(settings.getNumberOfProblems() + " selected problems"));
      container.appendChild(div);
   }
}