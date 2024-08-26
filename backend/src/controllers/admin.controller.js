import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponce } from "../utils/Apiresponce.js";
import { asyncHandaller } from "../utils/asyncHandeller.js";
import { Userpost } from "./../models/post.model.js";

// course offers
const homeContents = asyncHandaller(async (req, res) => {
   try {
      const userpost = await Userpost.find({ showOnHomePage: true })
         .select('title content image priseBefore priseNow offerEndDate');
      if (!userpost) {
         throw new ApiError(404, "No userpost found that showOnHomePage is true");
      }

      const devalopers = await User.find({ showOnHomePage: true }).select("fullName isVarified role workAs profileRich happyCustomer avatar");
      if (!devalopers) {
         throw new ApiError(405, "No user found that showOnHomePage is true");
      }

      const bigDealOffer = await Userpost.find({ isUnderBigdeal: true }).select("title content priseBefore priseNow image");
      if (!bigDealOffer) {
         throw new ApiError(406, "no post found that isUnderBigdeal is true");
      }

      return res.status(200).json(
         { bigDealOffer, devalopers, userpost }
      );

   } catch (error) {
      console.error("Error fetching course offers:", error);
      throw new ApiError(500, "Failed to fetch course offers");
   }
});


export { homeContents };