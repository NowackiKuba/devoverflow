import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const loading = () => {
  return (
    <>
      <div className='flex flex-col-reverse items-start justify-between sm:flex-row'>
        <div className='flex flex-col items-start gap-4 lg:flex-row'>
          <Skeleton className='h-[140px] w-[140px] rounded-full object-contain' />
          <div className='mt-3'>
            <Skeleton className='h-[42px] w-[159px]' />
            <Skeleton className='mt-2 h-[22px] w-[61px]' />
            <div className='mt-5 flex flex-wrap items-center justify-start gap-5'>
              <Skeleton className='h-[22px] w-[105px]' />
              <Skeleton className='h-[22px] w-[107px]' />
              <Skeleton className='h-[22px] w-[133px]' />
            </div>
            <div className='mt-8'>
              <Skeleton className='h-[44px] w-[791px]' />
            </div>
          </div>
        </div>
      </div>
      <div className='mt-10'>
        <div className='mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4'>
          <Skeleton className='h-[92px] w-[250px]' />
          <Skeleton className='h-[92px] w-[250px]' />
          <Skeleton className='h-[92px] w-[250px]' />
          <Skeleton className='h-[92px] w-[250px]' />
        </div>
      </div>
      <div className='mt-10 flex flex-col gap-10'>
        <Skeleton className='h-[42px] w-[222px]' />
        {[...Array(10)].map((item) => (
          <Skeleton key={item} className='h-[209px] w-[766px]' />
        ))}
      </div>
    </>
  );
};

export default loading;
