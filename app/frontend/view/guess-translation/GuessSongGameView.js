import { songs } from "/app/frontend/view/guess-translation/songs.js";
import { importCSS } from "/app/frontend/utils.js";

let d = document;
const gameStates = {
   NOT_STARTED: 0,
   IN_PROGRESS: 1,
   FINISHED: 2
};

export default class GuessSongGameView 
{
   #gameState = gameStates.NOT_STARTED;
   #availableSongs;
   #usedSongs;
   #activeSong;
   #round = 0;
   #endVideoAfter = 20;
   #revealOriginalLine = false;
   #revealAnswer = false;

   constructor(container)
   {
      importCSS("guesssonggame");
      this.container = container;      

      d.addEventListener("keydown", (event) =>
      {
         const key = event.key.toLowerCase();

         switch (key)
         {
            case "s":
               this.startGame();
               break;
            case "n":
               this.getNextSong();
               this.#revealOriginalLine = false;
               this.#revealAnswer = false;

               this.render();
               break;
            case "o":
               this.#revealOriginalLine = true;
               this.render();
               break;
            case "v":
               this.#revealAnswer = true;
               this.render();
               if (this.#activeSong)
               {
                  const videoUrl = this.#activeSong.video || this.#activeSong.videoUrl || this.#activeSong.url;
                  if (videoUrl)
                  {
                     window.open(videoUrl, "_blank", "noopener,noreferrer");
                  }
               }
               break;
         }
      });
   }

   startGame()
   {
      this.#round = 0;
      this.container.innerHTML = ""; // Clear previous content
      this.#availableSongs = [...songs];
      this.#usedSongs = [];
      this.#activeSong = null;
      this.#revealOriginalLine = false;
      this.#gameState = gameStates.IN_PROGRESS;
      this.getNextSong();
      this.render();
   }

   endGame()
   {
      this.#gameState = gameStates.FINISHED;
      this.#activeSong = null;
      this.#revealOriginalLine = false;
      this.#revealAnswer = false;
      this.render();
   }

   getNextSong()
   {
      if (this.#availableSongs.length === 0)
      {
         this.endGame();
         this.render();
         return null;
      }

      if (this.#activeSong)
      {
         this.#usedSongs.push(this.#activeSong);
      }

      if (!this.#availableSongs.length)
      {
         this.#activeSong = null;
         return null;
      }

      const nextSongIndex = Math.floor(Math.random() * this.#availableSongs.length);
      this.#activeSong = this.#availableSongs.splice(nextSongIndex, 1)[0];

      this.#round++;
      return this.#activeSong;
   }

   showOriginalLine()
   {
      if (!this.#activeSong) return;
      console.log(this.#activeSong.original);
   }

   showTranslatedLine()
   {
      if (!this.#activeSong) return;
      console.log(this.#activeSong.translation);
   }

   revealOriginalLine()
   {
      if (!this.#activeSong) return;
      this.#revealOriginalLine = true;
   }

   render()
   {
      this.container.innerHTML = ""; // Clear previous content before rendering new content

      const wrapper = d.createElement("div");
      wrapper.className = "guesssonggame";
      this.container.appendChild(wrapper);

      const roundNumber = d.createElement("h1");
      
      let text = "";
      switch (this.#gameState)
      {
         case gameStates.IN_PROGRESS:
            text = `Round: ${this.#round} of ${songs.length}`;
            break;
         case gameStates.FINISHED:
            text = "Game Over";
            break;
         default:
            text = "Press S to start the game";
      }

      roundNumber.textContent = text;
      wrapper.appendChild(roundNumber);

      if (this.#activeSong)
      {
         const translatedLine = d.createElement("div");
         translatedLine.className = "translated-line";
         translatedLine.textContent = this.#activeSong.translation;
         wrapper.appendChild(translatedLine);

         const originalLine = d.createElement("div");
         originalLine.className = "original-line";
         originalLine.textContent = (this.#revealOriginalLine || this.#revealAnswer) ? this.#activeSong.original : "";
         wrapper.appendChild(originalLine);

         const answer = d.createElement("div");
         answer.className = "answer";
         wrapper.appendChild(answer);

         if (this.#revealAnswer)
         {
            const artist = d.createElement("div");
            artist.className = "artist";
            artist.textContent = this.#activeSong.artist;
            artist.style.gridArea = "artist";
            answer.appendChild(artist);

            const title = d.createElement("div");
            title.className = "title";
            title.textContent = this.#activeSong.title;
            title.style.gridArea = "title";
            answer.appendChild(title);

            const group = d.createElement("div");
            group.className = "group";
            group.textContent = this.#activeSong.group;
            group.style.gridArea = "group";
            answer.appendChild(group);


            const url = new URL(this.#activeSong.link);
            let videoId = null;

            if (["youtube.com", "www.youtube.com", "m.youtube.com", "music.youtube.com"].includes(url.hostname))
            {
               videoId = url.pathname.startsWith("/shorts/")
                  ? url.pathname.split("/")[2]
                  : url.pathname.startsWith("/embed/")
                     ? url.pathname.split("/")[2]
                     : url.searchParams.get("v");
            }
            else if (url.hostname === "youtu.be" || url.hostname === "www.youtu.be")
            {
               videoId = url.pathname.slice(1);
            }

            if (videoId && /^[a-zA-Z0-9_-]{11}$/.test(videoId))
            {
               const iframe = d.createElement("iframe");
               iframe.style.gridArea = "video";
               iframe.src = `https://www.youtube.com/embed/${videoId}?start=${this.#activeSong.start ?? 0}&end=${this.#activeSong.start + (this.#endVideoAfter ?? 15) ?? 0}&autoplay=1&cc_load_policy=0`;
               iframe.style.width = "100%";
               iframe.style.aspectRatio = "16 / 9";
               iframe.style.height = "auto";
               iframe.style.border = "none";
               iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; compute-pressure";
               iframe.allowFullscreen = true;

               answer.appendChild(iframe);
            }
         }
      }
   }
}