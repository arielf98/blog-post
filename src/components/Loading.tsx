import { Stack, CircularProgress } from "@mui/material";
import React from "react";

export default function Loading() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} p={10}>
      <CircularProgress />
    </Stack>
  );
}
