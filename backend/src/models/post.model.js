import mongoose from 'mongoose';

const userpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    projectLink: {
      type: String,
    },
    tags: {
      type: String,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
    },
    keyWords: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Userpost = mongoose.model('Userpost', userpostSchema);
