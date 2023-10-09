'use client';
import { HomePageFilters } from '@/constants/filters';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import router from 'next/router';

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const [selectedFilter, setSelectedFilter] = useState<string>('');
  const active = selectedFilter || '';
  searchParams.get('filter');
  const router = useRouter();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (selectedFilter) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'filter',
          value: selectedFilter,
        });
        router.push(newUrl, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedFilter, router, searchParams]);
  return (
    <div className='mt-10 flex-wrap gap-3 md:flex'>
      {HomePageFilters.map((filter) => (
        <Button
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === filter.value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-400'
          }`}
          key={filter.value}
          onClick={() => setSelectedFilter(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
