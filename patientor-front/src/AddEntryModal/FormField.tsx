import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import {
  Select,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";

import { InputLabel } from "@material-ui/core";

export type TypeOption = {
  value: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  label: string;
};

export type RatingOption = {
  value: number;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: TypeOption[] | RatingOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);
