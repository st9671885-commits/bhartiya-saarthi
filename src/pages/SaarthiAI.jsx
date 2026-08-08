import { useState } from "react";

function SaarthiAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askSaarthi = async () => {
    if (!question.trim()) {
      setError("Please enter a question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/ai/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
            question: question.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        throw new Error(
          data.detail || "Unable to connect to Saarthi AI."
        );
      }

      setAnswer(data.answer || "No answer received.");
    } catch (err) {
      console.error("Saarthi AI Error:", err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askSaarthi();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "25px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
              color: "#1f2937",
            }}
          >
            🇮🇳 Saarthi AI
          </h1>

          <p
            style={{
              marginTop: "10px",
              color: "#6b7280",
              fontSize: "16px",
            }}
          >
            Your AI-powered government service assistant
          </p>
        </div>

        {/* CHAT BOX */}
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <label
            style={{
              display: "block",
              marginBottom: "10px",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Ask Saarthi
          </label>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about government schemes, documents, eligibility, applications..."
            rows={5}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "15px",
              borderRadius: "12px",
              border: "1px solid #d1d5db",
              resize: "vertical",
              fontSize: "16px",
              outline: "none",
            }}
          />

          <button
            onClick={askSaarthi}
            disabled={loading}
            style={{
              marginTop: "15px",
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "12px",
              background: loading ? "#9ca3af" : "#2563eb",
              color: "white",
              fontSize: "16px",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "🤖 Saarthi is thinking..." : "Ask Saarthi AI"}
          </button>

          {/* ERROR */}
          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#fee2e2",
                color: "#b91c1c",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* ANSWER */}
          {answer && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "15px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
              }}
            >
              <h3
                style={{
                  marginTop: 0,
                  color: "#1d4ed8",
                }}
              >
                🤖 Saarthi's Answer
              </h3>

              <p
                style={{
                  marginBottom: 0,
                  color: "#374151",
                  lineHeight: "1.7",
                  whiteSpace: "pre-wrap",
                }}
              >
                {answer}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaarthiAI;