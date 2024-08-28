import { Router } from "express";
import {
   chnageCurrentPassword,
   getAllUsers,
   getCurrentUser,
   loginUser,
   logoutUser,
   refreshAccessToken,
   registerUser,
   updateMyProfile,
   updateUserAvatar,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import fs from "fs";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Testing route
router.route("/test").get((req, res) => {
   res.status(200).send({ message: "User route works" });
});

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
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);
router.route("/all-users").get(getAllUsers);
// update acount details
router.route("/update-myprofile").patch(verifyJWT, updateMyProfile);


export default router;