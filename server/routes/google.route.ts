import { Router } from "express";
import { googleAuth } from "../controller/auth.controller";

const googleRouter = Router();

googleRouter.get('/auth/google', (req, res)=> {
  const REDIRECT_URI = encodeURIComponent('http://localhost:8000/oauth2/redirect/google');
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

googleRouter.get('/oauth2/redirect/google', googleAuth);

export default googleRouter;