interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  value1: Array<number>;
  value2: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const arr = args.slice(3).map((num) => Number(num));

  if (!isNaN(Number(args[2])) && !arr.includes(NaN)) {
    return {
      value1: arr,
      value2: Number(args[2]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (days: Array<number>, target: number): Result => {
  const periodLength = days.length;
  const trainingDays = days.filter((d) => d > 0).length;
  const average = days.reduce((acc, curr) => acc + curr) / periodLength;
  const rating = Math.round(average);
  const success = average >= target;
  const ratingDescription = success
    ? 'good going. keep it up'
    : 'not too bad but could be better';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

try {
  const { value1, value2 } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
