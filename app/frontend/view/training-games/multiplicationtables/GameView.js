import { config } from "/app/frontend/config.js";

export default class MultiplicationTablesGameView
{
   #mainView;
   #gameView;
   #game;
   #gameDiv;
   #tableDiv;
   #problemDiv;
   #resultDiv;
   #statsDiv;
   #result;
   #keysDiv;
   #flashError;

   constructor(container, mainView)
   {
      const d = document;
      this.#flashError = false;

      this.#mainView = mainView;
      this.#game = mainView.game;
      this.#gameView = container;
      this.#result = "";

      this.#resultDiv = d.createElement("div");
      this.#resultDiv.className = "result";

      this.#statsDiv = d.createElement("div");
      this.#statsDiv.className = "stats";
   }

   init()
   {

   }

   showGameView()
   {
      this.#showGameArea();
      this.#registerKeyStrokes();
   }

   #showGameArea()
   {
      const d = document;
      this.#gameView.innerHTML = "";

      this.#gameDiv = d.createElement("div");
      this.#gameDiv.className = "tg-mt-gameGrid";
      this.#gameView.appendChild(this.#gameDiv);

         const navDiv = d.createElement("div");
            navDiv.className = "navigation";
         this.#gameDiv.appendChild(navDiv);

            const exit = d.createElement("div");
               exit.className = "iconDiv";
               exit.title = "Leave game?";
               exit.addEventListener("click", () =>
               {
                  this.#game.quitGame().then(response =>
                  {
                     if (response ="game quit")
                     {
                        this.#mainView.showStartView();
                     }
                  });
               });
            navDiv.appendChild(exit);

               const exitIcon = d.createElement("i");
                  exitIcon.className = "fi-xnsuxl-sign-out-solid exit";
               exit.appendChild(exitIcon);
               friconix_update();

         this.#problemDiv = d.createElement("div");
            this.#problemDiv.className = "problem";
            this.#gameDiv.appendChild(this.#problemDiv);
         this.#showProblem();

         this.#keysDiv = d.createElement("div");
            this.#keysDiv.className = "keys";
            this.#gameDiv.appendChild(this.#keysDiv);
               this.#createKeyboard();

         this.#gameDiv.appendChild(this.#statsDiv);
         this.#showStats();
   }

   #showStats()
   {
      const d = document;
      let progress = this.#game.getProgress();

      if (progress.percentage > 0)
      {
         const bar = d.createElement("div");
         bar.className = "progress";

         bar.appendChild(d.createTextNode(`${ progress.results } / ${ progress.problems } ( ${ progress.percentage } %)`));
         bar.style.width = `${ progress.percentage}%`;

         this.#statsDiv.innerHTML = "";
         this.#statsDiv.appendChild(bar);
      }
   }

   #createKeyboard()
   {
      const d = document;
      const container = this.#keysDiv;

      const keyboard = d.createElement("div");
      keyboard.className = "keyboard";
      container.appendChild(keyboard);

      let settings = this.#game.settings;
      let keys = config.keyboards[settings.keyboard];

      for (let i = 0; i < keys.length; i++)
      {
         for (let j = 0; j < keys[i].length; j++)
         {
            let k = keys[i][j];
            let key = d.createElement("button");
            key.appendChild(d.createTextNode(keys[i][j]));
            keyboard.appendChild(key);
            key.addEventListener("click", e =>
            {
               if (this.#game.gameState == 1)
               {
                  if (k == "C")
                  {
                     this.#clearResultString();
                  }
                  else if (!isNaN(k))
                  {
                     this.#alterResultString(k);
                  }
               }
            });
         }
      }
      keyboard.appendChild(this.#resultDiv);
   }

   #registerKeyStrokes()
   {
      window.addEventListener("keyup", e =>
      {
         e.preventDefault();
         if (this.#game.gameState == 1)
         {
            if (!isNaN(e.key) || e.key == "c" || e.key == "Delete" || e.key == "Enter" || e.key == "Backspace")
            {
               if (e.key == "c" || e.key == "Delete")
               {
                  this.#clearResultString();
               }
               else if (e.key == "Backspace")
               {
                  this.#deleteLastCharacter();
               }
               else if (!isNaN(e.key))
               {
                  this.#alterResultString(e.key);
               }
            }
         }
      });
   }

   #alterResultString(str)
   {
      this.#result += str;
      this.#checkResult();
   }

   #deleteLastCharacter()
   {
      this.#result = this.#result.slice(0, -1);
      this.#updateResult();
   }

   #clearResultString()
   {
      this.#result = "";
      this.#updateResult();
   }

   #updateResult()
   {
      const d = document;
      this.#resultDiv.innerHTML = "";

      const button = d.createElement("button");
      button.className = "resultButton";
      button.appendChild(d.createTextNode(this.#result));
      this.#resultDiv.appendChild(button);
   }

   #drawTable()
   {
      const table = this.#tableDiv;
      table.innerHTML = "";

      for (let i = 0; i < results.length; i++)
      {
         for (let j = 0; j < results[i].length; j++)
         {
               let div = d.createElement("div");
               let text = (results[i][j] == 0) ? "" : results[i][j];
               div.appendChild(d.createTextNode(text));
               table.appendChild(div);
         }
      }
   }

   #checkResult()
   {
      this.#game.checkResult(this.#result).then(response =>
      {
         if (response == "correct")
         {
            if (this.#game.gameState == 1)
            {
               this.#game.nextProblem();
            }
            this.#clearResultString();
            this.#showProblem();
            this.#showStats();

            if (this.#game.gameState == 2)
            {
               this.#mainView.showGameOverView();
            }
         }
         else if (response == "wrong")
         {
            this.#flashError = true;
            this.#clearResultString();
            this.#showStats();
            this.#showProblem();
         }
         else
         {
            this.#updateResult();
         }
      });
   }

   #showProblem()
   {
      const d = document;
      this.#problemDiv.innerHTML = "";
      this.#problemDiv.style.animationName = "";

      if (this.#game.gameState == 1)
      {
         let p = `${this.#game.currentProblem[0]} * ${this.#game.currentProblem[1]}`;

         let text = (p != "0 * 0") ? p : "";
         this.#problemDiv.appendChild(d.createTextNode(text));
         this.#problemDiv.className = (this.#flashError) ? "problem error_flash" : "problem";

         // Reset animation for error flash
         this.#problemDiv.style.animationName = "none";
         requestAnimationFrame(() =>
         {
            setTimeout(() =>
            {
               this.#problemDiv.style.animationName = ""
               this.#flashError = false;
            }, 0);
         });
      }
   }

   #showCorrect()
   {
      let div = d.getElementById("correct");
      div.innerHTML = "";
      div.appendChild(d.createTextNode(correct));
   }

   #showWrong()
   {
      let div = d.getElementById("wrong");
      div.innerHTML = "";
      div.appendChild(d.createTextNode(wrong));
   }

   #showGameOver()
   {
      let div = d.getElementById("problem");
      div.innerHTML = "";
      div.appendChild(d.createTextNode("DONE"));
   }

   #showTime()
   {
      let div = d.getElementById("time");
      div.innerHTML = "";
      div.appendChild(d.createTextNode(time));
   }

   #showStartNewGameButton()
   {
      const button = d.createElement("button");
      button.appendChild(d.createTextNode("Start Spil"));
      button.addEventListener("click", e =>
      {
         this.#game.startGame();
      });

      d.getElementById("result").innerHTML = "";
      d.getElementById("result").appendChild(button);
   }
}