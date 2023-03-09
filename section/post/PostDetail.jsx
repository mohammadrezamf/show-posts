import { useReactQueryOnePost } from "@/hooks/useReactQueryOnePost";
import { Alert, Box, LinearProgress } from "@mui/material";
import { useRouter } from "next/router";

function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { isLoading, isError, data, error } = useReactQueryOnePost(id);

  function backToHome() {
    router.push("/");
  }

  if (isError) {
    return <Alert severity="error">{error?.message}</Alert>;
  }

  return (
    <>
      {isLoading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="min-w-0 bg-gradient-to-tr from-gray-50 to-gray-200 rounded-lg shadow-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold ">{id}</h2>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {data?.title}
            </h2>
            <p className="text-lg font-medium text-gray-900 mb-4">
              {data?.body}
            </p>
            <div className="mt-5">
              <button
                type="button"
                onClick={backToHome}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostDetail;
