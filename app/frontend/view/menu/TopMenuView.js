import { config } from "/app/frontend/config.js";

export default class TopMenuView
{
    build(container)
    {
        const d = document;
        container.innerHTML = "";

        const img = d.createElement("img");
        img.src = "/app/frontend/images/coo.ico";
        img.alt = "Sonny Sandberg.net";
        container.appendChild(img);

        const div = d.createElement("div");
        div.textContent = "Sonny Sandberg.net";
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
            nav.appendChild(a);
        }
        container.appendChild(nav);
    }
}