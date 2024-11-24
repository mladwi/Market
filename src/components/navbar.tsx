import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";



const Navbar = () => {

  const [menuOpen, setMenuOpen] = useState(false);

 




  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [menuOpen]);

  return (
    <nav className="navbar">
      <Link to={"/"}>
      <h1 className="navbar_title">Market</h1>
      </Link>
      <div className="nav-elements">
        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/" className="nav-links">Home</Link>
          </li>

          <li>
            <Link to={"/wishes"} className="Wishes">
              <MdFavoriteBorder />
            </Link>
          </li>
          <li>
            <Link to={"/cart"} className="Basket">
              <SlBasket />
            </Link>
          </li>
          {/* Close button */}
          {menuOpen && (
            <li className="Close">
              <AiOutlineClose onClick={toggleMenu} />
            </li>
          )}
        </ul>

        <div className="nav-menu" onClick={toggleMenu}>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
