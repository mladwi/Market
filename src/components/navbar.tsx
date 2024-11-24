import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { MdFavoriteBorder } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import { AiOutlineClose } from "react-icons/ai";

let API = "https://market777-1.onrender.com/api/auth/protected";

const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get(API, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserName(response.data.user.name);
        } catch (error) {
          console.error("Ошибка при получении данных пользователя:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserName(null);
    window.location.reload();
  };

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

          {userName ? (
            <>
              <li>
                <span>{userName}</span>
              </li>
              <li>
                <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                  Logout
                </a>
              </li>
            </>
          ) : (
            <li>
              
            </li>
          )}
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
