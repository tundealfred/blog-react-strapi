import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/api";
import BlogCard from "../components/BlogCard";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data || []);
      setFilteredBlogs(data || []);

      // Extract unique categories
      const uniqueCategories = [...new Set(data?.map((blog) => blog.category))];
      setCategories(["All", ...uniqueCategories]);

      setLoading(false);
    };
    getBlogs();
  }, []);

  const filterByCategory = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category === category));
    }
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          Latest Insights
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Discover stories, ideas, and knowledge from our experts
        </motion.p>
      </div>

      {/* Category Filter */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => filterByCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === category
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
          />
        </div>
      ) : filteredBlogs.length === 0 ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 py-20 text-lg"
        >
          No blogs found in this category.
        </motion.p>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredBlogs.map((blog) => (
              <motion.div
                key={blog.documentId}
                variants={item}
                layout
                className="h-full" // Ensure all cards take full height
              >
                <BlogCard blog={blog} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Home;
