import {Router} from "express";
import { registerHandler, loginHandler, logoutHandler, refreshTokenHandler, deleteAllSessionsHandler, googleAuth } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerHandler);

authRouter.post('/login', loginHandler);

authRouter.get("/logout", logoutHandler);

authRouter.get("/refresh", refreshTokenHandler);

authRouter.delete('/session', deleteAllSessionsHandler);

export default authRouter;