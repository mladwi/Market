import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../assets/images/loginPgae.png";
import toast from "react-hot-toast";

interface LoginFormData {
  email: string;
  password: string;
}

const API = "https://market777-1.onrender.com/api/auth/login";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(API, {
        email: formData.email,
        password: formData.password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
      toast.success("Authenticated");
      window.location.reload();
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login_box">
        <img src={loginimg} alt="Login" />
        <div className="login_inputs">
          <h2>Login</h2>
          <h3>Enter your Account</h3>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button className="login_btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          <Link className="login_a" to="/sign-up">
            Don’t have an account? Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
