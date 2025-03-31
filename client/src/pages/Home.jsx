import { useEffect, useState } from "react";
import { fetchBlogs } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const data = await fetchBlogs();
      setBlogs(data?.data || []); // Ensure correct data format
    };
    getBlogs();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Latest Blogs</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => {
          // Correctly access the image
          const imageUrl = blog.image
            ? `http://localhost:1337${blog.image.url}`
            : "https://via.placeholder.com/300";

          return (
            <div key={blog.id} className="border rounded-lg p-4 shadow-md">
              {/* Display Image */}
              {/* <img
                src={imageUrl}
                alt={blog.title}
                className="w-full h-48 object-cover rounded-md"
              /> */}
              <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
              <p className="text-gray-600">Category: {blog.category}</p>
              <p className="text-gray-500 text-sm">
                Published on: {new Date(blog.publishedAt).toLocaleDateString()}
              </p>
              <Link
                to={`/blog/${blog.id}`}
                className="text-blue-500 mt-2 block"
              >
                Read More →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
