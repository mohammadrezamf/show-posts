import { useRouter } from "next/router";
import React from "react";

function Post({ post }) {
  const router = useRouter();
  const { id, title, body } = post;

  // function to navigate to detail page
  function navigateToDetailPageHandler(id) {
    router.push(`postDetail/${id}`);
  }

  // function to trim string
  function trimString(string, length) {
    return string.length > length
      ? string.substring(0, length) + "..."
      : string;
  }

  return (
    <div
      className="flex flex-col justify-between h-48 bg-gradient-to-t from-blue-200 to-blue-300 rounded-lg shadow-md"
      data-testid="post"
    >
      <div className="p-4">
        <h6 className="text-lg font-bold">id: {id}</h6>
        {title && (
          <h6 className="text-lg font-bold mb-4">
            title: {trimString(title, 10)}
          </h6>
        )}
        {body && <p className="text-sm">description: {trimString(body, 20)}</p>}
      </div>
      <div className="p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          onClick={() => navigateToDetailPageHandler(id)}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}

export default Post;
