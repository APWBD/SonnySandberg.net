export default class MultiplicationTablesGameOverView
{
   #mainView;
   #gameOverView;

   constructor(container, mainView)
   {
      const d = document;

      this.#mainView = mainView;
      this.#gameOverView = container;
   }

   showGameOverView()
   {
      const game = this.#mainView.game;

      const d = document;
      const gameOverDiv = d.createElement("div");
      gameOverDiv.className = "tg-mt-gameOverGrid";
      this.#gameOverView.innerHTML = "";
      this.#gameOverView.appendChild(gameOverDiv);

         const headline = d.createElement("div");
            headline.className = "headline";
            headline.appendChild(d.createTextNode("GAME OVER"));
         gameOverDiv.appendChild(headline);

         const time = d.createElement("div");
            time.className = "time";

               const problemsSpan = d.createElement("span");
               problemsSpan.appendChild(d.createTextNode(`${game.numProblems} problems done in`));
               time.appendChild(problemsSpan);

               let timeArray = game.getConvertedTime();

               let h = (timeArray[0] > 0) ? `${timeArray[0]}t ` : "";
               let m = (timeArray[1] > 0) ? `${timeArray[1]}m ` : "";
               let s = `${timeArray[2]}s`;
               let hms = h+m+s;

               const timeSpan = d.createElement("span");
               timeSpan.appendChild(d.createTextNode(hms));
               time.appendChild(timeSpan);

               const mistakesSpan = d.createElement("span");
               let ss = (game.wrong != 1) ? "s" : "";
               mistakesSpan.appendChild(d.createTextNode(`with ${game.wrong} mistake${ss}`));
               time.appendChild(mistakesSpan);

         gameOverDiv.appendChild(time);

         const buttonDiv = d.createElement("div");
         buttonDiv.className = "buttonDiv";
         gameOverDiv.appendChild(buttonDiv);

            const button = d.createElement("button");
            button.className = "button";
            button.appendChild(d.createTextNode("END GAME"));
            button.addEventListener("click", () =>
            {
               this.#mainView.showStartView();
            });
            buttonDiv.appendChild(button);
   }
}