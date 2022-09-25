import { State } from "./state";
import { Diagnosis, Patient, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_ENTRY";
      payload: { newEntry: Entry; id: string };
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "ADD_ENTRY":
      const updatedPatient = state.patients[action.payload.id];
      updatedPatient.entries.push(action.payload.newEntry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: updatedPatient,
        },
      };
    case "SET_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ [diagnosis.code]: diagnosis, ...memo }),
            {}
          ),
        },
      };
    default:
      return state;
  }
};
export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return { type: "SET_PATIENT_LIST", payload: patientListFromApi };
};
export const addPatient = (newPatient: Patient): Action => {
  return { type: "ADD_PATIENT", payload: newPatient };
};
export const setPatientDetail = (patientFromApi: Patient): Action => {
  return { type: "SET_PATIENT", payload: patientFromApi };
};
export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): Action => {
  return { type: "SET_DIAGNOSIS_LIST", payload: diagnosisListFromApi };
};
export const addEntry = (newEntry: Entry, id: string): Action => {
  return { type: "ADD_ENTRY", payload: { newEntry, id } };
};
