import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get("http://localhost:1337/blogs"); // Fetch blogs
      setBlogs(response.data);
    };

    fetchBlogs();
  }, []);

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:1337/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id)); // Remove deleted blog from state
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  if (!user || user.role !== "admin") {
    return <div>You are not authorized to view this page.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      <h2 className="text-xl font-semibold mt-6">Manage Blogs</h2>
      <div className="mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 mb-4 rounded-lg">
            <h3 className="font-semibold">{blog.title}</h3>
            <button
              onClick={() => handleDeleteBlog(blog.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Blog
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
