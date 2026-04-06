export const config =
{
   site_name: "Sonny Sandberg . net",
   site_version: "0.1.1.1",
   entry: "app/frontend/js/main.js",
   api_path: "https://sonnysandberg.net/apicall/",
   css_path: "/app/frontend/CSS/",
   css_handler: "app/frontend/CSS/handler.css",
   img_path: "/app/frontend/images/",
   charset: "UTF-8",
   language: "dk",
   slogan: "",
   getTitle: function ()
   {
      return `${this.site_name} | ${this.slogan}`;
   },
   user_roles: {
      USER: 1,
      MOD: 2,
      ADMIN: 3,
      SUPER: 4
   },
   keyboards:
   {
      1: [
         [7, 8, 9],
         [4, 5, 6],
         [1, 2, 3],
         ["C", 0]],
      2: [
         [1, 2, 3],
         [4, 5, 6],
         [7, 8, 9],
         ["C", 0]]
   },
   menuItems: [
      { name: "Brøkopgaver", 
         href: "/broekgenerator/", 
         description: "Generér brøker og træn dine færdigheder inden for brøkregning.",
         icon: "¼"
      },
      { name: "Ligningsopgaver", 
         href: "/ligningsgenerator/", 
         description: "Lav ligninger til træning i ligningsløsning på forskellige niveauer.",
         icon: "x = ?"
      },
      { name: "Reduktionsopgaver", 
         href: "/reduktionsvaerktoej/", 
         description: "Øv dig i at reducere matematiske udtryk på en enkel måde.",
         icon: "(a+b)"
      },
      { name: "Træn multiplikationstabeller", 
         href: "/multiplikationstabel/", 
         description: "Træn tabeller ved at vælge dem, du vil øve, og starte spillet.",
         icon: "×"
      }
   ]
}