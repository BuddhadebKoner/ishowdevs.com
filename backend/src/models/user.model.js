import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt";

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true,
      },
      fullName: {
         type: String,
         required: true,
         trim: true,
         index: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
      },
      password: {
         type: String,
         required: [true, "password is required"],
      },
      avatar: {
         type: String,
         required: true,
      },
      coverImage: {
         type: String,
         required: true,
      },
      isVarified: {
         type: Boolean,
         default: false,
      },
      portfolio: {
         type: String,
         required: true,
      },
      mobile: {
         type: String,
      },
      workAs: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         enum: ["user", "admin", "superAdmin"],
         default: "user",
      },
      bio: {
         type: String,
      },
      mediaLinks: {
         type: [String],
      },
      keyWords: {
         type: String,
      },
      refreshToken: {
         type: String,
      },
      isActive: {
         type: Boolean,
         default: false,
      },
      profileRich: {
         type: Number,
         default: 0,
      },
      happyCustomer: {
         type: Number,
         default: 0,
      },
      Userpost: [
         {
            type: Schema.Types.ObjectId,
            ref: "Userpost",
         },
      ],
   },
   { timestamps: true }
);

// dont write here arrow function, because there dont have access of this

userSchema.pre("save", async function (next) {
   if (!this.isModified("password")) {
      next();
   }
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
   return await bcrypt.compare(password, this.password);
};

// jwt token
userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         email: this.email,
         username: this.username,
         fullName: this.fullName,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
         expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      }
   );
};
userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
         expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      }
   );
};

export const User = mongoose.model("User", userSchema);
