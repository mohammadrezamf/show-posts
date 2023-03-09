import axios from "axios";
import { useQuery } from "react-query";

const API_URL = "https://jsonplaceholder.typicode.com/posts";
const fetchPostsApi = async () => {
  const response = await axios(API_URL);
  return response.data;
};

export const useReactQueryPosts = () => {
  return useQuery("post-news", fetchPostsApi);
};
