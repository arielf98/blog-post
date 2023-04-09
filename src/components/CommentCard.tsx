import { Card, CardContent, Stack, Avatar, Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";

interface CommentCardType {
  commentarBody: string;
  commentarName: string;
  commentarEmail: string;
}
export default function CommentCard(props: CommentCardType) {
  const { commentarBody, commentarName, commentarEmail } = props;
  return (
    <Card sx={{ my: 2 }}>
      <CardContent>
        <Stack direction={"row"} alignItems={"center"} gap={1} my={1}>
          <Avatar sx={{ bgcolor: deepPurple[500] }}>
            {commentarName[0].toUpperCase()}
          </Avatar>
          <Stack>
            <Typography gutterBottom variant="body1">
              {commentarName}
            </Typography>
            <Typography variant="caption" sx={{ mt: -1 }}>
              {commentarEmail}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          sx={{
            ml: 5,
            backgroundColor: "whitesmoke",
            p: 3,
            borderRadius: 1.5,
            color: "black",
          }}
          color="text.secondary"
        >
          {commentarBody}
        </Typography>
      </CardContent>
    </Card>
  );
}
