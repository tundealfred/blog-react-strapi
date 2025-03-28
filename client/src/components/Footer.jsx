// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center mt-6">
      &copy; {new Date().getFullYear()} My Blog. All rights reserved.
    </footer>
  );
};

export default Footer;
