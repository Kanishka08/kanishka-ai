import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";

import "./ChatWidget.css";

const SUGGESTED_QUESTIONS = [
  "What skills does Kanishka have?",
  "Tell me about his projects",
  "Is he fit for a Data Analyst role?",
  "Does he know GenAI and RAG?",
];

export default function ChatWidget() {

  const [isOpen, setIsOpen] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm Kanishka's AI assistant. Ask me anything about his skills, projects, or experience.",
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const bottomRef = useRef(null);
  const messagesRef = useRef(messages);
  const sentRef = useRef(false);

  // KEEP REF UPDATED

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // AUTO SCROLL

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, isOpen]);

  // SEND CONVERSATION TO GOOGLE SHEETS

  const sendConversation = useCallback(async () => {

    const current = messagesRef.current;

    const hasRealChat = current.some(
      (m) => m.role === "user"
    );

    if (!hasRealChat || sentRef.current) return;

    sentRef.current = true;

    try {

      await fetch(
        "/.netlify/functions/send-conversation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: current,
          }),
        }
      );

      console.log("Conversation sent");

    } catch (error) {

      console.error(
        "Conversation send failed:",
        error
      );

    }

  }, []);

  // HANDLE CLOSE

  const handleClose = async () => {

    setIsOpen(false);

    await sendConversation();

  };

  // SAVE WHEN USER LEAVES

  useEffect(() => {

    const handleVisibility = () => {

      if (document.visibilityState === "hidden") {
        sendConversation();
      }

    };

    const handleUnload = () => {
      sendConversation();
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    window.addEventListener(
      "beforeunload",
      handleUnload
    );

    return () => {

      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );

      window.removeEventListener(
        "beforeunload",
        handleUnload
      );

    };

  }, [sendConversation]);

  // SEND MESSAGE

  const sendMessage = async (text) => {

    const userText = text || input.trim();

    if (!userText || isLoading) return;

    setShowSuggestions(false);

    setInput("");

    // USER MESSAGE

    const updatedMessages = [
      ...messages,
      {
        role: "user",
        content: userText,
      },
    ];

    setMessages(updatedMessages);

    setIsLoading(true);

    try {

      // AI API CALL

      const response = await fetch(
        "/.netlify/functions/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: updatedMessages,
          }),
        }
      );

      const data = await response.json();

      // AI MESSAGE

      const finalMessages = [
        ...updatedMessages,
        {
          role: "assistant",
          content:
            data.reply ||
            "Something went wrong.",
        },
      ];

      setMessages(finalMessages);

    } catch (error) {

      console.error(error);

      setMessages([
        ...updatedMessages,
        {
          role: "assistant",
          content:
            "Something went wrong. Please try again.",
        },
      ]);

    } finally {

      setIsLoading(false);

    }
  };

  // ENTER KEY

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      sendMessage();

    }

  };

  return (
    <div className="chat-wrapper">

      {isOpen && (

        <div className="chat-panel">

          {/* HEADER */}

          <div className="chat-header">

            <div className="chat-header-info">

              <div className="chat-avatar">
                K
              </div>

              <div>

                <p className="chat-name">
                  Kanishka's AI
                </p>

                <p className="chat-status">
                  ● Online
                </p>

              </div>

            </div>

            <button
              className="chat-close"
              onClick={handleClose}
            >
              ✕
            </button>

          </div>

          {/* MESSAGES */}

          <div className="chat-messages">

            {messages.map((msg, i) => (

              <div
                key={i}
                className={`chat-bubble-wrap ${msg.role}`}
              >

                <div
                  className={`chat-bubble ${msg.role}`}
                >
                  {msg.content}
                </div>

              </div>

            ))}

            {/* SUGGESTIONS */}

            {showSuggestions && (

              <div className="chat-suggestions">

                {SUGGESTED_QUESTIONS.map(
                  (q, i) => (

                    <button
                      key={i}
                      className="suggestion-chip"
                      onClick={() =>
                        sendMessage(q)
                      }
                    >
                      {q}
                    </button>

                  )
                )}

              </div>

            )}

            {/* LOADING */}

            {isLoading && (

              <div className="chat-bubble-wrap assistant">

                <div className="chat-bubble assistant typing">

                  <span></span>
                  <span></span>
                  <span></span>

                </div>

              </div>

            )}

            <div ref={bottomRef} />

          </div>

          {/* INPUT */}

          <div className="chat-input-area">

            <input
              className="chat-input"
              type="text"
              placeholder="Ask about skills, projects..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={handleKeyDown}
              disabled={isLoading}
            />

            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={
                isLoading || !input.trim()
              }
            >
              ➤
            </button>

          </div>

        </div>

      )}

      {/* FLOAT BUTTON */}

      <button
        className="chat-fab"
        onClick={() =>
          setIsOpen(!isOpen)
        }
      >
        {isOpen ? "✕" : "💬"}
      </button>

    </div>
  );
}