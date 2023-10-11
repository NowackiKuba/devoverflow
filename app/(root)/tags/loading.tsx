import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <>
      <h1 className='h1-bold text-dark100_light900'>Tags</h1>
      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center '>
        <Skeleton className='h-[56px] flex-1' />
        <Skeleton className='relative min-h-[56px] sm:min-w-[170px]' />
      </div>
      <div className='mt-12 flex flex-wrap gap-4'>
        {[...Array(10)].map((item) => (
          <Skeleton key={item} className='h-[243px] w-[260px]' />
        ))}
      </div>
    </>
  );
};

export default loading;
