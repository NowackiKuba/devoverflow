import Filter from '@/components/shared/Filter';
import NoResult from '@/components/shared/NoResult';
import Pagination from '@/components/shared/Pagination';
import QuestionCard from '@/components/shared/cards/QuestionCard';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { QuestionFilters } from '@/constants/filters';
import { getSavedQuestions } from '@/lib/actions/user.actions';

import { SearchParamsProps } from '@/types';
import { auth } from '@clerk/nextjs';

export default async function Home({ searchParams }: SearchParamsProps) {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const result = await getSavedQuestions({
    clerkId: userId,
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Saved Questions</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center '>
        <LocalSearchbar
          route='/collection'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for questions'
          otherClasses='flex-1 w-full'
        />
        <Filter
          filters={QuestionFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <div className='mt-10 flex w-full flex-col gap-6'>
        {result.questions.length > 0 ? (
          <>
            {result.questions.map((question: any) => (
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
              title="There's no saved questions to show"
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
}
