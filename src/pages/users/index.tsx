import CustomAvatar from "@component/components/CustomAvatar";
import { getAllUsers } from "@component/services/Users";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import Link from "next/link";
import AddIcon from "@mui/icons-material/Add";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Users() {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const { data } = useQuery({
    queryKey: ["user-list"],
    queryFn: async () => await getAllUsers(page, perPage),
  });
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
      {data?.map((item, index) => {
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
                        item.status === "inactive" || item.status === undefined
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
                    <Button color="inherit">
                      <ModeEditIcon />
                    </Button>
                    <Button color="error">
                      <DeleteIcon />
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );
      })}
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
