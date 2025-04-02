import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  fetchBlogById,
  fetchLikes,
  postLike,
  fetchComments,
  postComment,
} from "../services/api"; // Import functions from api.js

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (!id) {
      console.error("Blog ID is undefined.");
      return;
    }

    // Fetch blog post data
    fetchBlogById(id)
      .then((res) => {
        setBlog(res);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    // Fetch likes count
    fetchLikes(id).then((count) => setLikes(count));

    // Fetch comments
    fetchComments(id).then((commentsData) => setComments(commentsData));
  }, [id]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-20 text-gray-500"
      >
        Loading...
      </motion.div>
    );
  }

  if (!blog) {
    return (
      <p className="text-center text-red-500 py-20">
        Blog not found. Please check the URL.
      </p>
    );
  }

  // Handle like functionality
  const handleLike = () => {
    postLike(id).then(() => setLikes(likes + 1));
  };

  // Handle new comment submission
  const handleCommentSubmit = () => {
    if (newComment.trim() === "") return;

    postComment(id, newComment).then(() => {
      setComments([...comments, { attributes: { text: newComment } }]); // Add new comment
      setNewComment(""); // Clear comment input field
    });
  };

  const { title, category, publishedAt, image, content } = blog;
  const imageUrl = image?.url
    ? `http://localhost:1337${image.url}`
    : "https://placehold.co/800x400";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto max-w-4xl p-6"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-64 object-cover rounded-lg shadow-lg"
      />
      <h1 className="text-4xl font-bold mt-6 text-gray-900">{title}</h1>
      <p className="text-gray-600 text-sm mt-2">{category}</p>
      <p className="text-gray-500 text-sm">
        Published on:{" "}
        {publishedAt
          ? new Date(publishedAt).toLocaleDateString("en-GB")
          : "Unknown"}
      </p>

      <div className="mt-6 text-lg text-gray-800 leading-relaxed text-justify">
        {content.length > 0 ? (
          content.map((item, index) => (
            <p key={index}>
              {item.children.map((child, childIndex) => (
                <span key={childIndex}>{child.text}</span>
              ))}
            </p>
          ))
        ) : (
          <p>No content available.</p>
        )}
      </div>

      <div className="mt-6">
        <button
          onClick={handleLike}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          👍 Like ({likes})
        </button>

        <div className="mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            className="w-full p-2 border rounded-md"
          ></textarea>
          <button
            onClick={handleCommentSubmit}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-green-600"
          >
            Post Comment
          </button>
        </div>

        <div className="mt-6">
          <h3 className="text-xl font-semibold">
            Comments ({comments.length})
          </h3>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="mt-2 p-2 border rounded-md bg-gray-100"
              >
                <p>{comment.attributes.text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPage;
