import { getUrlParts } from "/app/frontend/utils.js";
import { config } from "/app/frontend/config.js";
import { importCSS } from "/app/frontend/utils.js";

import FractionView from "/app/frontend/view/fraction/FractionView.js";

export default class ViewHandler
{
   init()
   {
      const d  = document;

      importCSS("main");

      // Content
      const content = d.getElementById("content"); // Our content div that will change
      this.buildContent(content);
   }

   buildContent(container)
   {
      const url = getUrlParts();
      window.document.title = `${config.getTitle()}`;

      if (url[0] === "Fraction")
      {
         const fraction = new FractionView(container);
         fraction.build();
      }
   }
}