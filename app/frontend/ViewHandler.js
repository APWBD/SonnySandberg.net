import { getUrlParts } from "/app/frontend/utils.js";
import { config } from "/app/frontend/config.js";
import { importCSS } from "/app/frontend/utils.js";

import FractionView from "/app/frontend/view/fraction/FractionView.js";
import EquationView from "/app/frontend/view/equation/EquationView.js";
import MultiplicationTablesView from "/app/frontend/view/training-games/multiplicationtables/View.js";

export default class ViewHandler
{
   init()
   {
      const d = document;

      importCSS("main");
      importCSS("menu");

      // Content
      const content = d.getElementById("content"); // Our content div that will change
      this.buildContent(content);
   }

   buildContent(container)
   {
      const url = getUrlParts();
      window.document.title = `${config.getTitle()}`;

      if (url[0] === "brøkgenerator")
      {
         const fraction = new FractionView(container);
         fraction.build();
      }

      if (url[0] === "ligningsgenerator")
      {
         const equation = new EquationView(container);
         equation.build();
      }

      if (url[0] === "reduktionsvaerktoej")
      {
         // Add your Reduktionsværktøj view initialization here
      }

      if (url[0] === "multiplikationstabel")
      {
         const multiplicationTable = new MultiplicationTablesView(container);
         multiplicationTable.init();
      }
   }
}