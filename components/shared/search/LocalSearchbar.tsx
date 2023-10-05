'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}

const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div
      className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ${otherClasses}`}
    >
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt={imgSrc}
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
      <Input
        value=''
        onChange={() => {}}
        type='text'
        placeholder={placeholder}
        className='paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none'
      />
      {iconPosition === 'left' && (
        <Image
          src={imgSrc}
          alt={imgSrc}
          width={24}
          height={24}
          className='cursor-pointer'
        />
      )}
    </div>
  );
};

export default LocalSearchbar;
