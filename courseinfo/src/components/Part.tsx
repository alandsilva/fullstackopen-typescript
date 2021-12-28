import React from 'react';

import { CoursePart } from '../types';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.type) {
    case 'normal':
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>{props.description}</p>
        </div>
      );
      break;
    case 'groupProject':
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>project exercises {props.groupProjectCount}</p>
        </div>
      );
      break;
    case 'submission':
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>{props.description}</p>
          <p>submit to {props.exerciseSubmissionLink}</p>
        </div>
      );
      break;
    case 'special':
      return (
        <div>
          <p>
            <strong>
              {props.name} {props.exerciseCount}
            </strong>
          </p>
          <p>{props.description}</p>
          <p>
            required skills{' '}
            {props.requirements.map((r) => (
              <span key={r}>{r} </span>
            ))}
          </p>
        </div>
      );
      break;
    default:
      return assertNever(props);
  }
};

export default Part;
