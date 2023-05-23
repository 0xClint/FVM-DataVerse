import React from "react";
import { Logo, Logo2 } from "../assets";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

const Header = () => {
  const handleScrollDown = () => {
    window.scrollBy({
      top: 600,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex w-screen justify-around h-20">
      <div className="flex  justify-center items-center w-32 ">
        <Link to="/">
          <Logo2 className="h-16" />
        </Link>
      </div>
      <ul
        className="flex  justify-center items-center gap-20"
        style={{ font: "CircularStd" }}
      >
        <Link to="/start-a-petition">
          <li className="cursor-pointer hover:text-[#878181]">
            Start a Petition
          </li>
        </Link>
        <Link to="/profile">
          <li className="cursor-pointer hover:text-[#878181]">My Petitions</li>
        </Link>

        <li
          className="cursor-pointer hover:text-[#878181]"
          onClick={() => handleScrollDown()}
        >
          Browse
        </li>
      </ul>
      <div className="flex  justify-center items-center  w-40">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;
