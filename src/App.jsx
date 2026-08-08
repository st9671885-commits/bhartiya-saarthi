import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing page components
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";

// Main pages
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Eligibility from "./components/Eligibility";
import ApplicationForm from "./components/ApplicationForm";
import Applications from "./components/Applications";
import Documents from "./components/Documents";

// AI page
import SaarthiAI from "./pages/SaarthiAI";


// ============================================================
// LANDING PAGE
// ============================================================

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <HowItWorks />
      <Footer />
    </>
  );
}


// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            HOME
        ================================================== */}

        <Route
          path="/"
          element={<LandingPage />}
        />


        {/* ==================================================
            AUTHENTICATION
        ================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ==================================================
            DASHBOARD
        ================================================== */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />


        {/* ==================================================
            PROFILE
        ================================================== */}

        <Route
          path="/profile"
          element={<Profile />}
        />


        {/* ==================================================
            ELIGIBILITY
        ================================================== */}

        <Route
          path="/eligibility"
          element={<Eligibility />}
        />


        {/* ==================================================
            APPLICATION FORM
        ================================================== */}

        <Route
          path="/apply"
          element={<ApplicationForm />}
        />


        {/* ==================================================
            APPLICATION HISTORY
        ================================================== */}

        <Route
          path="/applications"
          element={<Applications />}
        />


        {/* ==================================================
            DOCUMENT CENTRE
        ================================================== */}

        <Route
          path="/documents"
          element={<Documents />}
        />


        {/* ==================================================
            SAARTHI AI
        ================================================== */}

        <Route
          path="/ai"
          element={<SaarthiAI />}
        />

        {/* Keep this route too so existing links still work */}
        <Route
          path="/saarthi-ai"
          element={<SaarthiAI />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;