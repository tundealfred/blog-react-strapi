import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/api/blogs/${id}?populate=*`)
      .then((res) => {
        const blogData = res.data.data;
        setBlog(blogData.attributes); // Extract attributes
      })
      .catch((err) => console.error("Error fetching blog:", err));
  }, [id]);

  if (!blog)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-gray-500"
      >
        Loading...
      </motion.div>
    );

  const imageUrl = blog.image?.data?.attributes.url
    ? `http://localhost:1337${blog.image.data.attributes.url}`
    : "https://via.placeholder.com/800x400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl p-6"
    >
      <img
        src={imageUrl}
        alt={blog.title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold mt-6 text-gray-900">{blog.title}</h1>
      <p className="text-gray-600 text-sm mt-2">
        {new Date(blog.publishedAt).toLocaleDateString()}
      </p>
      <div
        className="mt-6 text-lg text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </motion.div>
  );
};

export default BlogPage;
