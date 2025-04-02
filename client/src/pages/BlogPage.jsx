import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      console.error("Blog ID is undefined.");
      return;
    }

    const apiUrl = `http://localhost:1337/api/blogs?filters[documentId][$eq]=${id}&populate=*`;
    //console.log("Fetching blog from:", apiUrl);

    axios
      .get(apiUrl)
      .then((res) => {
        if (res.data && res.data.data.length > 0) {
          setBlog(res.data.data[0]);
        } else {
          setBlog(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setBlog(null);
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-gray-500"
      >
        Loading...
      </motion.div>
    );

  if (!blog)
    return (
      <p className="text-center text-red-500 py-20">
        Blog not found. Please check the URL.
      </p>
    );

  // Extract blog data
  const { title, category, publishedAt, image } = blog || {};
  const content = Array.isArray(blog.content) ? blog.content : [];

  // Image URL handling
  const imageUrl = blog.image?.url
    ? `http://localhost:1337${blog.image.url}`
    : "https://placehold.co/800x400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl p-6"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold mt-6 text-gray-900">{title}</h1>
      <p className="text-gray-600 text-sm mt-2">{category}</p>
      <p className="text-gray-500 text-sm">
        Published on:{" "}
        {publishedAt ? new Date(publishedAt).toLocaleDateString() : "Unknown"}
      </p>
      <div className="mt-6 text-lg text-gray-800 leading-relaxed">
        {content.length > 0 ? (
          content.map((item, index) => (
            <p key={index}>
              {item.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          ))
        ) : (
          <p>No content available.</p>
        )}
      </div>
    </motion.div>
  );
};

export default BlogPage;
