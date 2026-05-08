exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { messages } = JSON.parse(event.body);

    const realMessages = messages.filter(
      (m) => !(m.role === "assistant" && m.content.startsWith("Hi! 👋"))
    );

    if (realMessages.length === 0) {
      return { statusCode: 200, body: "No conversation to send" };
    }

    const transcript = realMessages
      .map((m) => `${m.role === "user" ? "🧑 Visitor" : "🤖 AI"}: ${m.content}`)
      .join("\n\n");

    const totalQuestions = realMessages.filter((m) => m.role === "user").length;

    const formData = new URLSearchParams();
    formData.append("Name", "Portfolio Chat — Conversation Summary");
    formData.append("Email", "chat-widget@portfolio.com");
    formData.append(
      "Message",
      `Someone just had a conversation on your portfolio!\n\n` +
      `Total questions asked: ${totalQuestions}\n\n` +
      `--- FULL CONVERSATION ---\n\n${transcript}`
    );

    await fetch(
      "https://script.google.com/macros/s/AKfycbx8LVPXcIfv-z2IMBpXnV6yKNoAT17taScBF0onA7aRcKV5pTxDGEnkmcwyDkMucjki/exec",
      { method: "POST", body: formData }
    );

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ sent: true }),
    };
  } catch (err) {
    console.error("Send conversation error:", err);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Failed to send" }),
    };
  }
};