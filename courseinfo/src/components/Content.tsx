import React from 'react';

import { CoursePart } from '../types';
import Part from './Part';

interface ContentProps {
  courseParts: CoursePart[];
}

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {/* <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p> */}
      {courseParts.map((course) => (
        <Part key={course.name} {...course} />
      ))}
    </div>
  );
};

export default Content;
