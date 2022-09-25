interface IResult {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}
export const calculateExercise = (
  target: number,
  daily_exercises: number[]
) => {
  const periodTotal = daily_exercises.reduce((t, c) => t + Number(c), 0);
  const periodLength = daily_exercises.length;
  const trainingDays = daily_exercises.filter((d) => d > 0).length;
  const average = periodTotal / periodLength;
  const rating = 2;
  const success = average >= target;
  let ratingDescription = "";
  if (rating === 2) {
    ratingDescription = "not too bad but could be better";
  } else if (rating > 2) {
    ratingDescription = "Well done, maintain it";
  } else {
    ("oh! bad, much effort needed !");
  }
  const result: IResult = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return result;
};
try {
  const tg = Number(process.argv[2]);
  if (isNaN(tg)) throw new Error("Target must be number!");
  const hr = [];
  for (let i = 3; i < process.argv.length; i++) {
    if (isNaN(Number(process.argv[i])))
      throw new Error("Daily exercise hour must be number!");
    hr.push(Number(process.argv[i]));
  }
  console.log(calculateExercise(tg, hr));
} catch (err) {
  if (err instanceof Error) {
    console.log("Error:", err.message);
  }
}
