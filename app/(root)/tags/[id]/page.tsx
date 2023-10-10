import QuestionCard from '@/components/shared/cards/QuestionCard';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { getQuestionByTagId } from '@/lib/actions/tag.actions';
import { IQuestions } from '@/lib/models/question.model';
import { URLProps } from '@/types';
import React from 'react';

const Page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>{result.tagTitle}</h1>
      <div className='mt-11 w-full'>
        <LocalSearchbar
          route={`/tags/${params.id}`}
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search tag questions'
          otherClasses='flex-1 w-full'
        />
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.questions.length > 0 ? (
          <>
            {result.questions.map((question: IQuestions) => (
              <QuestionCard
                key={question._id}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))}
          </>
        ) : (
          <>
            <NoResult
              title="There's no tag questions to show"
              description='Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡'
              link='/add-question'
              linkTitle='Ask a Question'
            />
          </>
        )}
      </div>
      <div className='mt-10'>
        <Pagination
          isNext={result.isNext}
          pageNumber={searchParams.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default Page;
