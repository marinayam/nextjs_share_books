import { Schema, model, models } from 'mongoose';

const ReviewSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  review: {
    type: String,
    required: [true, 'レビューの入力は必須です'],
  },
  tag: {
    type: String,
    required: [true, 'タグは入力必須です'],
  }
});

const Review = models.Review || model('Review', ReviewSchema);

export default Review;