import React from "react";

function About() {
  return (
    <div id="about">
      <div className="container">
        <h1 className="sub-title">About Me</h1>
        <p className="about-desc">
          Hi! I'm <b>Kanishka Choudhury</b>, a data professional based in{" "}
          <b>Kolkata, India</b>, with a B.Tech in Mechanical Engineering and an
          MBA in Marketing. I work across the full data and AI spectrum — from
          building <b>SQL dashboards and Power BI reports</b> to developing{" "}
          <b>RAG systems, AI agents, and deep learning models</b>. I'm targeting
          roles in Data Analytics, Data Science, and AI/GenAI Engineering.
        </p>

        <div className="skills-box">
          <h2 className="sub-title" style={{ fontSize: "36px", marginBottom: "24px" }}>
            Skills
          </h2>
          <div className="skill-categories">
            <div className="skill-cat-card">
              <p className="skill-cat-label">Data &amp; Analytics</p>
              <div className="skill-tag-row">
                <span className="skill-tag">SQL</span>
                <span className="skill-tag">Power BI</span>
                <span className="skill-tag">Excel</span>
                <span className="skill-tag">DAX</span>
              </div>
            </div>
            <div className="skill-cat-card">
              <p className="skill-cat-label">Programming &amp; ML</p>
              <div className="skill-tag-row">
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">Deep Learning</span>
                <span className="skill-tag">ANN</span>
                <span className="skill-tag">LSTM</span>
                <span className="skill-tag">RNN</span>
              </div>
            </div>
            <div className="skill-cat-card">
              <p className="skill-cat-label">NLP &amp; GenAI</p>
              <div className="skill-tag-row">
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">LLMs</span>
                <span className="skill-tag">RAG</span>
                <span className="skill-tag">LangChain</span>
                <span className="skill-tag">Gemini API</span>
                <span className="skill-tag">Prompt Engineering</span>
              </div>
            </div>
            <div className="skill-cat-card">
              <p className="skill-cat-label">Agentic AI</p>
              <div className="skill-tag-row">
                <span className="skill-tag">AI Agents</span>
                <span className="skill-tag">LangGraph</span>
                <span className="skill-tag">Agentic Workflows</span>
                <span className="skill-tag">Streamlit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;