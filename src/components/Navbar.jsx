import { motion } from "framer-motion";
import {
  Menu,
  X,
  Globe2,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/image.png";

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* ================================
            BRAND / LOGO
        ================================= */}

        <motion.div
          className="brand"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            navigate("/");
            closeMobileMenu();
          }}
          style={{ cursor: "pointer" }}
        >
          <img
            src={logo}
            alt="Bhartiya Saarthi Logo"
            className="brand-logo-image"
          />

          <div className="brand-text">
            <h2>Bhartiya Saarthi</h2>
            <span>Digital Government Companion</span>
          </div>
        </motion.div>

        {/* ================================
            NAVIGATION LINKS
        ================================= */}

        <div
          className={`nav-links ${
            mobileOpen ? "open" : ""
          }`}
        >
          <a
            href="#home"
            onClick={closeMobileMenu}
          >
            Home
          </a>

          <a
            href="#services"
            onClick={closeMobileMenu}
          >
            Services
          </a>

          <a
            href="#how-it-works"
            onClick={closeMobileMenu}
          >
            How It Works
          </a>

          <a
            href="#about"
            onClick={closeMobileMenu}
          >
            About
          </a>
        </div>

        {/* ================================
            RIGHT SIDE ACTIONS
        ================================= */}

        <div className="nav-actions">

          {/* LANGUAGE */}

          <button
            type="button"
            className="language-btn"
          >
            <Globe2 size={17} />

            <span>EN</span>

            <ChevronDown size={14} />
          </button>

          {/* SIGN IN */}

          <button
            type="button"
            className="login-btn"
            onClick={() => {
              navigate("/login");
              closeMobileMenu();
            }}
          >
            <ShieldCheck size={17} />

            <span>Sign In</span>
          </button>

        </div>

        {/* ================================
            MOBILE MENU BUTTON
        ================================= */}

        <button
          type="button"
          className="mobile-menu"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>
    </nav>
  );
}

export default Navbar;
