// src/components/BlogCard.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const imageUrl = blog.image?.url
    ? `http://localhost:1337${blog.image.url}`
    : "https://placehold.co/800x400";

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      }}
      transition={{ duration: 0.3 }}
      className="border rounded-lg overflow-hidden shadow-md bg-white"
    >
      <img
        src={imageUrl}
        alt={blog.title}
        className="w-full h-56 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 mt-2">{blog.category}</p>
        <p className="text-gray-500 text-sm">
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
        <Link
          to={`/blog/${blog.documentId}`}
          className="inline-block mt-4 text-blue-500 font-medium hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;
