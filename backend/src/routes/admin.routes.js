import { Router } from "express";
import { homeContents } from "../controllers/admin.controller.js";


const router = Router();

// course offers
router.route("/home-content").get(homeContents);



export default router;