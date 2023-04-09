import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ReactNode } from "react";
export interface SelectAbleType {
  label: string;
  value: string;
}

export interface SelectComponentType {
  title: string;
  value: SelectAbleType[];
  selectedValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (event: SelectChangeEvent<string>, child: ReactNode) => void;
}
export default function SelectComponent(props: SelectComponentType) {
  const { title, value, onChange, selectedValue } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="select">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={title}
        onChange={onChange}
        value={selectedValue}
      >
        {value.map((status, index) => (
          <MenuItem key={`${status.label}-${index}`} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
