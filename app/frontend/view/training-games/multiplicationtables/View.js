import StartView from "./StartView.js";
import GameView from "./GameView.js";
import GameOverView from "./GameOverView.js";
import Game from "./Game.js";
import SettingsView from "./SettingsView.js";
import { importCSS } from "/app/frontend/utils.js";

export default class MultiplicationTablesView
{
   #container;
   #startView;
   #gameOverView;
   #settingsView;
   #highscoreView;

   constructor(container)
   {
      importCSS("training_games/multiplication-tables/start");
      importCSS("training_games/multiplication-tables/game");
      importCSS("training_games/multiplication-tables/game-over");
      importCSS("training_games/multiplication-tables/settings");

      this.#container = container;
      this.#startView = new StartView(container, this);
      this.#gameOverView = new GameOverView(container, this);
      this.#settingsView = new SettingsView(container, this);
   }

   getSettings()
   {
      return this.#settingsView.settings;
   }

   init()
   {
      this.showStartView();
   }

   showStartView()
   {
      this.#startView.showStart();
   }

   showGameView()
   {
      const gameView = new GameView(this.#container, this);
      gameView.showGameView();

   }

   newGameObject()
   {
      return new Promise(resolve =>
      {
         this.game = new Game();
         resolve(this.game);
      });
   }

   showGameOverView()
   {
      this.#gameOverView.showGameOverView();
   }

   showSettingsView()
   {
      this.#settingsView.showSettingsView();
   }

   showHighscoreView()
   {

   }
}