// src/pages/BlogPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/blogs/${id}`).then((res) => {
      setBlog(res.data);
    });
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold">{blog.title}</h1>
      <p className="text-gray-600">By {blog.author}</p>
      <div
        className="mt-4"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogPage;
