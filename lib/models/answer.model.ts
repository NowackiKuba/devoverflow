import { Schema, models, model, Document } from 'mongoose';

interface IAnswers extends Document {
  author: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
  upvotes: Schema.Types.ObjectId[];
  downvotes: Schema.Types.ObjectId[];
  content: string;
  createdAt: Date;
}

const answerSchema = new Schema<IAnswers>({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  question: { type: Schema.Types.ObjectId, ref: 'Question', required: true },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const Answer = models.Answer || model('Answer', answerSchema);

export default Answer;
