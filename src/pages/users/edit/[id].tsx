import SelectComponent from "@component/components/SelectComponent";
import { gender, status } from "@component/constants/usersForm";
import { Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={3}>
      <Typography variant="h5">Edit User {id} </Typography>
      <Stack
        minWidth={"50%"}
        gap={2}
        borderColor={"black"}
        border={1}
        p={2}
        borderRadius={2}
      >
        <TextField
          placeholder={typeof id === "string" ? id : ""}
          disabled
          fullWidth
        />
        <TextField placeholder="name" />
        <TextField placeholder="email" />
        <SelectComponent title="Gender" value={gender} />
        <SelectComponent title="Status" value={status} />
      </Stack>
    </Stack>
  );
}
