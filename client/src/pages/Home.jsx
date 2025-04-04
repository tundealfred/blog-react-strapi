import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import { motion } from "framer-motion";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data || []);
      setFilteredBlogs(data || []);
      setLoading(false);

      // Extract unique categories
      const uniqueCategories = [
        "All",
        ...new Set(data.map((blog) => blog.category)),
      ];
      setCategories(uniqueCategories);
    };
    getBlogs();
  }, []);

  // Filter blogs when category changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === selectedCategory)
      );
    }
  }, [selectedCategory, blogs]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6"
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">
        Latest Blogs
      </h1>

      {/* Category Filter */}
      <div className="flex justify-center gap-4 mb-6">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Loading Skeletons */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <motion.div
              key={index}
              className="animate-pulse bg-gray-300 h-72 rounded-lg"
            />
          ))}
        </div>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs found.</p>
      ) : (
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog.documentId} blog={blog} />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;
