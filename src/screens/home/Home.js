import React from "react";
import Post from "../../components/post/Post";
import { useFetch } from "../../hooks/useFetch";
import "./Home.css";
export default function Home() {
  const {
    data: posts,
    error,
    isPending,
  } = useFetch("https://jsonplaceholder.typicode.com/posts");
  return (
    <div className="container">
      {posts &&
        posts.map((post) => {
          return <Post post={post} key={post.id} />;
        })}
      {error && <h3>{error}</h3>}
      {isPending && <h1>Loading...</h1>}
    </div>
  );
}
