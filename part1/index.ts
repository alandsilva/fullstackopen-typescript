import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

const parseBmiArguments = (
  req: express.Request,
  res: express.Response,
  next: () => void
) => {
  let error = null;
  if (!('height' in req.query) || !('weight' in req.query)) {
    error = 'not enough parameters';
  }
  if (Object.keys(req.query).length > 2) {
    error = 'too many parameters';
  }
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    error = 'malformatted parameters';
  }
  if (error) {
    res.status(400).json({ error: error });
  } else {
    next();
  }
};

app.get('/bmi', parseBmiArguments, (req, res) => {
  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

const parseExerciseArguments = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  let error = null;

  if (!daily_exercises || !target) error = 'parameters missing';
  else if (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    isNaN(target) ||
    !daily_exercises.every((el: any) => typeof el === 'number')
  )
    error = 'malformatted parameters';

  if (error) {
    res.status(400).json({ error: error });
  } else {
    next();
  }
};

app.post('/exercises', parseExerciseArguments, (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
