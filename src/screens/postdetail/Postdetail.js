import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Appsubmitbutton from "../../components/appsubmitbutton/Appsubmitbutton";
import { useFetch } from "../../hooks/useFetch";
import "./Postdetail.css";
export default function Postdetail() {
  const location = useLocation();

  const { state: post } = location;
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/edit/${post.id}`, { state: post });
  };
  const { data, error, optionData } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${post.id}`,
    "DELETE"
  );
  const handleDelete = () => {
    optionData();
  };
  useEffect(() => {
    if (data.length !== 0) {
      const timer = setTimeout(() => navigate("/"), 3000);
      return () => clearTimeout(timer);
    }
  }, [data, navigate]);
  return (
    <div className="container outer">
      <div className="jumbotron">
        <h1 className="display-4">{post.title}</h1>
        <p className="lead">{post.body}</p>
        {data.length !== 0 && (
          <div className="alert alert-success" role="alert">
            Post Deleted successfully
          </div>
        )}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="float-end">
          {/* <button
            type="submit"
            className="btn btn-primary"
            onClick={handleDelete}
          >
            Delete
          </button> */}
          <Appsubmitbutton onClick={handleDelete} title="Delete" />
        </div>

        <div className="float-end">
          {/* <button
            type="submit"
            className="btn btn-primary"
            onClick={handleEdit}
          >
            Edit
          </button> */}
          <Appsubmitbutton onClick={handleEdit} title="Edit" />
        </div>
      </div>
    </div>
  );
}
