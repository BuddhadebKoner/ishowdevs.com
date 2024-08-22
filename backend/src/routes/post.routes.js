import { Router } from "express";
import { createPost, deletePost, getAllPostsByUserId } from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import fs from "fs";
import { upload } from "../middlewares/multer.middleware.js";


const router = Router();

// create post 
router.route("/create-post").post(verifyJWT, (req, res, next) => {
   try {
      upload.fields([
         { name: "image", maxCount: 1 }
      ])(req, res, (err) => {
         if (err) {
            console.error("Error during file upload:", err);
            fs.appendFileSync("error.log", `Error during file upload: ${err}\n`);
            return res.status(500).send({ error: "File upload failed" });
         }
         next();
      });
   } catch (error) {
      console.error("Unexpected error:", error);
      fs.appendFileSync("error.log", `Unexpected error: ${error}\n`);
      res.status(500).send({ error: "An unexpected error occurred" });
   }
}, createPost);
// get all posts by user id
router.route("/:userId/posts").get(getAllPostsByUserId);
// delete post by post id
router.route("/:postId/delete-post").delete(verifyJWT, deletePost);

export default router;