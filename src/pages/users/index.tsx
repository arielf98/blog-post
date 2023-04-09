import CustomAvatar from "@component/components/CustomAvatar";
import { deleteUsers, getAllUsers } from "@component/services/Users";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import Loading from "@component/components/Loading";

export default function Users() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["user-list", userName],
    queryFn: async () => await getAllUsers(page, perPage, userName),
  });

  function handleClose(): void {
    setOpen(false);
  }

  return (
    <Container>
      <Stack justifyContent={"end"} alignItems={"end"} p={3}>
        <Link
          href="/users/add"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            variant="outlined"
            color="inherit"
            sx={{ alignItems: "center", display: "flex" }}
          >
            <Typography>Add Users</Typography>
            <AddIcon />
          </Button>
        </Link>
      </Stack>
      <TextField
        placeholder="Search User By Name"
        fullWidth
        sx={{ my: 2 }}
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      {isLoading ? (
        <Loading />
      ) : (
        data?.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                my: 2,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Card sx={{ minWidth: "80%" }}>
                <CardContent>
                  <Stack direction={"row"} justifyContent={"space-between"}>
                    <Stack>
                      <CustomAvatar
                        name={item.name}
                        status={
                          item.status === "inactive" ||
                          item.status === undefined
                        }
                        email={item.email}
                      />
                      {item.gender === "male" ? (
                        <GenderComponent
                          gender={item.gender}
                          icon={<MaleIcon />}
                        />
                      ) : (
                        <GenderComponent
                          gender={item.gender}
                          icon={<FemaleIcon />}
                        />
                      )}
                    </Stack>
                    <Stack justifyContent={"center"}>
                      <Link
                        style={{ textDecoration: "none" }}
                        color="inherit"
                        href={`users/edit/${item.id}`}
                      >
                        <Button color="inherit">
                          <ModeEditIcon />
                        </Button>
                      </Link>
                      <Button
                        color="error"
                        onClick={() => {
                          setOpen(true);
                          setUserId(item.id.toString());
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Box>
          );
        })
      )}
      <ResponsiveDialog
        handleClose={() => handleClose()}
        open={open}
        userId={userId}
        userName={userName}
      />
    </Container>
  );
}

interface GenderType {
  gender: string;
  icon: JSX.Element;
}
function GenderComponent(props: GenderType) {
  const { gender, icon } = props;
  return (
    <Stack direction={"row"} gap={1} alignItems={"center"}>
      {icon}
      <Typography variant="caption">{gender}</Typography>
    </Stack>
  );
}

interface DialogType {
  open: boolean;
  handleClose: () => void;
  userName: string;
  userId: string;
}
function ResponsiveDialog(props: DialogType) {
  const { open, handleClose, userName, userId } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const queryClient = useQueryClient();

  const deleteUser = useMutation({
    mutationKey: ["delete"],
    mutationFn: async (id: string) => await deleteUsers(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-list", userName] });
      handleClose();
    },
  });

  function handleDelete(id: string) {
    deleteUser.mutate(id);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        {deleteUser.isLoading ? (
          <Box>
            <Loading />
          </Box>
        ) : (
          <>
            <DialogTitle id="responsive-dialog-title">
              Yakin ingin menghapus user ?
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Data yang sudah dihapus tidak bisa dikembalikan lagi.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(userId)}
                color="error"
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
