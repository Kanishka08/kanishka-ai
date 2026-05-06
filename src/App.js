import React from "react";
import Header from "./components/Header";
import About from "./components/About";
import Education from "./components/Education";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";
import ChatWidget from "./components/ChatWidget";
import "./style.css";

function App() {
  return (
    <>
      <Header />
      <About />
      <Education />
      <Portfolio />
      <Contact />
      <ChatWidget />
    </>
  );
}

export default App;