// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import BlogPage from "./pages/BlogPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login"; // Updated import to match the new filename
import SignupPage from "./pages/SignupPage"; // Keep SignupPage as is
import { PrivateRoute } from "./components/PrivateRoute"; // Assuming you have PrivateRoute for protected routes

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<BlogPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        {/* <PrivateRoute path="/admin" component={AdminDashboard} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
