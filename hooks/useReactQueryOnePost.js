import axios from "axios";
import { useQuery } from "react-query";

const fetchOnePost = async (postId) => {
  const response = await axios(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  return response.data;
};

export const useReactQueryOnePost = (postId) => {
  return useQuery(["post-news-detail", postId], () => fetchOnePost(postId));
};
