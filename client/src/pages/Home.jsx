import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    getBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-4 shadow-md">
            <img
              src={
                blog.attributes.image?.url || "https://via.placeholder.com/300"
              }
              alt={blog.attributes.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-semibold mt-4">
              {blog.attributes.title}
            </h2>
            <p className="text-gray-600">{blog.attributes.excerpt}</p>
            <Link to={`/blog/${blog.id}`} className="text-blue-500 mt-2 block">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
