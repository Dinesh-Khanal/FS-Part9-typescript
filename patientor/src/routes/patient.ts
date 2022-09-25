import express from "express";
import patientService from "../services/patientService";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientService.getNonSensetiveEntries());
});

router.get("/:id", (req, res) => {
  const id = req.params["id"];
  res.json(patientService.getPatientById(id));
});

router.post("/", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (err) {
    if (err instanceof Error) res.status(400).send(err.message);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const pId = req.params["id"];
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, pId);
    res.json(addedEntry);
  } catch (error) {
    if (error instanceof Error) res.status(400).send(error.message);
  }
});
export default router;
