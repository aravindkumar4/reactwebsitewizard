import React from "react";
import { useNavigate } from "react-router-dom";
import { useThemeContext } from "../../hooks/useThemeContext";
import "./Post.css";
export default function Post({ post }) {
  const { theme } = useThemeContext();
  const navigate = useNavigate();
  const handleFunction = () => {
    return navigate(`/post/${post.id}`, { state: post });
  };
  return (
    <div className={`card ${theme}post`} onClick={handleFunction}>
      <div className="card-header">{post.title}</div>
      <div className="card-body">
        <p className="card-text">{post.body}</p>
      </div>
    </div>
  );
}
