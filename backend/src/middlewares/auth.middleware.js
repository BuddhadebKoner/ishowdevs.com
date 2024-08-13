import { User } from "../models/user.model.js";
import { asyncHandaller } from "../utils/asyncHandeller.js";
import { ApiError } from "./../utils/ApiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandaller(async (req, _, next) => {
   try {
      const token =
         req.cookies?.accessToken ||
         req.headers["authorization"]?.replace("Bearer ", "");

      // console.log("Token from cookies or headers:", token); // Log the token

      if (!token) {
         throw new ApiError(401, "Unauthenticated request");
      }

      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // console.log("Decoded Token:", decodedToken); // Log the decoded token

      const user = await User.findById(decodedToken?._id).select(
         "-password -refreshToken"
      );

      if (!user) {
         throw new ApiError(401, "invalid access token");
      }

      req.user = user;
      next();
   } catch (error) {
      // console.log("error", error); 
      throw new ApiError(401, error?.message || "invalid access token");
   }
});
