import { Router } from "express";
import {
   chnageCurrentPassword,
   getCurrentUser,
   getUserChanalProfile,
   loginUser,
   logoutUser,
   refreshAccessToken,
   registerUser,
   UpdateAcountDetails,
   updateUserAvatar,
   updateUserCoverImage,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import fs from "fs";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post((req, res, next) => {
   try {
      upload.fields([
         { name: "avatar", maxCount: 1 },
         { name: "coverImage", maxCount: 1 },
      ])(req, res, (err) => {
         if (err) {
            console.error("Error during file upload:", err);
            fs.appendFileSync(
               "error.log",
               `Error during file upload: ${err}\n`
            );
            return res.status(500).send({ error: "File upload failed" });
         }
         next();
      });
   } catch (error) {
      console.error("Unexpected error:", error);
      fs.appendFileSync("error.log", `Unexpected error: ${error}\n`);
      res.status(500).send({ error: "An unexpected error occurred" });
   }
}, registerUser);

router.route("/login").post(loginUser);

// secrure route
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/chnage-password").post(verifyJWT, chnageCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-acount").patch(verifyJWT, UpdateAcountDetails);
router
   .route("/avatar")
   .patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router
   .route("/cover-image")
   .patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);
router.route("/c/:username").get(verifyJWT, getUserChanalProfile);

export default router;
   