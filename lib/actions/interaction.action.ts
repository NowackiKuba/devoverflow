'use server';

import Interaction from '../models/interaction.model';
import Question from '../models/question.model';
import { connectToDB } from '../mongoose';
import { ViewQuestionParams } from './shared.types';

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDB();

    const { questionId, userId } = params;

    // Update view count for the question

    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: 'view',
        question: questionId,
      });

      if (existingInteraction) return console.log('Already viewed');

      // Create interaction

      await Interaction.create({
        user: userId,
        action: 'view',
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}
