import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Avatar, CardActionArea, Stack } from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import { LinkProps } from "next/link";

interface PostCardType {
  cardTitle: string;
  cardContent: string;
}

export default function PostCard(props: PostCardType) {
  const { cardContent, cardTitle } = props;
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

// eslint-disable-next-line react/display-name
export const PostCardButton = React.forwardRef<
  HTMLAnchorElement,
  {
    onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
    href?: string | undefined;
    cardContent: string;
    cardTitle: string;
  }
>(({ onClick, href, cardContent, cardTitle }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref} style={{textDecoration: 'none'}}>
      <PostCard cardContent={cardContent} cardTitle={cardTitle} />
    </a>
  );
});
