import { importCSS, getRandomInt } from "/app/frontend/utils.js";

export default class FractionView
{
   #type = "+";
   #level = 1;

   #types = ["+", "-", "*", "/"];
   #levels = ["Niveau", 1, 2];

   #container;
   constructor(container)
   {
      importCSS("fraction");
      importCSS("buttons");
      this.#container = container;
   }

   build()
   {
      const d = document;
      this.#container.innerHTML = "";

      const grid = d.createElement("div");
      grid.classList.add("grid");
      this.#container.appendChild(grid);

      const headline = d.createElement("div");
      headline.classList.add("headline");
      headline.textContent = "Brøk Opgave";
      grid.appendChild(headline);

      const type = d.createElement("div");
      type.classList.add("type");
      type.id = "type";
      grid.appendChild(type);

      const level = d.createElement("div");
      level.classList.add("level");
      level.id = "level";
      this.#buildLevels(level);
      grid.appendChild(level);

      const problem = d.createElement("div");
      problem.classList.add("problem");
      grid.appendChild(problem);

      const fraction1 = d.createElement("div");
      fraction1.classList.add("fraction");
      problem.appendChild(fraction1);

      const fractionPart1 = d.createElement("div");
      fractionPart1.id = "fractionPart1";
      fraction1.appendChild(fractionPart1);

      const fractionPart3 = d.createElement("div");
      fractionPart3.id = "fractionPart3";
      fraction1.appendChild(fractionPart3);

      const problemType = d.createElement("div");
      problemType.classList.add("problemType");
      problemType.id = "problemType";
      problem.appendChild(problemType);

      const fraction2 = d.createElement("div");
      fraction2.classList.add("fraction");
      problem.appendChild(fraction2);

      const fractionPart2 = d.createElement("div");
      fractionPart2.id = "fractionPart2";
      fraction2.appendChild(fractionPart2);

      const fractionPart4 = d.createElement("div");
      fractionPart4.id = "fractionPart4";
      fraction2.appendChild(fractionPart4);

      this.#buildTypes(type, problemType);
      this.#buildProblem();

      const buttons = d.createElement("div");
      buttons.classList.add("buttons");
      buttons.id = "buttons";
      grid.appendChild(buttons);
      this.#buildButtons(buttons);
   }

   #buildButtons(container)
   {
      const d = document;

      const button = d.createElement("button");
      button.className = "std-button std-button-blue";
      button.innerHTML = "NY OPGAVE";
      button.addEventListener("click", () =>
      {
         this.#buildProblem();
      });
      container.appendChild(button);
   }

   #buildTypes(container, problemType)
   {
      const d = document;
      container.innerHTML = "";

      for (let t of this.#types)
      {
         let c = "std-button";
         c += (t == this.#type) ? " std-button-blue" : " std-button-green";
         const button = d.createElement("button");
         button.className = c;
         button.appendChild(d.createTextNode(t));
         button.addEventListener("click", () =>
         {
            this.#type = t;
            this.#buildTypes(container, problemType);
         });
         container.appendChild(button);
      }

      problemType.innerHTML = this.#type;
   }

   #buildProblem()
   {
      const d = document;

      // New numbers
      // if level is 1, then denominator is the same.
      if (this.#level == 1)
      {
         let n = getRandomInt(1, 10);
         d.getElementById("fractionPart3").innerHTML = n;
         d.getElementById("fractionPart4").innerHTML = n;
      }
      else
      {
         let n1 = getRandomInt(1, 10);
         let n2 = getRandomInt(1, 10);
         if (n1 == n2)
         {
            // If the denominators are equal, start over!
            this.#buildProblem();
         }
         else
         {
            d.getElementById("fractionPart3").innerHTML = n1;
            d.getElementById("fractionPart4").innerHTML = n2;
         }
      }

      d.getElementById("fractionPart1").innerHTML = getRandomInt(1, 10);
      d.getElementById("fractionPart2").innerHTML = getRandomInt(1, 10);
   }

   #buildLevels(container)
   {
      const d = document;
      container.innerHTML = "";

      for (let l of this.#levels)
      {
         if (l == "Niveau")
         {
            let label = d.createElement("label");
            label.appendChild(d.createTextNode(l));
            container.appendChild(label);
         }
         else
         {
            let c = "std-button";
            c += (l == this.#level) ? " std-button-red" : " std-button-orange";
            const button = d.createElement("button");
            button.className = c;
            button.appendChild(d.createTextNode(l));


            button.addEventListener("click", () =>
            {
               this.#level = l;
               this.#buildLevels(container);
               this.#buildProblem();
            });
            container.appendChild(button);
         }
      }
   }
}