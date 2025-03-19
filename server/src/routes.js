import { Router } from "express";

import playerController from "./controllers/playerController.js";
import cardController from "./controllers/cardController.js";

const routes = Router();

routes.use('/players', playerController);
routes.use('/cards', cardController);

export default routes;
