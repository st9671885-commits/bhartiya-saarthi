import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  Send,
  Loader2,
} from "lucide-react";

import { submitApplication } from "../api/applicationApi";


function ApplicationForm() {

  const navigate = useNavigate();

  const location = useLocation();

  const service =
    location.state?.service || null;


  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(null);

  const [error, setError] =
    useState("");


  // ==========================================
  // NO SERVICE
  // ==========================================

  if (!service) {

    return (

      <div className="application-page">

        <div className="application-card">

          <FileText size={40} />

          <h2>
            Service not selected
          </h2>

          <p>
            Please select a government service
            before applying.
          </p>

          <button
            onClick={() =>
              navigate("/eligibility")
            }
          >
            Go to Eligibility
          </button>

        </div>

      </div>

    );
  }


  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    try {

      setLoading(true);

      setError("");

      const data =
        await submitApplication(
          service.id
        );

      console.log(
        "Application submitted:",
        data
      );

      setSuccess(
        data.application
      );

    } catch (err) {

      console.error(
        "Application error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to submit application."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // SUCCESS
  // ==========================================

  if (success) {

    return (

      <div className="application-page">

        <div className="application-card success-card">

          <div className="success-icon">

            <CheckCircle2
              size={48}
            />

          </div>


          <span className="dashboard-eyebrow">
            APPLICATION SUBMITTED
          </span>


          <h1>
            You're all set!
          </h1>


          <p>
            Your application for{" "}
            <strong>
              {service.name ||
                service.title}
            </strong>{" "}
            has been submitted successfully.
          </p>


          <div className="application-confirmation">

            <div>

              <span>
                Application ID
              </span>

              <strong>
                #{success.id}
              </strong>

            </div>


            <div>

              <span>
                Status
              </span>

              <strong>
                {success.status}
              </strong>

            </div>


            <div>

              <span>
                Submitted
              </span>

              <strong>
                {success.date}
              </strong>

            </div>

          </div>


          <div className="application-actions">

            <button
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Back to Dashboard
            </button>


            <button
              className="secondary-button"
              onClick={() =>
                navigate("/applications")
              }
            >
              Track Applications
            </button>

          </div>

        </div>

      </div>

    );
  }


  // ==========================================
  // FORM
  // ==========================================

  return (

    <div className="application-page">

      <div className="application-container">


        {/* BACK */}

        <button
          className="back-button"
          onClick={() =>
            navigate("/eligibility")
          }
        >

          <ArrowLeft size={17} />

          Back to eligibility

        </button>


        {/* HEADER */}

        <div className="application-header">

          <span className="dashboard-eyebrow">
            GOVERNMENT SERVICE APPLICATION
          </span>

          <h1>
            Apply for{" "}
            <span>
              {service.name ||
                service.title}
            </span>
          </h1>

          <p>
            Review your service information
            and submit your application.
          </p>

        </div>


        {/* SERVICE CARD */}

        <div className="application-service-card">

          <div className="application-service-icon">

            <FileText size={24} />

          </div>


          <div>

            <span>
              {service.category}
            </span>

            <h2>
              {service.name ||
                service.title}
            </h2>

            <p>
              {service.description}
            </p>

          </div>

        </div>


        {/* FORM */}

        <form
          className="application-form"
          onSubmit={handleSubmit}
        >

          <div className="application-info-box">

            <strong>
              Before you submit
            </strong>

            <p>
              Make sure your citizen profile
              information is accurate. Required
              documents may be requested during
              application processing.
            </p>

          </div>


          {error && (

            <div className="application-error">

              {error}

            </div>

          )}


          <button
            type="submit"
            className="application-submit"
            disabled={loading}
          >

            {loading ? (

              <>
                <Loader2
                  size={18}
                  className="spin"
                />

                Submitting...

              </>

            ) : (

              <>
                Submit Application

                <Send size={17} />

              </>

            )}

          </button>

        </form>

      </div>

    </div>

  );
}


export default ApplicationForm;