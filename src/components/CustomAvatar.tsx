import { Stack, Badge, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

interface CustomAvatarType {
  name: string;
  status: boolean;
  email?: string;
}
export default function CustomAvatar(props: CustomAvatarType) {
  const { name, status, email } = props;
  return (
    <Stack direction={"row"} alignItems={"center"} gap={1}>
      <Badge
        variant="dot"
        color="success"
        sx={{ my: 3 }}
        overlap="circular"
        invisible={status}
      >
        <Avatar sx={{ bgcolor: deepOrange[500] }}>
          {name[0].toUpperCase()}
        </Avatar>
      </Badge>
      <Stack>
        <Typography variant="body1" color={"gray"}>
          {name}
        </Typography>
        {email && (
          <Typography variant="body2" color={"gray"}>
            {email}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}
