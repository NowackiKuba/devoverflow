import Filter from '@/components/shared/Filter';
import Pagination from '@/components/shared/Pagination';
import UserCard from '@/components/shared/cards/UserCard';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { UserFilters } from '@/constants/filters';
import { getAllUsers } from '@/lib/actions/user.actions';
import { SearchParamsProps } from '@/types';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community | DevOverflow',
  description:
    'Browse through the community of developers and find your next mentor or mentee.',
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const results = await getAllUsers({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Users</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center '>
        <LocalSearchbar
          route='/community'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search for amazing minds...'
          otherClasses=''
        />
        <Filter
          filters={UserFilters}
          otherClasses='min-h-[56px] sm:min-w-[170px]'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        <>
          {results.users.length > 0 ? (
            results.users.map((user) => {
              return <UserCard key={user._id} user={user} />;
            })
          ) : (
            <div className='paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center'>
              <p>No users yet</p>
              <Link href='/sign-up' className='mt-2 font-bold text-accent-blue'>
                Join to be the firstx
              </Link>
            </div>
          )}
        </>
      </section>
      <div className='mt-10'>
        <Pagination
          isNext={results.isNext}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
        />
      </div>
    </>
  );
};

export default Page;
