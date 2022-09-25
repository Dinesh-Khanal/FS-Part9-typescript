import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import { Patient, Entry } from "../types";
import axios from "axios";
import { setPatientDetail } from "../state";
import PatientDetail from "../components/PatientDetail";
import { Typography, Button } from "@material-ui/core";
import { MdFemale, MdMale } from "react-icons/md";
import AddEntryModal from "../AddEntryModal";
import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import { addEntry } from "../state";
const PatientPage = () => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const id = useParams().id as string;
  const [, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addEntry(newEntry, id));
      closeModal();
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/patients/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setPatient(response.data);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        dispatch(setPatientDetail(response.data));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatient();
  }, [dispatch]);

  return (
    <div>
      <Typography variant="h5">
        {patient?.name} {patient?.gender === "male" ? <MdMale /> : <MdFemale />}
      </Typography>
      <Typography>ssn:{patient?.ssn}</Typography>
      <Typography>Occupation: {patient?.occupation}</Typography>
      <h2>entries</h2>
      {patient?.entries.map((p) => (
        <PatientDetail key={p.id} entry={p} />
      ))}
      <Button variant="contained" color="primary" onClick={() => openModal()}>
        ADD NEW ENTRY
      </Button>
      <AddEntryModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitEntry}
        error={error}
      />
    </div>
  );
};

export default PatientPage;
