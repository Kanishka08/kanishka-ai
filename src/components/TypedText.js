import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypedText = () => {
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "Data Analyst",
        "Data Scientist",
        "AI Engineer",
        "ML Engineer",
        "GenAI Developer",
      ],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
    return () => typed.destroy();
  }, []);

  return <span ref={el}></span>;
};

export default TypedText;