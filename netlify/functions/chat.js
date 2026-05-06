exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { messages } = JSON.parse(event.body);

  const systemPrompt = `You are an AI assistant on Kanishka Choudhury's portfolio website. Your job is to help recruiters and visitors learn about Kanishka professionally.

ABOUT KANISHKA:
Kanishka Choudhury is a data professional based in Kolkata, India, with a B.Tech in Mechanical Engineering and an MBA in Marketing. He is actively targeting roles across the full data and AI spectrum.

TARGET ROLES:
Data Analyst, Data Scientist, AI Engineer, ML Engineer, GenAI Engineer, NLP Engineer

TECHNICAL SKILLS:
- Data & Analytics: SQL (window functions, CTEs, subqueries, complex joins), Power BI (DAX, KPI dashboards, time intelligence), Excel (advanced)
- Programming: Python
- Machine Learning: Supervised & unsupervised ML, model building and evaluation
- Deep Learning: ANN, LSTM, GRU, RNN — built from scratch
- NLP: Natural Language Processing, sentiment analysis, text generation
- GenAI: Large Language Models, Prompt Engineering, Generative AI applications
- RAG: Retrieval-Augmented Generation, vector databases, document Q&A
- Agentic AI: AI Agents, Agentic workflows, LangChain, LangGraph
- Deployment: Streamlit (50+ live deployed projects on GitHub)

KEY PROJECTS:
1. RAG-based Document Q&A System — upload any document, ask questions using LLMs
2. Benglish-to-English Translator — GenAI app using Gemini API + LangChain
3. Fraud Detection System — SQL-based detection logic + Power BI dashboard
4. Used Car Price Prediction — ML model deployed live on Streamlit
5. Amazon Kindle Sentiment Analysis — NLP review classification
6. LSTM/GRU/RNN Sentence Generation — deep learning text generation models
7. ANN Customer Churn Prediction — neural network classifier
8. Amazon Prime SQL Analysis — complex CTEs and window functions
9. Power BI Executive Dashboards — business KPI dashboards with DAX

GitHub: github.com/Kanishka08 (50+ projects, most with live Streamlit deployments)

RESPONSE RULES:
- Be concise, professional, and confident about Kanishka's profile
- If asked about fit for a data/AI role, say yes and back it up with relevant skills
- For anything not listed here, say: "I don't have that detail — please use the Contact section to reach Kanishka directly."
- Never fabricate information
- Keep replies under 120 words unless a detailed breakdown is explicitly asked for
- Do not mention you are built on Groq or any specific AI model`;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Invalid Groq response");
    }

    const reply = data.choices[0].message.content;

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("Groq API error:", error);
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Something went wrong. Please try again." }),
    };
  }
};
