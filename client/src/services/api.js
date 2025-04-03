import axios from "axios";

// Base URL for Strapi API
const API_URL = process.env.REACT_APP_API_URL;
// || "http://localhost:1337/api"; // Update if your Strapi is running on a different port

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs?populate=*`);
    console.log("Fetched data:", response.data.data); // Debugging
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return [];
  }
};

// Fetch a single blog post by ID
export const fetchBlogById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/blogs/${id}?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
};

// User login
export const loginUser = async (identifier, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

// User registration
export const registerUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/local/register`, {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

// Fetch likes for a specific blog post
export const fetchLikes = async (blogId) => {
  try {
    const response = await axios.get(
      `${API_URL}/likes?filters[blog][$eq]=${blogId}`
    );
    return response.data.meta.pagination.total;
  } catch (error) {
    console.error("Error fetching likes:", error);
    return 0;
  }
};

// Post a new like for a specific blog post
export const postLike = async (blogId) => {
  try {
    await axios.post(`${API_URL}/likes`, {
      data: {
        blog: blogId,
      },
    });
  } catch (error) {
    console.error("Error posting like:", error);
  }
};

// Fetch comments for a specific blog post
export const fetchComments = async (blogId) => {
  try {
    const response = await axios.get(
      `${API_URL}/comments?filters[blog][$eq]=${blogId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
};

// Post a new comment for a specific blog post
export const postComment = async (blogId, text) => {
  try {
    await axios.post(`${API_URL}/comments`, {
      data: {
        blog: blogId,
        text: text,
      },
    });
  } catch (error) {
    console.error("Error posting comment:", error);
  }
};
