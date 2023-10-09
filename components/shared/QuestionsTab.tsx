import { getUserQuestions } from '@/lib/actions/user.actions';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from './cards/QuestionCard';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ userId, searchParams, clerkId }: Props) => {
  const result = await getUserQuestions({ userId, page: 1 });

  return (
    <>
      {result.questions.map((question) => (
        <QuestionCard
          _id={question._id}
          answers={question.answers}
          author={question.author}
          clerkId={clerkId}
          createdAt={question.createdAt}
          tags={question.tags}
          title={question.title}
          upvotes={question.upvotes}
          views={question.views}
          key={question._id}
        />
      ))}
    </>
  );
};

export default QuestionsTab;
