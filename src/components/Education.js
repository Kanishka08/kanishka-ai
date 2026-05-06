import React from "react";

const timeline = [
  {
    year: "2024 – Present",
    title: "Data Analytics with Visualization",
    sub: "Ivy Pro School · SQL, Power BI, Python, ML, DL, NLP, GenAI, RAG, Agentic AI",
  },
  {
    year: "Completed",
    title: "MBA — Marketing",
    sub: "Business strategy, communication, market analysis",
  },
  {
    year: "Completed",
    title: "B.Tech — Mechanical Engineering",
    sub: "Analytical foundation, systems thinking, quantitative reasoning",
  },
];

function Education() {
  return (
    <div id="education">
      <div className="container">
        <h1 className="sub-title">Education &amp; Upskilling</h1>
        <div className="timeline">
          {timeline.map((item, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot"></div>
              <div className="timeline-info">
                <p className="timeline-year">{item.year}</p>
                <p className="timeline-title">{item.title}</p>
                <p className="timeline-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Education;
