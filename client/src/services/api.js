import axios from "axios";

// Base URL for Strapi API
const API_URL = "http://localhost:1337/api"; // Update if your Strapi is running on a different port

// Fetch all blogs
export const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs?populate=*`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
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
