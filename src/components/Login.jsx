import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      // Vite proxy forwards /api to FastAPI
      const response = await axios.post(
        "/api/auth/login",
        {
          email: email.trim(),
          password: password,
        }
      );

      const data = response.data;

      console.log("Login successful:", data);

      // Store authentication token
      localStorage.setItem(
        "saarthi_token",
        data.access_token
      );

      // Store logged-in citizen information
      localStorage.setItem(
        "saarthi_citizen",
        JSON.stringify(data.citizen)
      );

      // Go to dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // FastAPI returned an error
        setError(
          error.response.data?.detail ||
          "Login failed. Please check your email and password."
        );

      } else if (error.request) {
        // Request was sent but backend didn't respond
        setError(
          "Unable to connect to Saarthi server. Please make sure the backend is running."
        );

      } else {
        // Something went wrong before request was sent
        setError(
          "Something went wrong. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        {/* Logo */}
        <div className="auth-logo">
          BS
        </div>

        {/* Heading */}
        <div className="auth-heading">

          <span>
            CITIZEN PORTAL
          </span>

          <h1>
            Welcome back.
          </h1>

          <p>
            Sign in to continue your government journey.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          {/* Email */}
          <label>
            Email Address
          </label>

          <div className="auth-input">

            <Mail size={17} />

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
              required
            />

          </div>

          {/* Password */}
          <label>
            Password
          </label>

          <div className="auth-input">

            <LockKeyhole size={17} />

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >

            {loading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight size={17} />
              </>
            )}

          </button>

        </form>

        {/* Security message */}
        <div className="auth-security">

          <ShieldCheck size={16} />

          <span>
            Your information is securely protected.
          </span>

        </div>

      </div>

    </div>
  );
}

export default Login;