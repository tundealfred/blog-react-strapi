import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BlogCard = ({ blog }) => {
  const getImageUrl = (blog) => {
    if (blog.image?.url) {
      return `${import.meta.env.VITE_API_URL.replace("/api", "")}${
        blog.image.url
      }`;
    } else if (typeof blog.image === "string") {
      return `${import.meta.env.VITE_API_URL.replace("/api", "")}${blog.image}`;
    }
    return "https://placehold.co/800x400";
  };

  const imageUrl = getImageUrl(blog);

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col border rounded-lg overflow-hidden shadow-sm bg-white"
    >
      <div className="aspect-w-16 aspect-h-9 overflow-hidden">
        <img
          src={imageUrl}
          alt={blog.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/800x400";
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 line-clamp-2 mb-2">
          {blog.title}
        </h2>
        <div className="mt-auto">
          <p className="text-sm font-medium text-indigo-600 mb-2">
            {blog.category}
          </p>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {new Date(blog.publishedAt).toLocaleDateString("en-GB")}
            </p>
            <Link
              to={`/blog/${blog.documentId}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors"
            >
              Read more →
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;
