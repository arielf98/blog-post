import Loading from "@component/components/Loading";
import { PostCardButton } from "@component/components/PostCard";
import { getBlogList } from "@component/services/BlogPost";
import { Pagination, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [page, setPage] = useState(1);

  /**
   * TOTAL_ROWS is total from go-rest
   * i do manual calculation because response from posts not provide total rows
   * 1000 to safe because total number not fixed
   */
  const TOTAL_ROWS = 1000;
  const PER_PAGE = 15;
  const PAGE = Math.ceil(TOTAL_ROWS / PER_PAGE);

  const { data: blogpostData, isLoading } = useQuery({
    queryKey: ["blog-post", page],
    queryFn: async () => await getBlogList({ page, per_page: PER_PAGE }),
  });

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <title>My Blog Post</title>
          <Stack gap={5} flexWrap={"wrap"} direction={"row"} p={10}>
            {blogpostData?.map((item, index) => {
              return (
                <div key={`${item.user_id}-${index}`}>
                  <Link
                    href={`/posts/details/${item.id}/${item.user_id}`}
                    passHref
                    legacyBehavior
                  >
                    <PostCardButton
                      cardContent={item.body}
                      cardTitle={item.title}
                    />
                  </Link>
                </div>
              );
            })}
          </Stack>
          <Stack width={"100%"} alignItems={"end"} mb={5}>
            <Pagination
              count={PAGE}
              size="large"
              sx={{ mr: 5 }}
              page={page}
              onChange={handleChange}
            />
          </Stack>
        </>
      )}
    </>
  );
}
