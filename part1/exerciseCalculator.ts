interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
