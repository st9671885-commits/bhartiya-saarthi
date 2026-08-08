import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ApplicationDetails() {
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const token = localStorage.getItem("saarthi_token");

        if (!token) {
          setError("Please login again.");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `/api/applications/${applicationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplication(response.data.application);
      } catch (err) {
        console.error(err);

        if (err.response) {
          setError(
            err.response.data?.detail ||
              "Unable to load application."
          );
        } else {
          setError(
            "Unable to connect to the backend."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [applicationId]);

  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Loading application...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Unable to load application</h2>

        <p>{error}</p>

        <button
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </button>
      </div>
    );
  }

  if (!application) {
    return (
      <div style={{ padding: "40px" }}>
        <h2>Application not found</h2>

        <button
          onClick={() => navigate("/applications")}
        >
          Back to Applications
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>

      <button
        onClick={() => navigate("/applications")}
        style={{
          marginBottom: "30px",
          padding: "10px 16px",
          cursor: "pointer",
        }}
      >
        ← Back to Applications
      </button>

      <h1>Application Details</h1>

      <div
        style={{
          marginTop: "25px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >

        <h2>
          {application.service_title ||
            application.title ||
            "Government Service"}
        </h2>

        <p>
          <strong>Application ID:</strong>{" "}
          #{application.id}
        </p>

        <p>
          <strong>Service ID:</strong>{" "}
          #{application.service_id}
        </p>

        <p>
          <strong>Category:</strong>{" "}
          {application.category ||
            application.department ||
            "Government"}
        </p>

        <p>
          <strong>Status:</strong>{" "}
          {application.status ||
            "Under Review"}
        </p>

        <p>
          <strong>Submitted:</strong>{" "}
          {application.date ||
            "Recently submitted"}
        </p>

      </div>

      <div
        style={{
          marginTop: "25px",
          padding: "25px",
          border: "1px solid #ddd",
          borderRadius: "12px",
        }}
      >
        <h2>Application Progress</h2>

        <p>✓ Application Submitted</p>

        <p>
          {application.status === "Completed" ||
          application.status === "Approved"
            ? "✓ Application Completed"
            : "◷ Application Under Review"}
        </p>

        <p>
          {application.status === "Completed" ||
          application.status === "Approved"
            ? "✓ Final Decision"
            : "○ Final Decision Pending"}
        </p>
      </div>

    </div>
  );
}

export default ApplicationDetails;