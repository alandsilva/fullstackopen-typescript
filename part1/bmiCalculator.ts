const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height / 100;
  const bmi = weight / (heightInM * heightInM);

  console.log(bmi);

  if (bmi >= 25.0) {
    return 'Overweight (Unhealthy)';
  } else if (bmi <= 18.4) {
    return 'Underweight (Unhealthy)';
  } else {
    return 'Normal(Normal)';
  }
};

console.log(calculateBmi(180, 74));
