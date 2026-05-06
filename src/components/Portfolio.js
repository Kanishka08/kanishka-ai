import React, { useState } from "react";

// Replace link values with your actual GitHub repo URLs
const ALL_PROJECTS = [
  {
    cat: "genai",
    title: "RAG-Based Document Q&A System",
    desc: "Upload any document and ask questions using LLMs with Retrieval-Augmented Generation. Built with LangChain and vector databases.",
    tags: ["Python", "LangChain", "RAG", "LLM"],
    link: "https://github.com/Kanishka08",
  },
  {
    cat: "ds",
    title: "Loan Prediction",
    desc: "ML pipeline predicting loan approval with feature engineering, model training, and Streamlit deployment.",
    tags: ["Python", "Scikit-learn", "Streamlit"],
    link: "https://github.com/Kanishka08/loan-prediction",
  },
  {
    cat: "analytics",
    title: "Refund Loss & Risk Behavior Dashboard",
    desc: "Detects refund-related losses and risky user behaviors using transaction patterns, card types, and credit profiles.",
    tags: ["SQL", "Python", "Power BI"],
    link: "https://github.com/Kanishka08/Refund-Loss-And-Risk-Behavior-Executive-Dashboard",
  },
];

const TABS = [
  { key: "all", label: "All" },
  { key: "analytics", label: "Analytics" },
  { key: "ds", label: "Data Science" },
  { key: "genai", label: "GenAI & AI" },
];

const CAT_LABEL = {
  genai: "GenAI & AI",
  ds: "Data Science",
  analytics: "Analytics",
};

function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const filtered =
    activeTab === "all"
      ? ALL_PROJECTS
      : ALL_PROJECTS.filter((p) => p.cat === activeTab);

  return (
    <div id="portfolio">
      <div className="container">
        <h1 className="sub-title">My Work</h1>

        {/* Tab Bar */}
        <div className="proj-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={`proj-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        <div className="proj-card-list">
          {filtered.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="proj-card"
            >
              <div className="proj-card-top">
                <span className="proj-cat-pill">{CAT_LABEL[project.cat]}</span>
                <i className="fas fa-external-link-alt proj-arrow"></i>
              </div>
              <h3 className="proj-card-title">{project.title}</h3>
              <p className="proj-card-desc">{project.desc}</p>
              <div className="proj-card-tags">
                {project.tags.map((t, j) => (
                  <span className="proj-card-tag" key={j}>{t}</span>
                ))}
              </div>
            </a>
          ))}
        </div>

        {/* GitHub CTA */}
        <div className="github-cta">
          <p className="github-cta-text">
            These are 3 featured projects. I have{" "}
            <b>50+ projects</b> covering SQL, Power BI, ML, DL, NLP, GenAI,
            RAG, and Agentic AI on GitHub.
          </p>
          <a
            href="https://github.com/Kanishka08"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View All Projects on GitHub &nbsp;→
          </a>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;