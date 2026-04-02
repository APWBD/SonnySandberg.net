export default class MultiplicationTablesGame
{
   constructor()
   {
      this.results = Array();
      this.currentProblem = null;
      this.allProblems = Array();
      this.numProblems = 0;
      this.correct = 0;
      this.wrong = 0;
      this.time = 0;
      this.interval = null;
      this.gameState = 0; // 0 not started, 1 in progress, 2 Game Over
   }

   quitGame()
   {
      return new Promise(resolve =>
      {
         this.gameState = 2;
         clearInterval(this.interval);

         resolve("game quit");
      });
   }

   newGame(settings)
   {
      this.settings = settings;

      return new Promise(resolve =>
      {
         this.#resetGame(settings).then(response =>
         {
            if (response == "done")
            {
               this.#startGame().then(response =>
               {
                  resolve(response);
               });
            }
         });
      });
   }

   #generateProblems(settings)
   {
      const tables = Object.entries(settings.tables)
         .filter(([_, v]) => v)
         .map(([k]) => Number(k));

      let problems = [];

      for (let a of tables)
      {
         for (let b of tables)
         {
            problems.push([a, b]);
         }
      }

      problems.sort(() => Math.random() - 0.5); // Shuffle the array
      this.allProblems = problems;
      this.numProblems = this.allProblems.length;
   }

   #resetGame(settings)
   {
      return new Promise(resolve =>
      {
         this.#clearResultsArray();
         this.#generateProblems(settings);
         this.correct = 0;
         this.wrong = 0;
         this.time = 0;
         this.gameState = 0; // 0 not started, 1 in progress, 2 Game Over
         clearInterval(this.interval);

         resolve("done");
      });
   }

   #startGame()
   {
      return new Promise(resolve =>
      {
         this.nextProblem();
         this.gameState = 1;
         this.interval = setInterval(() =>
         {
            if (this.gameState == 1)
            {
               this.time++;
            }
         }, 1000);

         resolve("done");
      });
   }

   #clearResultsArray()
   {
      return new Promise(resolve =>
      {
         const tables = Object.entries(this.settings.tables)
            .filter(([_, v]) => v)
            .map(([k]) => Number(k));

         this.results = [];
         this.numProblems = 0;

         for (let i = 0; i < tables.length; i++)
         {
            this.results[i] = [];

            for (let j = 0; j < tables.length; j++)
            {
               this.results[i][j] = 0;
               this.numProblems++;
            }
         }

         resolve("done");
      });
   }

   nextProblem()
   {
      return new Promise(resolve =>
      {
         this.currentProblem = this.allProblems.pop();
         resolve("done");
      });
   }

   checkResult(result)
   {
      return new Promise(resolve =>
      {
         let p = (this.currentProblem[0] * this.currentProblem[1]);
         let r = parseInt(result);

         let lengthP = this.#howManyDigitsInNumber(p);
         let lengthR = this.#howManyDigitsInNumber(r);

         let toReturn = "nothing";
         if (lengthP === lengthR)
         {
            if (p == r)
            {
               this.results[this.currentProblem[0] - 1][this.currentProblem[1] - 1];
               this.currentProblem
               toReturn = "correct";
               this.correct++;
               if (this.correct == this.numProblems)
               {
                  this.gameState = 2;
               }
            }
            else
            {
               toReturn = "wrong";
               this.wrong++;
            }
         }

         resolve(toReturn);
      });
   }

   #howManyDigitsInNumber(n)
   {
      return Math.log(n) * Math.LOG10E + 1 | 0;  // for positive integers
   }

   getProgress()
   {
      return {
         problems: this.numProblems,
         results: this.correct,
         percentage: (this.correct > 0) ? Math.round(((this.correct / this.numProblems) * 100)) : 0
      };
   }

   getConvertedTime()
   {
      const date = new Date(this.time * 1000);
      let all = date.toISOString().slice(11, 19);
      let h = parseInt(all.slice(0, 2));
      let m = parseInt(all.slice(3, 5));
      let s = parseInt(all.slice(6, 8));

      return [h, m, s];
   }
}