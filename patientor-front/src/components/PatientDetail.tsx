import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { IoMdBriefcase } from "react-icons/io";
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from "../types";
import { Typography } from "@material-ui/core";

const style = {
  border: "1px solid black",
  borderRadius: 5,
  padding: 10,
  marginTop: 20,
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div style={style}>
      <Typography>
        {entry.date} <MdMedicalServices />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography>Diagnose by: {entry.specialist}</Typography>
      <Typography variant="subtitle2">Discharge</Typography>
      <Typography>Date: {entry.discharge?.date}</Typography>
      <Typography>Criteria: {entry.discharge?.criteria}</Typography>
      {entry.diagnosisCodes && (
        <div>
          <Typography variant="subtitle2">Diagnosis Codes</Typography>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code, i) => <li key={i}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <div style={style}>
      <Typography>
        {entry.date} <IoMdBriefcase />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography>Diagnose by: {entry.specialist}</Typography>
      <Typography variant="subtitle2">Employer Name</Typography>
      <Typography>{entry.employerName}</Typography>
      {entry.sickLeave && (
        <div>
          <Typography variant="subtitle2">Sick Leave</Typography>
          <Typography>
            {entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}
          </Typography>
        </div>
      )}
      {entry.diagnosisCodes && (
        <div>
          <h4>Diagnosis Codes</h4>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code, i) => <li key={i}>{code}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};
const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div style={style}>
      <Typography>
        {entry.date} <MdMedicalServices />
      </Typography>
      <Typography>
        <i>{entry.description}</i>
      </Typography>
      <Typography>Diagnose by: {entry.specialist}</Typography>
      {entry.diagnosisCodes && (
        <div>
          <Typography variant="h4">Diagnosis Codes</Typography>
          <ul>
            {entry.diagnosisCodes &&
              entry.diagnosisCodes.map((code, i) => <li key={i}>{code}</li>)}
          </ul>
        </div>
      )}
      <div>
        {entry.healthCheckRating === 1 && <FaHeart fill="yellow" />}
        {entry.healthCheckRating === 0 && <FaHeart fill="green" />}
        {entry.healthCheckRating >= 2 && <FaHeart fill="red" />}
      </div>
    </div>
  );
};
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
  }
};
export default EntryDetails;
