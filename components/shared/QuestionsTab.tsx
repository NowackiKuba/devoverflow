import { getUserQuestions } from '@/lib/actions/user.actions';
import { SearchParamsProps } from '@/types';
import React from 'react';
import QuestionCard from './cards/QuestionCard';
import Pagination from './Pagination';

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string;
}

const QuestionsTab = async ({ userId, searchParams, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });

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
      <div className='mt-10'>
        <Pagination
          isNext={result.isNext}
          pageNumber={searchParams.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default QuestionsTab;
