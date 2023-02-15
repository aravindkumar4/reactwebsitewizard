import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Appsubmitbutton from "../../components/appsubmitbutton/Appsubmitbutton";
import { useFetch } from "../../hooks/useFetch";
import "./Editpost.css";
export default function EditPost() {
  const location = useLocation();
  const { state: post } = location;
  console.log("post", post);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");
  const [modified, setModified] = useState({});

  const navigate = useNavigate("/");

  const { data, error, optionData } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "PATCH"
  );
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title) {
      setValidationError("Title should not be empty");
      return;
    }
    if (!content) {
      setValidationError("Content should not be empty");
      return;
    }
    setValidationError("");
    // console.log(modified);
    optionData(modified);
  };
  useEffect(() => {
    // console.log(data);
    setTitle(post.title);
    setContent(post.body);
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate, post.title, post.body]);
  const onTitleChange = (e) => {
    setTitle(e.target.value);
    setModified({ ...modified, title: e.target.value });
  };
  const onContentChange = (e) => {
    setContent(e.target.value);
    setModified({ ...modified, body: e.target.value });
  };
  return (
    <div className="outercontainer">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            <h6>Title:</h6>
          </label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={onTitleChange}
          ></input>
        </div>
        <div className="form-group">
          <label>
            <h6>Content:</h6>
          </label>
          <textarea
            rows="5"
            className="form-control"
            value={content}
            onChange={onContentChange}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger" role="alert">
            {validationError}
          </div>
        )}
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Edited successfully
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="float-end">
          {/* <button type="submit" className="btn btn-primary">
            Edit
          </button> */}
          <Appsubmitbutton title="Edit" />
        </div>
      </form>
    </div>
  );
}
