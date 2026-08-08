import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Bell,
  FileCheck2,
  ClipboardList,
  Landmark,
  GraduationCap,
  HeartPulse,
  FileText,
  ArrowRight,
  Sparkles,
  Clock3,
  CheckCircle2,
  Menu,
  X,
} from "lucide-react";

import { motion } from "framer-motion";

import { getDashboardData } from "../api/dashboardApi";

function Dashboard() {
  const navigate = useNavigate();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // LOAD DASHBOARD DATA
  // ==========================================

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardData();

        console.log("Dashboard data received:", data);

        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard API error:", err);

        setError("Unable to connect to Saarthi server.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>

        <h2>Loading Bhartiya Saarthi...</h2>

        <p>Connecting to government services.</p>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="dashboard-loading">
        <h2>Something went wrong</h2>

        <p>{error}</p>

        <button onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  // ==========================================
  // SAFE BACKEND DATA
  // ==========================================

  const services = dashboardData?.services || [];

  const applications = dashboardData?.applications || [];

  const statistics = dashboardData?.statistics || {
    available_services: services.length,
    documents_ready: 0,
    applications: applications.length,
    completed: 0,
  };

  const documents = dashboardData?.documents || {
    readiness: 0,
    verified: 0,
    pending: 0,
    expired: 0,
  };

  // ==========================================
  // SERVICES
  // ==========================================

  const recommendedServices = services.map((service) => ({
    ...service,

    icon:
      service.category === "Education"
        ? GraduationCap
        : service.category === "Healthcare"
        ? HeartPulse
        : service.category === "Documents"
        ? FileText
        : Landmark,
  }));

  // ==========================================
  // APPLICATIONS
  // ==========================================

  const applicationList = applications.map((application) => ({
    ...application,

    type:
      application.status?.toLowerCase() === "completed" ||
      application.status?.toLowerCase() === "approved"
        ? "completed"
        : application.status?.toLowerCase() === "action required"
        ? "action"
        : "review",
  }));

  // ==========================================
  // SEARCH
  // ==========================================

  const filteredServices = recommendedServices.filter((service) =>
    `${service.title || ""} ${service.category || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="dashboard">
      {/* ======================================
          NAVBAR
      ====================================== */}

      <header className="dashboard-navbar">
        {/* BRAND */}

        <div className="dashboard-brand">
          <div className="brand-logo">BS</div>

          <div>
            <strong>Bhartiya Saarthi</strong>

            <span>Citizen Portal</span>
          </div>
        </div>

        {/* NAVIGATION */}

        <nav
          className={`dashboard-nav ${
            mobileMenu ? "show" : ""
          }`}
        >
          <a className="active" href="#dashboard">
            Dashboard
          </a>

          <a href="#services">Services</a>

          <a href="#applications">Applications</a>

          <a href="#documents">Documents</a>

          <button
            type="button"
            onClick={() => navigate("/saarthi-ai")}
          >
            Saarthi AI
          </button>
        </nav>

        {/* ACTIONS */}

        <div className="dashboard-actions">
          <button className="icon-button" type="button">
            <Bell size={19} />

            <span className="notification-dot"></span>
          </button>

          <button
            className="profile-button"
            type="button"
            onClick={() => navigate("/profile")}
          >
            <div className="profile-avatar">
              {dashboardData?.citizen?.name
                ?.charAt(0)
                ?.toUpperCase() || "C"}
            </div>

            <div className="profile-text">
              <strong>
                {dashboardData?.citizen?.name || "Citizen"}
              </strong>

              <span>My Account</span>
            </div>
          </button>
        </div>

        {/* MOBILE MENU */}

        <button
          className="dashboard-mobile-menu"
          type="button"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </header>

      {/* ======================================
          MAIN
      ====================================== */}

      <main className="dashboard-main" id="dashboard">
        {/* ====================================
            WELCOME
        ==================================== */}

        <motion.section
          className="dashboard-welcome"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <span className="dashboard-eyebrow">
              CITIZEN DASHBOARD
            </span>

            <h1>
              Good morning{" "}
              <span>
                {dashboardData?.citizen?.name || "Citizen"}.
              </span>{" "}
              👋
            </h1>

            <p>
              Your government services, documents and
              applications — all in one place.
            </p>
          </div>

          <div className="dashboard-date">
            <Clock3 size={16} />

            <span>8 August 2026</span>
          </div>
        </motion.section>

        {/* ====================================
            SEARCH
        ==================================== */}

        <motion.section
          className="dashboard-search"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.1,
          }}
        >
          <div className="dashboard-search-icon">
            <Search size={21} />
          </div>

          <input
            type="text"
            placeholder="What government service are you looking for?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="button"
            onClick={() => navigate("/eligibility")}
          >
            Check Eligibility

            <ArrowRight size={17} />
          </button>
        </motion.section>

        {/* ====================================
            STATISTICS
        ==================================== */}

        <section className="dashboard-stats">
          <StatCard
            icon={<Landmark size={21} />}
            title="Available Services"
            value={statistics.available_services}
            text="Explore services"
          />

          <StatCard
            icon={<FileCheck2 size={21} />}
            title="Documents Ready"
            value={statistics.documents_ready}
            text="View documents"
            warning
          />

          <StatCard
            icon={<ClipboardList size={21} />}
            title="Applications"
            value={statistics.applications}
            text="Track applications"
            warning
          />

          <StatCard
            icon={<CheckCircle2 size={21} />}
            title="Completed"
            value={statistics.completed}
            text="This year"
          />
        </section>

        {/* ====================================
            RECOMMENDED SERVICES
        ==================================== */}

        <section
          className="dashboard-section"
          id="services"
        >
          <SectionHeader
            label="PERSONALISED FOR YOU"
            title="Recommended Services"
            description="Services that may be relevant to your needs."
          />

          <div className="recommended-grid">
            {filteredServices.map((service, index) => {
              const Icon = service.icon || Landmark;

              return (
                <motion.div
                  className="recommended-card"
                  key={service.id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                >
                  <div className="recommended-icon">
                    <Icon size={22} />
                  </div>

                  <span>
                    {service.category || "Government"}
                  </span>

                  <h3>
                    {service.title || "Government Service"}
                  </h3>

                  <p>
                    {service.description ||
                      "Access this government service through Bhartiya Saarthi."}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/eligibility")
                    }
                  >
                    Check Eligibility

                    <ArrowRight size={15} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {filteredServices.length === 0 && (
            <div className="empty-search">
              No matching service found.

              <br />

              <button
                type="button"
                onClick={() =>
                  navigate("/eligibility")
                }
              >
                Check all eligibility results
              </button>
            </div>
          )}
        </section>

        {/* ====================================
            LOWER GRID
        ==================================== */}

        <section className="dashboard-lower-grid">
          {/* APPLICATIONS */}

          <div
            className="dashboard-panel"
            id="applications"
          >
            <SectionHeader
              label="TRACKING"
              title="Your Applications"
              description="Monitor your active applications."
            />

            <div className="application-list">
              {applicationList.length > 0 ? (
                applicationList.map((application) => (
                  <ApplicationRow
                    key={application.id}
                    application={application}
                    navigate={navigate}
                  />
                ))
              ) : (
                <div className="empty-search">
                  No applications yet.
                </div>
              )}
            </div>

            <button
              className="view-all-button"
              type="button"
              onClick={() => navigate("/applications")}
            >
              View all applications

              <ArrowRight size={16} />
            </button>
          </div>

          {/* ==================================
              SAARTHI AI CARD
          ================================== */}

          <motion.div
            className="saarthi-card"
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
          >
            <div className="saarthi-glow"></div>

            <div className="saarthi-icon">
              <Sparkles size={25} />
            </div>

            <span className="saarthi-label">
              AI ASSISTANT
            </span>

            <h2>
              Need help with a{" "}
              <span>government service?</span>
            </h2>

            <p>
              Ask Saarthi about eligibility, documents,
              application steps or available schemes.
            </p>

            <button
              className="saarthi-button"
              type="button"
              onClick={() =>
                navigate("/saarthi-ai")
              }
            >
              Ask Saarthi AI

              <ArrowRight size={17} />
            </button>

            <div className="saarthi-suggestions">
              <span>"Am I eligible?"</span>

              <span>
                "What documents do I need?"
              </span>
            </div>
          </motion.div>
        </section>

        {/* ====================================
            DOCUMENT READINESS
        ==================================== */}

        <section
          className="document-readiness"
          id="documents"
        >
          <div>
            <span className="dashboard-eyebrow">
              DOCUMENT READINESS
            </span>

            <h2>You're almost ready.</h2>

            <p>
              Your profile has most of the documents
              required for common government services.
            </p>
          </div>

          <div className="readiness-meter">
            <div className="meter-circle">
              <strong>
                {documents.readiness || 0}%
              </strong>

              <span>Ready</span>
            </div>

            <div className="meter-info">
              <div>
                <span>Verified</span>

                <strong>
                  {documents.verified || 0}
                </strong>
              </div>

              <div>
                <span>Pending</span>

                <strong>
                  {documents.pending || 0}
                </strong>
              </div>

              <div>
                <span>Expired</span>

                <strong>
                  {documents.expired || 0}
                </strong>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// ======================================================
// STAT CARD
// ======================================================

function StatCard({
  icon,
  title,
  value,
  text,
  warning = false,
}) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -3 }}
    >
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <span>{title}</span>

        <strong>{value}</strong>

        <small
          className={
            warning ? "warning-text" : ""
          }
        >
          {text}
        </small>
      </div>
    </motion.div>
  );
}

// ======================================================
// SECTION HEADER
// ======================================================

function SectionHeader({
  label,
  title,
  description,
}) {
  return (
    <div className="dashboard-section-header">
      <div>
        <span>{label}</span>

        <h2>{title}</h2>
      </div>

      <p>{description}</p>
    </div>
  );
}

// ======================================================
// APPLICATION ROW
// ======================================================

function ApplicationRow({
  application,
  navigate,
}) {
  let icon;
  let statusClass;

  if (application.type === "completed") {
    icon = <CheckCircle2 size={18} />;
    statusClass = "completed";
  } else if (application.type === "action") {
    icon = <FileText size={18} />;
    statusClass = "action";
  } else {
    icon = <Clock3 size={18} />;
    statusClass = "review";
  }

  return (
    <div className="application-row">
      {/* STATUS ICON */}

      <div
        className={`application-status-icon ${statusClass}`}
      >
        {icon}
      </div>

      {/* APPLICATION INFO */}

      <div className="application-info">
        <strong>
          {application.title ||
            application.service_title ||
            `Application #${application.id}`}
        </strong>

        <span>
          {application.department ||
            application.category ||
            `Service ID: ${application.service_id}`}
        </span>
      </div>

      {/* STATUS */}

      <div className="application-status">
        <span
          className={`status-badge ${statusClass}`}
        >
          {application.status || "Under Review"}
        </span>

        <small>
          {application.date ||
            "Recently submitted"}
        </small>
      </div>

      {/* OPEN APPLICATION */}

      <button
        className="application-arrow"
        type="button"
        onClick={() =>
          navigate(
            `/applications/${application.id}`
          )
        }
      >
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

export default Dashboard;