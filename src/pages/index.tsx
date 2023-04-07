import PostCard from "@component/components/PostCard";
import { GetPostListResponse } from "@component/services/PostServices";
import { Box, Stack, Typography } from "@mui/material";
import { InferGetServerSidePropsType } from "next";

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Stack gap={5} flexWrap={"wrap"} direction={"row"} p={10}>
        {data.map((item, index) => {
          return (
            <PostCard
              key={`${index}-${item.user_id}`}
              cardContent={item.body}
              cardTitle={item.title}
              author="next"
            />
          );
        })}
      </Stack>
    </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("https://gorest.co.in/public/v2/posts");
  const data: GetPostListResponse[] = await res.json();
  return { props: { data } };
}
