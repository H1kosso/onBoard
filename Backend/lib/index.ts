import App from './app';
import IndexController from "./controllers/index.controller";
import BoardgameController from "./controllers/boardgame.controller";

const app: App = new App([
    new BoardgameController(),
    new IndexController()

]);

app.listen();
