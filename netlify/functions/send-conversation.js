const nodemailer = require("nodemailer");

exports.handler = async (event) => {

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {

    const { messages } =
      JSON.parse(event.body);

    const realMessages = messages.filter(
      (m) =>
        !(m.role === "assistant" &&
          m.content.startsWith("Hi! 👋"))
    );

    if (realMessages.length === 0) {

      return {
        statusCode: 200,
        body: "No conversation to send",
      };

    }

    const transcript = realMessages
      .map(
        (m) =>
          `${m.role === "user"
            ? "🧑 Visitor"
            : "🤖 AI"}:\n\n${m.content}`
      )
      .join("\n\n----------------------\n\n");

    const totalQuestions =
      realMessages.filter(
        (m) => m.role === "user"
      ).length;

    // EMAIL TRANSPORT

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },

      });

    // SEND EMAIL

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: process.env.EMAIL_USER,

      subject:
        "New AI Chatbot Conversation",

      text:
        `New visitor conversation on portfolio\n\n` +

        `Total Questions Asked: ${totalQuestions}\n\n` +

        `==============================\n\n` +

        transcript,

    });

    return {

      statusCode: 200,

      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        success: true,
      }),

    };

  } catch (error) {

    console.error(error);

    return {

      statusCode: 500,

      headers: {
        "Access-Control-Allow-Origin": "*",
      },

      body: JSON.stringify({
        error: "Failed to send conversation",
      }),

    };

  }

};