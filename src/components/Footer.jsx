import React from "react";

const Footer = () => {
  return (
    <footer class="bg-white text-dark py-4 px-6 flex justify-between items-center">
      <p>© 2024 Boombo e-commerce</p>
      <ul class="flex space-x-4">
        <li>
          <a href="#" class="text-dark hover:underline">
            About Us
          </a>
        </li>
        <li>
          <a href="#" class="text-dark hover:underline">
            Contact
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
