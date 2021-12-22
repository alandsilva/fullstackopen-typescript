import express from 'express';
const app = express();

import calculateBmi from './bmiCalculator';

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
    res.status(404).json({ error: error });
  } else {
    next();
  }
};

app.get('/bmi', parseBmiArguments, (req, res) => {
  res.send(calculateBmi(Number(req.query.height), Number(req.query.weight)));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
