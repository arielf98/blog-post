import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import CustomAvatar from "./CustomAvatar";

interface PostCardType {
  cardTitle: string;
  cardContent: string;
  author: string;
}

export default function PostCard(props: PostCardType) {
  const { cardContent, cardTitle, author } = props;
  return (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
      <CardActionArea sx={{ width: "100%", height: "100%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {cardTitle}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {cardContent.substring(0, 200)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
