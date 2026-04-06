import { config } from "/app/frontend/config.js";

export default class HomeView
{
   constructor(container)
   {
      this.container = container;
   }

   build()
   {
      const d = document;

      const content = d.createElement("section");
      content.id = "content-navigation";
      this.container.appendChild(content);

      this.buildMathArea(content);
   }

   buildMathArea(container)
   {
      const d = document;
      container.innerHTML = "";

      const header = d.createElement("header");
      header.classList.add("page-header");
      container.appendChild(header);

         const h1 = d.createElement("h1");
         h1.textContent = "Matematikværktøjer";
         header.appendChild(h1);

         const p = d.createElement("p");
         p.textContent = "Vælg et værktøj og kom hurtigt i gang.";
         header.appendChild(p);

      const section = d.createElement("section");
      section.classList.add("tool-grid");
      container.appendChild(section);

         for (const item of config.menuItems)
         {
            const a = d.createElement("a");
            a.href = item.href;
            a.classList.add("tool-card");
            a.title = `Gå til ${item.name}`;
            section.appendChild(a);

               const icon = d.createElement("span");
               icon.classList.add("tool-icon");
               icon.textContent = item.icon;
               a.appendChild(icon);

               const h2 = d.createElement("h2");
               h2.textContent = item.name;
               a.appendChild(h2);

               const p = d.createElement("p");
               p.textContent = item.description;
               a.appendChild(p);
         }
   }
}