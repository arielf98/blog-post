import PostCard from "@component/components/PostCard";
import { incrementPage } from "@component/redux/blog-post/BlogPost";
import { RootState, store } from "@component/redux/store";
import { GetPostListResponse } from "@component/services/ApiTypes";
import { getBlogList } from "@component/services/BlogPost";
import { CircularProgress, Pagination, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const TOTAL_PAGE = 1252;
  const PER_PAGE = 15;
  const PAGE = Math.ceil(TOTAL_PAGE / PER_PAGE);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const { data, isLoading } = useQuery({
    queryKey: ["blog-post", page],
    queryFn: async () => await getBlogList({ page, per_page: PER_PAGE }),
  });

  return (
    <>
      {isLoading ? (
        <CircularProgress color="info" />
      ) : (
        <>
          <Stack gap={5} flexWrap={"wrap"} direction={"row"} p={10}>
            {data?.map((item, index) => {
              return (
                <PostCard
                  key={`${index}-${item.user_id}`}
                  cardContent={item.body}
                  cardTitle={item.title}
                  author={item.user_id.toString()}
                />
              );
            })}
          </Stack>
          <Stack width={"100%"} alignItems={"end"} mb={5}>
            <Pagination
              count={PAGE}
              size="large"
              sx={{ mr: 5 }}
              defaultPage={page}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
    </>
  );
}
