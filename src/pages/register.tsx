import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from "../assets/images/loginPgae.png";
import toast from "react-hot-toast";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const API = "https://market777-1.onrender.com/api/auth/register";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(API, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);

      navigate("/");
      toast.success("Authenticated");
      window.location.reload();
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="login_box">
        <img src={loginimg} alt="Login" />
        <div className="login_inputs">
          <h2>Create an account</h2>
          <h3>Fill in the blanks</h3>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button className="login_btn" type="submit" disabled={loading}>
              {loading ? "Loading..." : "Create Account"}
            </button>
          </form>
          <Link className="login_a" to="/sign-in">
            Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
