import App from './app';
import IndexController from "./controllers/index.controller";
import BoardgameController from "./controllers/boardgame.controller";
import UserController from "./controllers/user.controller";

const app: App = new App([
    new BoardgameController(),
    new UserController(),
    new IndexController()

]);

app.listen();
