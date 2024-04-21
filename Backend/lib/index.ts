import App from './app';
import IndexController from "./controllers/index.controller";
import BoardgameController from "./controllers/boardgame.controller";
import UserController from "./controllers/user.controller";
import ChallengeController from "./controllers/challenge.controller";
import GamehistoryController from "./controllers/gamehistory.controller";
import GameHistoryController from "./controllers/gamehistory.controller";
import GameCollectionController from "./controllers/gamecollection.controller";

const app: App = new App([
    new BoardgameController(),
    new ChallengeController(),
    new GameHistoryController(),
    new GameCollectionController(),
    new UserController(),
    new IndexController()

]);

app.listen();
