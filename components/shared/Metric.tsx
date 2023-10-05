import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  textStyles?: string;
  isAuthor?: boolean;
  href?: string;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  textStyles,
  href,
  isAuthor,
}: Props) => {
  const metricContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        height={16}
        width={16}
        className={`object-contain ${href ? 'rounded-full' : ''}`}
      />
      <p className={`${textStyles} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? 'max-sm:hidden' : ''
          }`}
        >
          {title}
        </span>
      </p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className='flex-center gap-1'>
        {metricContent}
      </Link>
    );
  }
  return <div className='flex-center flex-wrap gap-1'>{metricContent}</div>;
};

export default Metric;
