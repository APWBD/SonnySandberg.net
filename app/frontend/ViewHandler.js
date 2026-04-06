import { getUrlParts } from "/app/frontend/utils.js";
import { config } from "/app/frontend/config.js";
import { importCSS } from "/app/frontend/utils.js";
import TopMenuView from "/app/frontend/view/menu/TopMenuView.js";
import HomeView from "/app/frontend/view/home/HomeView.js";
import FractionView from "/app/frontend/view/fraction/FractionView.js";
import EquationView from "/app/frontend/view/equation/EquationView.js";
import ReductionView from "/app/frontend/view/reduction/ReductionView.js";
import MultiplicationTablesView from "/app/frontend/view/training-games/multiplicationtables/View.js";

export default class ViewHandler
{
   init()
   {
      const d = document;

      importCSS("main");
      importCSS("menu");

      const topBar = d.getElementById("topBar"); // Our topbar that will always be the same
      const topMenu = new TopMenuView();
      topMenu.build(topBar);

      // Content
      const content = d.getElementById("content"); // Our content div that will change
      this.buildContent(content);
   }

   buildContent(container)
   {
      const url = getUrlParts();
      window.document.title = `${config.getTitle()}`;

      if (url.length === 0 || url[0] === "")
      {
         const home = new HomeView(container);
         home.build();
      }

      if (url[0] === "broekgenerator")
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
         const reduction = new ReductionView(container);
      }

      if (url[0] === "multiplikationstabel")
      {
         const multiplicationTable = new MultiplicationTablesView(container);
         multiplicationTable.init();
      }
   }
}