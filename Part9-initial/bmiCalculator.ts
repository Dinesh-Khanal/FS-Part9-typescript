interface Bmivalue {
  h: number;
  m: number;
}
export const calculateBmi = (h: number, m: number) => {
  const bmi = m / (h / 100) ** 2;
  switch (bmi) {
    case bmi < 18.5 ? bmi : null:
      return "under weight (not healthy)";
    case bmi >= 18.5 && bmi < 23 ? bmi : null:
      return "normal (healthy)";
    case bmi >= 23 ? bmi : null:
      return "over weight (obese)";
    default:
      throw Error("not appropriate data to calculate bmi!");
  }
};
const parseArguments = (_args: string[]): Bmivalue => {
  if (!isNaN(Number(process.argv[2])) && !isNaN(Number(process.argv[3]))) {
    const h = Number(process.argv[2]);
    const m = Number(process.argv[3]);
    return { h, m };
  } else {
    throw new Error("Provide valid number for height and weight");
  }
};

try {
  const { h, m } = parseArguments(process.argv);
  console.log(calculateBmi(h, m));
} catch (err: unknown) {
  if (err instanceof Error) {
    console.log("Error:", err.message);
  }
}
