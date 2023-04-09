import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
export interface SelectAbleType {
  label: string;
  value: string;
}

export interface SelectComponentType {
  title: string;
  value: SelectAbleType[];
}
export default function SelectComponent(props: SelectComponentType) {
  const { title, value } = props;
  return (
    <FormControl fullWidth>
      <InputLabel id="select">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={title}
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
