import CustomAvatar from "@component/components/CustomAvatar";
import {
  getBlogPostComment,
  getBlogPostDetails,
} from "@component/services/BlogPost";
import { getUserDetails } from "@component/services/Users";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";

export default function BlogDetails() {
  const router = useRouter();
  const { id, userId } = router.query;

  const { data } = useQuery({
    queryKey: ["blog-post-details"],
    queryFn: async () => await getBlogPostDetails({ id }),
  });
  const { data: userData } = useQuery({
    queryKey: ["user-details"],
    queryFn: async () => await getUserDetails({ id: userId }),
  });

  return (
    <Stack p={10} justifyContent={"center"} alignItems={"center"}>
      <Box maxWidth={"60%"}>
        <Typography variant="h4">{data?.title}</Typography>
        <CustomAvatar
          name={userData?.name ?? "Anonymous"}
          status={
            userData?.status === "inactive" || userData?.status === undefined
          }
        />
        <Typography>{data?.body}</Typography>
        <CommentSection id={id} />
      </Box>
    </Stack>
  );
}

function CommentSection({ id }: { id?: string | string[] }) {
  const { data: comments } = useQuery({
    queryKey: ["blog-post-comments", id],
    queryFn: async () => await getBlogPostComment(id),
  });

  return (
    <Box mt={5}>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="h6" sx={{ my: 2 }}>
        Comment Section
      </Typography>
      {comments?.map((comment, index) => {
        return (
          <CommentCard
            commentarBody={comment.body}
            key={index}
            commentarName={comment.name}
            commentarEmail={comment.email}
          />
        );
      })}
    </Box>
  );
}

interface CommentCardType {
  commentarBody: string;
  commentarName: string;
  commentarEmail: string;
}
function CommentCard(props: CommentCardType) {
  const { commentarBody, commentarName, commentarEmail } = props;
  return (
    <Card sx={{my: 2}}>
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
          sx={{ ml: 5, backgroundColor: "whitesmoke", p: 3, borderRadius: 1.5, color: 'black' }}
          color="text.secondary"
        >
          {commentarBody}
        </Typography>
      </CardContent>
    </Card>
  );
}

export async function getServerSideProps() {
  return {
    props: {},
  };
}
