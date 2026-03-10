import ViewHandler from "/app/frontend/ViewHandler.js";
import { config } from "/app/frontend/config.js";

window.document.title = `${config.getTitle()}`;

const viewHandler = new ViewHandler();
viewHandler.init();

friconix_update();