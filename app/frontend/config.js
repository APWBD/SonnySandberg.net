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
   getTitle: function()
   {
      return `${this.site_name} | ${this.slogan}`;
   },
   user_roles: {
      USER: 1,
      MOD: 2,
      ADMIN: 3,
      SUPER: 4
   }
}