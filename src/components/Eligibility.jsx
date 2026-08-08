import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  GraduationCap,
  BriefcaseBusiness,
  HeartPulse,
  Tractor,
  Users,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

// ============================================================
// ICON HELPER
// ============================================================

function getSchemeIcon(category) {
  switch (category) {
    case "Education":
      return GraduationCap;

    case "Employment":
      return BriefcaseBusiness;

    case "Healthcare":
      return HeartPulse;

    case "Agriculture":
      return Tractor;

    case "Social Welfare":
      return Users;

    default:
      return ShieldCheck;
  }
}

// ============================================================
// ELIGIBILITY COMPONENT
// ============================================================

function Eligibility() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [citizen, setCitizen] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================================
  // LOAD ELIGIBILITY DATA
  // ==========================================================

  const loadEligibility = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("saarthi_token");

      if (!token) {
        setError(
          "Your session has expired. Please login again."
        );

        setLoading(false);
        return;
      }

      const response = await axios.get(
        "/api/eligibility",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      console.log(
        "Eligibility data received:",
        data
      );

      setCitizen(data.citizen || null);
      setResults(data.results || []);

    } catch (err) {
      console.error(
        "Eligibility API error:",
        err
      );

      if (err.response) {
        if (err.response.status === 401) {
          setError(
            "Your session has expired. Please login again."
          );
        } else {
          setError(
            err.response.data?.detail ||
              "Unable to load eligibility information."
          );
        }
      } else if (err.request) {
        setError(
          "Unable to connect to Saarthi server. Please make sure the backend is running."
        );
      } else {
        setError(
          "Something went wrong. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // LOAD WHEN PAGE OPENS
  // ==========================================================

  useEffect(() => {
    loadEligibility();
  }, []);

  // ==========================================================
  // APPLY FOR SERVICE
  // ==========================================================

  const handleApply = (scheme) => {
    const service = {
      id: scheme.id,
      name: scheme.name,
      title: scheme.name,
      category: scheme.category,
      description: scheme.description,
    };

    navigate("/apply", {
      state: {
        service: service,
      },
    });
  };

  // ==========================================================
  // COMPLETE PROFILE
  // ==========================================================

  const handleCompleteProfile = () => {
    navigate("/profile");
  };

  // ==========================================================
  // LOADING SCREEN
  // ==========================================================

  if (loading) {
    return (
      <div className="eligibility-loading">
        <div className="eligibility-spinner">
          <RefreshCw
            size={28}
            className="spin"
          />
        </div>

        <h2>
          Checking your eligibility...
        </h2>

        <p>
          Saarthi is analysing available
          government schemes for you.
        </p>
      </div>
    );
  }

  // ==========================================================
  // ERROR SCREEN
  // ==========================================================

  if (error) {
    return (
      <div className="eligibility-error">
        <div className="error-icon">
          <AlertCircle size={30} />
        </div>

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

        <button
          className="eligibility-retry"
          onClick={loadEligibility}
        >
          <RefreshCw size={17} />
          Try Again
        </button>

        {error.includes("session") && (
          <button
            className="eligibility-retry"
            onClick={() => navigate("/login")}
            style={{ marginTop: "10px" }}
          >
            Login Again
          </button>
        )}
      </div>
    );
  }

  // ==========================================================
  // SUMMARY
  // ==========================================================

  const eligibleCount = results.filter(
    (scheme) =>
      scheme.eligible === true
  ).length;

  const informationRequiredCount =
    results.filter(
      (scheme) =>
        scheme.status ===
        "information_required"
    ).length;

  const notEligibleCount =
    results.filter(
      (scheme) =>
        scheme.eligible === false &&
        scheme.status !==
          "information_required"
    ).length;

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="eligibility-page">

      {/* ====================================================
          HEADER
      ==================================================== */}

      <header className="eligibility-header">
        <div className="eligibility-header-inner">

          <div className="eligibility-brand">

            <div className="eligibility-logo">
              BS
            </div>

            <div>
              <strong>
                Bhartiya Saarthi
              </strong>

              <span>
                Eligibility Centre
              </span>
            </div>

          </div>

          <button
            className="eligibility-refresh"
            onClick={loadEligibility}
          >
            <RefreshCw size={17} />
            Refresh
          </button>

        </div>
      </header>

      {/* ====================================================
          MAIN
      ==================================================== */}

      <main className="eligibility-main">

        {/* ==================================================
            WELCOME
        ================================================== */}

        <section className="eligibility-welcome">

          <div>

            <span className="eligibility-eyebrow">
              GOVERNMENT SCHEME ELIGIBILITY
            </span>

            <h1>
              Find schemes you're
              <span> eligible for.</span>
            </h1>

            <p>
              Saarthi checks your available
              information against government
              scheme requirements and shows
              your eligibility.
            </p>

          </div>

          <div className="eligibility-ai-badge">

            <Sparkles size={19} />

            <span>
              Saarthi Eligibility Engine
            </span>

          </div>

        </section>

        {/* ==================================================
            CITIZEN CARD
        ================================================== */}

        {citizen && (
          <section className="eligibility-citizen-card">

            <div className="citizen-avatar">
              {citizen.name
                ? citizen.name
                    .charAt(0)
                    .toUpperCase()
                : "C"}
            </div>

            <div className="citizen-details">

              <span>
                CHECKING FOR
              </span>

              <h3>
                {citizen.name}
              </h3>

              <p>
                Your personalised government
                scheme results
              </p>

            </div>

          </section>
        )}

        {/* ==================================================
            SUMMARY
        ================================================== */}

        <section className="eligibility-summary">

          <div className="eligibility-summary-card eligible">

            <div className="summary-icon">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>
                Eligible
              </span>

              <strong>
                {eligibleCount}
              </strong>
            </div>

          </div>

          <div className="eligibility-summary-card pending">

            <div className="summary-icon">
              <AlertCircle size={21} />
            </div>

            <div>
              <span>
                Information Required
              </span>

              <strong>
                {informationRequiredCount}
              </strong>
            </div>

          </div>

          <div className="eligibility-summary-card not-eligible">

            <div className="summary-icon">
              <XCircle size={21} />
            </div>

            <div>
              <span>
                Not Eligible
              </span>

              <strong>
                {notEligibleCount}
              </strong>
            </div>

          </div>

        </section>

        {/* ==================================================
            RESULTS HEADER
        ================================================== */}

        <section className="eligibility-results-header">

          <div>

            <span>
              PERSONALISED RESULTS
            </span>

            <h2>
              Your Scheme Matches
            </h2>

          </div>

          <p>
            {results.length} government scheme
            {results.length !== 1
              ? "s"
              : ""}{" "}
            checked
          </p>

        </section>

        {/* ==================================================
            NO RESULTS
        ================================================== */}

        {results.length === 0 && (
          <div className="eligibility-empty">

            <ShieldCheck size={35} />

            <h2>
              No schemes found
            </h2>

            <p>
              There are currently no eligibility
              results available.
            </p>

          </div>
        )}

        {/* ==================================================
            SCHEME CARDS
        ================================================== */}

        <section className="eligibility-grid">

          {results.map((scheme) => {

            const Icon =
              getSchemeIcon(
                scheme.category
              );

            const isEligible =
              scheme.eligible === true;

            const needsInformation =
              scheme.status ===
              "information_required";

            return (
              <article
                className={`scheme-card ${
                  isEligible
                    ? "scheme-eligible"
                    : needsInformation
                    ? "scheme-information"
                    : "scheme-not-eligible"
                }`}
                key={scheme.id}
              >

                {/* CARD TOP */}

                <div className="scheme-card-top">

                  <div className="scheme-icon">
                    <Icon size={23} />
                  </div>

                  <div className="scheme-score">

                    <strong>
                      {scheme.score ?? 0}%
                    </strong>

                    <span>
                      Match
                    </span>

                  </div>

                </div>

                {/* CATEGORY */}

                <span className="scheme-category">
                  {scheme.category}
                </span>

                {/* NAME */}

                <h3>
                  {scheme.name}
                </h3>

                {/* DESCRIPTION */}

                <p className="scheme-description">
                  {scheme.description}
                </p>

                {/* STATUS */}

                <div className="scheme-status">

                  {isEligible && (
                    <>
                      <CheckCircle2 size={17} />

                      <span>
                        You are eligible
                      </span>
                    </>
                  )}

                  {needsInformation && (
                    <>
                      <AlertCircle size={17} />

                      <span>
                        More information required
                      </span>
                    </>
                  )}

                  {!isEligible &&
                    !needsInformation && (
                      <>
                        <XCircle size={17} />

                        <span>
                          You are not eligible
                        </span>
                      </>
                    )}

                </div>

                {/* REASONS */}

                {scheme.reasons &&
                  scheme.reasons.length > 0 && (
                    <div className="scheme-reasons">

                      <strong>
                        Why?
                      </strong>

                      <ul>
                        {scheme.reasons.map(
                          (reason, index) => (
                            <li
                              key={index}
                            >
                              {reason}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                {/* MISSING INFORMATION */}

                {scheme.missing_information &&
                  scheme.missing_information.length >
                    0 && (
                    <div className="scheme-missing">

                      <strong>
                        Information needed
                      </strong>

                      <ul>
                        {scheme.missing_information.map(
                          (
                            information,
                            index
                          ) => (
                            <li
                              key={index}
                            >
                              {information}
                            </li>
                          )
                        )}
                      </ul>

                    </div>
                  )}

                {/* ACTION */}

                <div className="scheme-card-footer">

                  {isEligible ? (
                    <button
                      className="scheme-action eligible-action"
                      onClick={() =>
                        handleApply(
                          scheme
                        )
                      }
                    >
                      Apply for Service

                      <ArrowRight
                        size={16}
                      />
                    </button>
                  ) : needsInformation ? (
                    <button
                      className="scheme-action information-action"
                      onClick={
                        handleCompleteProfile
                      }
                    >
                      Complete Profile

                      <ArrowRight
                        size={16}
                      />
                    </button>
                  ) : (
                    <div className="scheme-unavailable">

                      <XCircle
                        size={15}
                      />

                      Currently unavailable

                    </div>
                  )}

                </div>

              </article>
            );
          })}

        </section>

        {/* ==================================================
            FOOTER INFORMATION
        ================================================== */}

        <section className="eligibility-info">

          <ShieldCheck size={22} />

          <div>

            <strong>
              How Saarthi calculates eligibility
            </strong>

            <p>
              Your available profile information
              is compared with the requirements
              defined for each government scheme.
              Results may change when you update
              your profile.
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Eligibility;