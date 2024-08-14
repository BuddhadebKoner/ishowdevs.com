import mongoose from 'mongoose';

const myworkSchema = new mongoose.Schema(
  {
    
  },
  { timestamps: true }
);

export const Mywork = mongoose.model('Mywork', myworkSchema);