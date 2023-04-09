import SelectComponent from "@component/components/SelectComponent";
import { gender, status } from "@component/constants/usersForm";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useReducer, useState } from "react";
import { EventType } from "./edit/[id]";
import { useMutation } from "@tanstack/react-query";
import { UpdateUserType, addUsers } from "@component/services/Users";

export default function AddUsers() {
  const router = useRouter();
  const { id } = router.query;
  const [open, setOpen] = useState(false);
  console.log("🚀 ~ file: add.tsx:26 ~ AddUsers ~ open:", open)
  const [message, setMessage] = useState("");

  const [event, updateEvent] = useReducer(
    (prev: EventType, next: Partial<EventType>): EventType => {
      return { ...prev, ...next };
    },
    { name: "", email: "", gender: "", status: "" }
  );

  const addUserMutation = useMutation({
    mutationKey: ["add-user"],
    mutationFn: async (body: UpdateUserType) => await addUsers(body),
    onSuccess: () => {
      setOpen(true);
      setMessage("User berhasil ditambahkan");
    },
    onError: () => {
      setOpen(true);
      setMessage("User gagal ditambahkan");
    },
  });

  function handleAddUser() {
    addUserMutation.mutate({
      email: event.email,
      gender: event.gender,
      name: event.name,
      status: event.status,
    });
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Stack justifyContent={"center"} alignItems={"center"} gap={3}>
      <Typography variant="h5">Add User {id} </Typography>
      <Stack
        minWidth={"50%"}
        gap={2}
        borderColor={"black"}
        border={1}
        p={5}
        borderRadius={2}
      >
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
          onClick={() => handleAddUser()}
        >
          Add User
        </Button>
      </Stack>
      <MessageResponse
        handleClose={() => handleClose()}
        open={open}
        message={message}
      />
    </Stack>
  );
}

interface MessageResponseType {
  message: string;
  open: boolean;
  handleClose: () => void;
}
export function MessageResponse(props: MessageResponseType) {
  const { message, open, handleClose } = props;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogContent>
          <Typography>{message}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
