import express from "express";
import diagnoseRouter from "./routes/diagnose";
import patientRouter from "./routes/patient";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.use("/api/diagnosis", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is up and running in port ${PORT}`);
});
