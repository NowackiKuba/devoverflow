import Filter from '@/components/shared/Filter';
import TagCard from '@/components/shared/cards/TagCard';
import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import { TagFilters } from '@/constants/filters';
import { getAllTags } from '@/lib/actions/tag.actions';
import Link from 'next/link';

const Page = async () => {
  const results = await getAllTags({});
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>All Tags</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center '>
        <LocalSearchbar
          route='/tags'
          iconPosition='left'
          imgSrc='/assets/icons/search.svg'
          placeholder='Search byt tag name...'
          otherClasses=''
        />
        <Filter
          filters={TagFilters}
          otherClasses='min-h-[56px] sm:min-w-[200px]'
        />
      </div>
      <section className='mt-12 flex flex-wrap gap-4'>
        <>
          {results.tags.length > 0 ? (
            results.tags.map((tag) => {
              return <TagCard key={tag.name} tag={tag} />;
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
    </>
  );
};

export default Page;
