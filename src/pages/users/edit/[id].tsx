import SelectComponent from "@component/components/SelectComponent";
import { gender, status } from "@component/constants/usersForm";
import {
  UpdateUserType,
  getUserDetails,
  updateUser,
} from "@component/services/Users";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useState } from "react";
import { MessageResponse } from "../add";

export interface EventType {
  name: string;
  email: string;
  gender: string;
  status: string;
}
export default function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const [event, updateEvent] = useReducer(
    (prev: EventType, next: Partial<EventType>): EventType => {
      return { ...prev, ...next };
    },
    { name: "", email: "", gender: "", status: "" }
  );
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const { data } = useQuery({
    queryKey: ["user-detail", id],
    queryFn: async () => await getUserDetails({ id }),
  });

  const updateMutation = useMutation({
    mutationKey: ["update-details", id],
    mutationFn: async (body: UpdateUserType) => await updateUser(body),
    onSuccess: () => {
      setOpen(true);
      setMessage("User berhasil di edit");
    },
    onError: () => {
      setOpen(true);
      setMessage("User gagal diedit");
    },
  });

  function handleUpdateUser() {
    updateMutation.mutate({
      email: event.email,
      gender: event.gender,
      name: event.name,
      status: event.status,
      id: typeof id === "string" ? id : "",
    });
  }

  function handleClose() {
    setOpen(false);
  }

  useEffect(() => {
    updateEvent({
      email: data?.email,
      gender: data?.gender,
      name: data?.name,
      status: data?.status,
    });
  }, [data]);

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
        <TextField
          placeholder="name"
          value={event.name}
          onChange={(e) => updateEvent({ name: e.target.value })}
        />
        <TextField
          placeholder="email"
          value={event.email}
          onChange={(e) => updateEvent({ email: e.target.value })}
        />
        <SelectComponent
          title="Gender"
          value={gender}
          selectedValue={event.gender}
          onChange={(e) => updateEvent({ gender: e.target.value })}
        />
        <SelectComponent
          title="Status"
          value={status}
          selectedValue={event.status}
          onChange={(e) => updateEvent({ status: e.target.value })}
        />
        <Button
          variant="outlined"
          color="inherit"
          sx={{ mt: 6 }}
          onClick={() => handleUpdateUser()}
        >
          Update
        </Button>
      </Stack>
      <MessageResponse
        handleClose={() => handleClose()}
        message={message}
        open={open}
      />
    </Stack>
  );
}
