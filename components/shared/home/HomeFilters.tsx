'use client';
import { HomePageFilters } from '@/constants/filters';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';

const HomeFilters = () => {
  const searchParams = useSearchParams();

  searchParams.get('filter');
  const [active, setActive] = useState<string>('');
  const router = useRouter();

  const handleTypeClick = (item: string) => {
    if (active === item) {
      setActive('');
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: null,
      });
      router.push(newUrl, { scroll: false });
    } else {
      setActive(item);
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'filter',
        value: item.toLowerCase(),
      });
      router.push(newUrl, { scroll: false });
    }
  };
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
          onClick={() => handleTypeClick(filter.value)}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
