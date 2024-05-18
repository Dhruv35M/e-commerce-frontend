import React from "react";
import logo from "/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"} className="inline-block hover:cursor-pointer">
      <img src={logo} width={80} height={100} />
    </Link>
  );
};

export default Logo;
