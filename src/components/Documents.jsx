import { useEffect, useState } from "react";

import {
  Upload,
  FileText,
  CheckCircle2,
  Clock3,
  AlertCircle,
  RefreshCw,
} from "lucide-react";

import {
  getDocuments,
  uploadDocument,
} from "../api/dashboardApi";

function Documents() {
  const [documents, setDocuments] = useState([]);

  const [summary, setSummary] = useState({
    total: 0,
    verified: 0,
    pending: 0,
    expired: 0,
    readiness: 0,
  });

  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ============================================================
  // LOAD DOCUMENTS
  // ============================================================

  const loadDocuments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getDocuments();

      console.log("Documents response:", response);

      /*
        dashboardApi.js may return either:
        response.data
        OR
        the data directly.

        This handles both safely.
      */

      const data = response?.data || response;

      setDocuments(data?.documents || []);

      setSummary(
        data?.summary || {
          total: 0,
          verified: 0,
          pending: 0,
          expired: 0,
          readiness: 0,
        }
      );
    } catch (err) {
      console.error("Documents loading error:", err);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to load documents."
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    loadDocuments();
  }, []);

  // ============================================================
  // UPLOAD DOCUMENT
  // ============================================================

  const handleUpload = async (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setError("");

    // ----------------------------------------------------------
    // FILE TYPE VALIDATION
    // ----------------------------------------------------------

    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError(
        "Only PDF, JPG and PNG files are allowed."
      );

      event.target.value = "";
      return;
    }

    // ----------------------------------------------------------
    // FILE SIZE VALIDATION
    // ----------------------------------------------------------

    if (file.size > 5 * 1024 * 1024) {
      setError(
        "File size must be less than 5 MB."
      );

      event.target.value = "";
      return;
    }

    // ----------------------------------------------------------
    // UPLOAD
    // ----------------------------------------------------------

    try {
      setUploading(true);

      const response = await uploadDocument(file);

      console.log("Upload response:", response);

      const data = response?.data || response;

      setMessage(
        data?.message ||
          "Document uploaded successfully."
      );

      // Reload documents after upload
      await loadDocuments();
    } catch (err) {
      console.error("Document upload error:", err);

      setError(
        err?.response?.data?.detail ||
          err?.message ||
          "Unable to upload document."
      );
    } finally {
      setUploading(false);

      // Reset file input
      event.target.value = "";
    }
  };

  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {
    return (
      <div className="documents-page">
        <div className="documents-loading">
          <RefreshCw
            size={32}
            className="documents-loading-icon"
          />

          <h2>
            Loading Documents...
          </h2>

          <p>
            Fetching your government documents.
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div className="documents-page">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="documents-header">

        <div>
          <span className="documents-eyebrow">
            DOCUMENT CENTRE
          </span>

          <h1>
            Your Documents
          </h1>

          <p>
            Upload and manage documents required
            for government services.
          </p>
        </div>

        {/* UPLOAD BUTTON */}

        <label
          className={`document-upload-button ${
            uploading ? "uploading" : ""
          }`}
        >
          <Upload size={18} />

          {uploading
            ? "Uploading..."
            : "Upload Document"}

          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleUpload}
            disabled={uploading}
            hidden
          />
        </label>

      </div>

      {/* ======================================================
          SUCCESS MESSAGE
      ====================================================== */}

      {message && (
        <div className="document-success-message">

          <CheckCircle2 size={18} />

          <span>
            {message}
          </span>

        </div>
      )}

      {/* ======================================================
          ERROR MESSAGE
      ====================================================== */}

      {error && (
        <div className="document-error-message">

          <AlertCircle size={18} />

          <span>
            {error}
          </span>

        </div>
      )}

      {/* ======================================================
          SUMMARY
      ====================================================== */}

      <div className="document-summary-grid">

        <SummaryCard
          title="Total Documents"
          value={summary.total}
          icon={<FileText size={21} />}
        />

        <SummaryCard
          title="Verified"
          value={summary.verified}
          icon={<CheckCircle2 size={21} />}
        />

        <SummaryCard
          title="Pending"
          value={summary.pending}
          icon={<Clock3 size={21} />}
        />

        <SummaryCard
          title="Expired"
          value={summary.expired}
          icon={<AlertCircle size={21} />}
        />

      </div>

      {/* ======================================================
          DOCUMENT READINESS
      ====================================================== */}

      <div className="document-readiness-card">

        <div className="document-readiness-content">

          <span>
            DOCUMENT READINESS
          </span>

          <h2>
            {summary.readiness || 0}% Ready
          </h2>

          <p>
            Keep your documents verified to make
            government applications easier.
          </p>

        </div>

        <div className="document-progress">

          <div
            className="document-progress-fill"
            style={{
              width: `${summary.readiness || 0}%`,
            }}
          />

        </div>

      </div>

      {/* ======================================================
          DOCUMENT LIST
      ====================================================== */}

      <div className="document-list-section">

        <div className="document-list-header">

          <div>

            <span>
              YOUR DOCUMENTS
            </span>

            <h2>
              Uploaded Documents
            </h2>

          </div>

          <button
            className="document-refresh-button"
            onClick={loadDocuments}
            disabled={loading}
          >
            <RefreshCw size={16} />

            Refresh
          </button>

        </div>

        {/* ====================================================
            EMPTY STATE
        ==================================================== */}

        {documents.length === 0 ? (

          <div className="documents-empty">

            <FileText size={42} />

            <h3>
              No documents uploaded yet
            </h3>

            <p>
              Upload your first document to get started.
            </p>

          </div>

        ) : (

          /* ==================================================
             DOCUMENT LIST
          ================================================== */

          <div className="document-list">

            {documents.map((document) => (
              <DocumentRow
                key={document.id}
                document={document}
              />
            ))}

          </div>

        )}

      </div>

    </div>
  );
}

// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="document-summary-card">

      <div className="document-summary-icon">
        {icon}
      </div>

      <div className="document-summary-content">

        <span>
          {title}
        </span>

        <strong>
          {value}
        </strong>

      </div>

    </div>
  );
}

// ============================================================
// DOCUMENT ROW
// ============================================================

function DocumentRow({
  document,
}) {
  const status =
    document?.status?.toLowerCase() || "pending";

  let StatusIcon = Clock3;

  if (
    status === "verified" ||
    status === "approved" ||
    status === "ready"
  ) {
    StatusIcon = CheckCircle2;
  }

  if (status === "expired") {
    StatusIcon = AlertCircle;
  }

  return (
    <div className="document-row">

      {/* FILE ICON */}

      <div className="document-file-icon">
        <FileText size={22} />
      </div>

      {/* DOCUMENT INFORMATION */}

      <div className="document-file-info">

        <strong>
          {document?.name ||
            "Unnamed Document"}
        </strong>

        <span>
          Document ID: #
          {document?.id || "N/A"}
        </span>

      </div>

      {/* STATUS */}

      <div
        className={`document-status ${status}`}
      >

        <StatusIcon size={16} />

        <span>
          {document?.status ||
            "Pending"}
        </span>

      </div>

    </div>
  );
}

export default Documents;