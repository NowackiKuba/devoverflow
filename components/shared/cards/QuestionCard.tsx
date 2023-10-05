import React from 'react';
import RenderTag from '../RenderTag';

interface Props {}

const QuestionCard = () => {
  return (
    <div className='background-light900_dark300 mt-10 h-[209px] w-full p-10 shadow-sm'>
      <h3 className='h3-bold text-left'>Best practices for data fetching</h3>
      <RenderTag name='next.js' _id={1} totalQuestions={5} />
    </div>
  );
};

export default QuestionCard;
