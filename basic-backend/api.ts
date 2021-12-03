import * as express from "express";
import * as logger from './util/logger'

let router = express.Router();
router.use(logger.logToConsole);
router.use(express.json());
router.use('/', (_req: express.Request, res: express.Response) => {
    res.status(200);
    res.send("start api!");
});
router.use((_req: express.Request, res: express.Response) => {
    res.status(404)
    res.send('Route does not exist');

});

export {router as api}
