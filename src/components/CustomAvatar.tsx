import { Stack, Badge, Avatar, Typography } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";

interface CustomAvatarType {
  name: string;
  status: boolean;
}
export default function CustomAvatar(props: CustomAvatarType) {
  const { name, status } = props;
  return (
    <Stack direction={"row"} alignItems={"center"} gap={2}>
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
      <Typography variant="body2" color={"gray"}>
        {name}
      </Typography>
    </Stack>
  );
}
