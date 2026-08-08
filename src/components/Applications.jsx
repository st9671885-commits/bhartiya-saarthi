import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileText,
  AlertCircle,
} from "lucide-react";

import { getApplications } from "../api/applicationApi";

function Applications() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ============================================================
  // LOAD APPLICATIONS
  // ============================================================

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getApplications();

      console.log("Applications received:", data);

      setApplications(data?.applications || []);
    } catch (err) {
      console.error("Applications error:", err);

      setError(
        err?.response?.data?.detail ||
          "Unable to load your applications."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // LOAD WHEN PAGE OPENS
  // ============================================================

  useEffect(() => {
    loadApplications();
  }, []);

  // ============================================================
  // STATUS ICON
  // ============================================================

  const getStatusIcon = (status) => {
    const value = (status || "").toLowerCase();

    if (
      value.includes("completed") ||
      value.includes("approved")
    ) {
      return <CheckCircle2 size={20} />;
    }

    if (
      value.includes("action") ||
      value.includes("required")
    ) {
      return <AlertCircle size={20} />;
    }

    return <Clock3 size={20} />;
  };

  // ============================================================
  // STATUS CLASS
  // ============================================================

  const getStatusClass = (status) => {
    const value = (status || "").toLowerCase();

    if (
      value.includes("completed") ||
      value.includes("approved")
    ) {
      return "completed";
    }

    if (
      value.includes("action") ||
      value.includes("required")
    ) {
      return "action";
    }

    return "review";
  };

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {
    return (
      <div className="application-page">
        <div className="application-message">
          <Clock3 size={42} />

          <h2>Loading applications...</h2>

          <p>
            Please wait while we retrieve your applications.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // ERROR SCREEN
  // ============================================================

  if (error) {
    return (
      <div className="application-page">
        <div className="application-message error">
          <AlertCircle size={42} />

          <h2>Unable to load applications</h2>

          <p>{error}</p>

          <button
            className="primary-button"
            onClick={loadApplications}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // STATISTICS
  // ============================================================

  const totalApplications = applications.length;

  const underReview = applications.filter((application) => {
    const status = (application.status || "").toLowerCase();

    return (
      status.includes("review") ||
      status.includes("pending")
    );
  }).length;

  const completed = applications.filter((application) => {
    const status = (application.status || "").toLowerCase();

    return (
      status.includes("completed") ||
      status.includes("approved")
    );
  }).length;

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="application-container">

      {/* ======================================================
          BACK BUTTON
      ====================================================== */}

      <button
        className="back-button"
        onClick={() => navigate("/dashboard")}
      >
        <ArrowLeft size={17} />
        Back to Dashboard
      </button>

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="application-header">
        <span className="dashboard-eyebrow">
          APPLICATION TRACKING
        </span>

        <h1>
          Your <span>Applications</span>
        </h1>

        <p>
          Track the status of your government service
          applications in one place.
        </p>
      </div>

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="application-summary">

        {/* TOTAL */}

        <div className="application-summary-card">
          <div className="application-summary-icon">
            <FileText size={21} />
          </div>

          <div>
            <span>Total Applications</span>

            <strong>{totalApplications}</strong>
          </div>
        </div>

        {/* UNDER REVIEW */}

        <div className="application-summary-card">
          <div className="application-summary-icon">
            <Clock3 size={21} />
          </div>

          <div>
            <span>Under Review</span>

            <strong>{underReview}</strong>
          </div>
        </div>

        {/* COMPLETED */}

        <div className="application-summary-card">
          <div className="application-summary-icon">
            <CheckCircle2 size={21} />
          </div>

          <div>
            <span>Completed</span>

            <strong>{completed}</strong>
          </div>
        </div>

      </div>

      {/* ======================================================
          APPLICATION SECTION
      ====================================================== */}

      <section className="applications-section">

        {/* SECTION HEADER */}

        <div className="applications-section-header">

          <div>
            <span className="dashboard-eyebrow">
              RECENT SUBMISSIONS
            </span>

            <h2>Application History</h2>
          </div>

          <button
            className="secondary-button"
            onClick={() => navigate("/eligibility")}
          >
            Apply for a Service

            <ArrowRight size={16} />
          </button>

        </div>

        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {applications.length === 0 ? (
          <div className="applications-empty">

            <div className="applications-empty-icon">
              <FileText size={30} />
            </div>

            <h3>No applications yet</h3>

            <p>
              You haven't submitted any government
              service applications.
            </p>

            <button
              className="primary-button"
              onClick={() => navigate("/eligibility")}
            >
              Explore Services

              <ArrowRight size={16} />
            </button>

          </div>
        ) : (

          /* ==================================================
             APPLICATION LIST
          ================================================== */

          <div className="applications-list">

            {applications.map((application) => {

              const statusClass = getStatusClass(
                application.status
              );

              const serviceTitle =
                application.service_title ||
                application.title ||
                "Government Service";

              const category =
                application.category ||
                application.department ||
                "Government Service";

              return (
                <div
                  className="application-tracking-card"
                  key={application.id}
                >

                  {/* ==================================================
                      APPLICATION ICON
                  ================================================== */}

                  <div
                    className={`tracking-icon ${statusClass}`}
                  >
                    {getStatusIcon(
                      application.status
                    )}
                  </div>

                  {/* ==================================================
                      APPLICATION DETAILS
                  ================================================== */}

                  <div className="tracking-details">

                    <span className="tracking-category">
                      {category}
                    </span>

                    <h3>{serviceTitle}</h3>

                    <p>
                      Application ID: #{application.id}
                    </p>

                    <small>
                      Submitted:{" "}
                      {application.date ||
                        "Recently submitted"}
                    </small>

                  </div>

                  {/* ==================================================
                      STATUS
                  ================================================== */}

                  <div className="tracking-status">

                    <span
                      className={`status-badge ${statusClass}`}
                    >
                      {application.status ||
                        "Under Review"}
                    </span>

                    <button
                      className="application-arrow"
                      onClick={() =>
                        navigate(
                          `/applications/${application.id}`
                        )
                      }
                      title="View application"
                    >
                      <ArrowRight size={18} />
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </section>

    </div>
  );
}

export default Applications;