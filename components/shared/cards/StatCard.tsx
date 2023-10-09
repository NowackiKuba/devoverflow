import React from 'react';

interface Props {
  type: string;
  questions: [];
  answers: [];
}

const StatCard = ({ type, questions, answers }: Props) => {
  return <div className='h-10 w-32 rounded-xl'></div>;
};

export default StatCard;
