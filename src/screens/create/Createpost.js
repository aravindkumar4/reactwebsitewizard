import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Appsubmitbutton from "../../components/appsubmitbutton/Appsubmitbutton";
import { useFetch } from "../../hooks/useFetch";
import "./Createpost.css";
export default function Createpost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [validationError, setValidationError] = useState("");
  const { data, error, optionData } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    "POST"
  );
  const navigate = useNavigate("/");
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
    console.log({ title, body: content, id: 1 });
    optionData({ title, body: content, id: 1 });
    setValidationError("");
  };
  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);
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
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="form-group">
          <label>
            <h6>Content:</h6>
          </label>
          <textarea
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {validationError && (
          <div className="alert alert-danger" role="alert">
            {validationError}
          </div>
        )}
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Created successfully
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            Post Error occured
          </div>
        )}

        <div className="float-end">
          {/* <button type="submit" className="btn btn-primary">
            Create
          </button> */}
          <Appsubmitbutton title="create" />
        </div>
      </form>
    </div>
  );
}
