import React from "react";
import { Entry } from "../types";
import { Grid, Button } from "@material-ui/core";
import { Field, Formik, Form } from "formik";
import { TextField, SelectField, TypeOption, RatingOption } from "./FormField";
import { DiagnosisSelection } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

export type EntryFormValues = Omit<Entry, "id">;

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "HealthCheck" },
  { value: "OccupationalHealthcare", label: "OccupationalHealthcare" },
  { value: "Hospital", label: "Hospital" },
];
const ratingOptions: RatingOption[] = [
  { value: 0, label: "Healthy" },
  { value: 1, label: "Low Risk" },
  { value: 2, label: "High Risk" },
  { value: 3, label: "Critical Risk" },
];
interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}
const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  return (
    <Formik
      initialValues={{
        date: "",
        specialist: "",
        description: "",
        type: "HealthCheck",
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, values, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField label="Type" name="type" options={typeOptions} />
            {values.type === "HealthCheck" ? (
              <SelectField
                label="Rating"
                name="rating"
                options={ratingOptions}
              />
            ) : null}
            <Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ float: "left" }}
                  type="button"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: "right",
                  }}
                  type="submit"
                  variant="contained"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
