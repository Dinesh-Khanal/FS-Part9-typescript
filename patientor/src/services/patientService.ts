//import patientData from "../../data/patients.json";
import { newPatient, Patient, Entry } from "../types";
import { v1 as uuid } from "uuid";
import patients from "../../data/patientsData";
//const patients: Patient[] = patientData as Patient[];

const getNonSensetiveEntries = (): Omit<Patient[], "ssn"> => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation, entries }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries,
    })
  );
};
const getPatientById = (id: string) => patients.find((p) => p.id === id);
const addPatient = (newPatientEntry: newPatient) => {
  const patientEntry = { ...newPatientEntry, id: uuid() };
  patients.push(patientEntry);
  return patientEntry;
};
const addEntry = (newEntry: Entry, pId: string) => {
  patients.forEach((patient) => {
    if (patient.id === pId) {
      patient.entries?.push(newEntry);
      return patient;
    }
    return patient;
  });
  return newEntry;
};
export default { getNonSensetiveEntries, addPatient, getPatientById, addEntry };
