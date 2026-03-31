export default class MultiplicationTablesStartView
{
   #mainView;
   #startView;
   #game;

   constructor(container, mainView)
   {
      this.#mainView = mainView;
      this.#startView = container;
      this.#game = mainView.game;
   }

   showStart()
   {
      const d = document;
      const startDiv = d.createElement("div");
      startDiv.className = "tg-mt-startGrid";
      this.#startView.innerHTML = "";
      this.#startView.appendChild(startDiv);

         const nameDiv = d.createElement("div");
         nameDiv.className = "name";
         startDiv.appendChild(nameDiv);

            let text = ["Multiplication Table", "TRAINER"];
            for (let t of text)
            {
               const div = d.createElement("div");
               div.appendChild(d.createTextNode(`${t}`));
               nameDiv.appendChild(div);
            }

         const settingsDiv = d.createElement("div");
            settingsDiv.className = "settings";
         startDiv.appendChild(settingsDiv);

            const settingsButton = d.createElement("button");
               settingsButton.appendChild(d.createTextNode("SETTINGS"));
               settingsButton.addEventListener("click", () =>
               {
                  this.#mainView.showSettingsView();
               });
            settingsDiv.appendChild(settingsButton);

         this.newGameDiv = document.createElement("div");
         this.newGameDiv.className = "newgame";
         this.addObserver(this.newGameDiv);

         startDiv.appendChild(this.newGameDiv);

            const newGameButton = d.createElement("button");
               newGameButton.appendChild(d.createTextNode("NEW GAME\n"));

               let settings = this.#mainView.getSettings();
               let numProblems = settings.getNumberOfProblems();
               const bSpan = d.createElement("span");
               bSpan.appendChild(d.createTextNode(`${numProblems} problems`));
               newGameButton.appendChild(bSpan);
               newGameButton.addEventListener("click", (e) =>
               {
                  if (numProblems > 0)
                  {
                     this.#mainView.newGameObject().then(game =>
                     {
                        this.#game = game;
                        this.#game.newGame(this.#mainView.getSettings()).then(response =>
                        {
                           if (response == "done")
                           {
                              this.#mainView.showGameView();
                           }
                        });
                     });
                  }
               });
            this.newGameDiv.appendChild(newGameButton);

         const highscoreDiv = d.createElement("div");
         highscoreDiv.className = "highscores";
         startDiv.appendChild(highscoreDiv);

            const highscoreButton = d.createElement("button");
               highscoreButton.appendChild(d.createTextNode("HIGHSCORES"));
            highscoreDiv.appendChild(highscoreButton);
   }

   #resizeButtonWithHeight(el)
   {
      let w = el[0].contentRect.width;
      let h = el[0].contentRect.height;

      let d = (w < h ? w : h);

      el[0].target.style.width = d;
      el[0].target.style.height = d;

      let b = el[0].target.querySelector("button");
      b.style.width = `${d}px`;
      b.style.height = `${d}px`;
   }

   addObserver(el)
   {
      new ResizeObserver(this.#resizeButtonWithHeight).observe(el);
   }
}