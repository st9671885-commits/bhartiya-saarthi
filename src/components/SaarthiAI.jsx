import { useState } from "react";

function SaarthiAI() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! I am Saarthi AI 🤖. How can I help you with government services today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const askSaarthi = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion || loading) {
      return;
    }

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        text: trimmedQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

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
            question: trimmedQuestion,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to contact Saarthi AI."
        );
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            data.answer ||
            "Sorry, I could not generate an answer.",
        },
      ]);
    } catch (error) {
      console.error("Saarthi AI error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "Sorry, I could not connect to Saarthi AI. Please make sure the backend is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      askSaarthi();
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            background: "#173b72",
            color: "#ffffff",
            padding: "25px",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
            }}
          >
            🤖 Saarthi AI
          </h1>

          <p
            style={{
              margin: "8px 0 0",
            }}
          >
            Your Government Service Assistant
          </p>
        </div>

        <div
          style={{
            height: "500px",
            overflowY: "auto",
            padding: "25px",
            boxSizing: "border-box",
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  message.role === "user"
                    ? "flex-end"
                    : "flex-start",
                marginBottom: "18px",
              }}
            >
              <div
                style={{
                  maxWidth: "75%",
                  padding: "14px 17px",
                  borderRadius: "14px",
                  background:
                    message.role === "user"
                      ? "#e7eef9"
                      : "#f1f3f6",
                  color: "#1f2937",
                  whiteSpace: "pre-line",
                  lineHeight: "1.6",
                }}
              >
                <strong>
                  {message.role === "user"
                    ? "You"
                    : "Saarthi"}
                </strong>

                <div style={{ marginTop: "5px" }}>
                  {message.text}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div
              style={{
                color: "#64748b",
                marginTop: "10px",
              }}
            >
              Saarthi is thinking...
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid #e5e7eb",
            padding: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
          <input
            type="text"
            value={question}
            onChange={(event) =>
              setQuestion(event.target.value)
            }
            onKeyDown={handleKeyDown}
            disabled={loading}
            placeholder="Ask about schemes, scholarships, documents..."
            style={{
              flex: 1,
              padding: "14px",
              border: "1px solid #d1d5db",
              borderRadius: "10px",
              fontSize: "15px",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={askSaarthi}
            disabled={
              loading || !question.trim()
            }
            style={{
              padding: "0 22px",
              border: "none",
              borderRadius: "10px",
              background:
                loading || !question.trim()
                  ? "#9ca3af"
                  : "#173b72",
              color: "#ffffff",
              cursor:
                loading || !question.trim()
                  ? "not-allowed"
                  : "pointer",
              fontSize: "16px",
            }}
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SaarthiAI;