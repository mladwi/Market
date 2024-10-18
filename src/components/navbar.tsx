import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.jpg";
import Wishes from "../assets/images/wishes";
import Cart from "../assets/images/cart";
import axios from "axios";

let API = "https://market777-1.onrender.com/api/auth/protected";

const Navbar = () => {
  const [userName, setUserName] = useState<string | null>(null);

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

  return (
    <div>
      <nav className="navbar">
        <Link to={"/"}>
          <img src={Logo} alt="logo" />
        </Link>
        <div className="nav-elements">
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            {userName ? (
              <>
                <li>
                  <span>{userName}</span>
                </li>
                <li>
                  <a onClick={handleLogout} style={{ cursor: "pointer" }}>
                    Logout
                  </a>{" "}
                </li>
              </>
            ) : (
              <li>
                <Link to="/sign-in">Sign in</Link>
              </li>
            )}
          </ul>
          <div className="nav-links-second">
            <ul className="nav-user">
              <li>
                <Link to="/wishes">
                  <Wishes />
                </Link>
              </li>
              <li>
                <Link to="/cart">
                  <Cart />
                </Link>
              </li>
            </ul>
          </div>
          <div className="nav-menu">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
