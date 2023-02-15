import { useState, useEffect } from "react";

// const url =  "https://jsonplaceholder.typicode.com/posts"
export const useFetch = (url, method = "GET") => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isPending, setIsPendng] = useState(false);
  const [options, setOptions] = useState(null);
  const optionData = (data) => {
    if (method === "POST") {
      setOptions({
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (method === "PATCH") {
      setOptions({
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    } else if (method === "DELETE") {
      setOptions({
        method: "DELETE",
      });
    }
  };
  useEffect(() => {
    const fetchPosts = async (options) => {
      setIsPendng(true);
      const response = await fetch(url, { ...options });
      const jsonResponse = await response.json();
      if (response.ok) {
        setData(jsonResponse);
        setError("");
        setIsPendng(false);
      }
      if (!response.ok) {
        setError(jsonResponse.error);
        setIsPendng(false);
      }
    };
    if (method === "GET") {
      fetchPosts();
    }
    if (
      (method === "POST" || method === "PATCH" || method === "DELETE") &&
      options
    ) {
      fetchPosts(options);
    }
  }, [url, method, options]);
  return { data, error, isPending, optionData };
};
