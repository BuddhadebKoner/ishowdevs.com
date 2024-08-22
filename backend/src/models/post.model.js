import mongoose from 'mongoose';

const userpostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
    },
    keyWords: {
      type: String,
    },
    publishedAt: {
      type: Date,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Userpost = mongoose.model('Userpost', userpostSchema);

