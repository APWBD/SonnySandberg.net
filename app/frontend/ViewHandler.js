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

      if (url[0] === "Equation")
      {
         const equation = new EquationView(container);
         equation.build();
      }

      if (url[0] === "TrainingGame")
      {
         if (url[1] === "MultiplicationTable")
         {
            const multiplicationTable = new MultiplicationTablesView(container);
            multiplicationTable.init();
         }
      }
   }
}