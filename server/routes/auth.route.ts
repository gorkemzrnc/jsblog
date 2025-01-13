import {Router} from "express";
import { registerHandler, loginHandler, logoutHandler, refreshTokenHandler } from "../controller/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerHandler);

authRouter.post('/login', loginHandler);

authRouter.get("/logout", logoutHandler);

authRouter.get("/refresh", refreshTokenHandler);


export default authRouter;