import { config } from "/app/frontend/config.js";
import { goTo } from "/app/frontend/utils.js";

export default class TopMenuView
{
    build(container)
    {
        const d = document;
        container.innerHTML = "";

        const img = d.createElement("img");
        img.src = "/app/frontend/images/coo.ico";
        img.alt = `Gå til forsiden af ${config.site_name}`;
        img.addEventListener("click", () => goTo("/"));
        container.appendChild(img);

        const div = d.createElement("div");
        div.textContent = config.site_name;
        div.title = `Gå til forsiden af ${config.site_name}`;
        div.addEventListener("click", () => goTo("/"));
        container.appendChild(div);

        const button = d.createElement("button");
        button.className = "menu-toggle";
        button.setAttribute("aria-label", "Åbn menu");
        button.onclick = () => document.body.classList.toggle("menu-open");
        button.textContent = "☰";
        container.appendChild(button);

        const nav = d.createElement("nav");
        nav.className = "topnav";

        for (const item of config.menuItems)
        {
            const a = d.createElement("a");
            a.href = item.href;
            a.textContent = item.name;
            a.alt = `Gå til ${item.name}`;
            a.title = `Gå til ${item.name}`;
            nav.appendChild(a);
        }
        container.appendChild(nav);
    }
}