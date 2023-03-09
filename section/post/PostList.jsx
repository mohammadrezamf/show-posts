import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { useReactQueryPosts } from "@/hooks/useReactQueryPosts";
import PostDetail from "./post";
import { Alert, Box, LinearProgress } from "@mui/material";

const postListAtom = atom([]);
const searchTermAtom = atom("");

function PostList() {
  const [postListData, setPostListData] = useAtom(postListAtom);
  const [searchTerm, setSearchTerm] = useAtom(searchTermAtom);
  const { isLoading, isError, data, error } = useReactQueryPosts();

  const handleSearch = (event) => setSearchTerm(event.target.value);

  const filteredPosts = postListData.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortPostsById = (order) => {
    const sorted = [...postListData].sort((a, b) => {
      if (order === "asc") return a.id - b.id;
      if (order === "desc") return b.id - a.id;
      return 0;
    });
    setPostListData(sorted);
  };

  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    if (storedSearchTerm) setSearchTerm(storedSearchTerm);
  }, []);

  useEffect(() => {
    localStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (data) setPostListData(data);
  }, [data, setPostListData]);

  if (isError) {
    return <Alert severity="error">{error?.message}</Alert>;
  }
  return (
    <div className="container mx-auto">
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="p-2 pt-3 pb-2">
          <div className="flex justify-between mb-5">
            <div className="flex">
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded mr-2"
                onClick={() => sortPostsById("desc")}
              >
                Descending order
              </button>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded"
                onClick={() => sortPostsById("asc")}
              >
                Ascending order
              </button>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                className="border rounded py-2 px-3 "
                placeholder="Search"
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {isLoading ? (
              <div className="w-full">
                <div className="h-4 bg-blue-200 animate-pulse rounded"></div>
              </div>
            ) : (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="col-span-1"
                  data-cy="post"
                  data-post-id={post.id}
                >
                  <PostDetail post={post} />
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostList;
