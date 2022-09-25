/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercise } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});
app.get("/bmi", (req, res) => {
  const h = Number(req.query.height);
  const m = Number(req.query.weight);
  try {
    if (isNaN(h) && isNaN(m)) {
      throw new Error("malformatted parameters");
    }
    const bmi = calculateBmi(h, m);
    res.json({
      weight: m,
      height: h,
      bmi,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json(err.message);
    }
  }
});
app.post("/exercises", (req, res) => {
  const { target, daily_exercises } = req.body;

  try {
    if (isNaN(target)) throw new Error("Target must be number!");
    for (let i = 0; i < daily_exercises; i++) {
      if (isNaN(daily_exercises[i])) throw new Error("malformatted parameters");
    }
    const result = calculateExercise(target, daily_exercises);
    res.json(result);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ Error: err.message });
    }
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});
