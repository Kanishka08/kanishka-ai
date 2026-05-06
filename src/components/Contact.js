import React, { useState } from "react";

function Contact() {
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    await fetch('https://script.google.com/macros/s/AKfycbx8LVPXcIfv-z2IMBpXnV6yKNoAT17taScBF0onA7aRcKV5pTxDGEnkmcwyDkMucjki/exec', {
      method: 'POST',
      body: data,
    });

    setMsg("Message Sent Successfully");
    setTimeout(() => setMsg(""), 5000);
    form.reset();
  };

  return (
    <div id="contact">
      <div className="container">
        <div className="row">
          <div className="contact-left">
            <h1 className="sub-title">Contact Me</h1>
            <p><i className="fas fa-paper-plane"></i> kanishkachoudhury08@gmail.com</p>
            <p><i className="fas fa-phone-alt"></i> <a href="tel:+918910048321">8910048321</a> / <a href="tel:+919804076282">9804076282</a></p>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/kanishka-n-choudhury/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i> Kanishka
              </a>
            </div>
            {/* <a href="images/Kanishka_Resume_Data_Analyst.pdf" download className="btn btn2">Download CV</a> */}
          </div>
          <div className="contact-right">
            <form onSubmit={handleSubmit}>
              <input type="text" name="Name" placeholder="Your Name" required />
              <input type="email" name="Email" placeholder="Your Email" required />
              <textarea name="Message" rows="6" placeholder="Your Message"></textarea>
              <button type="submit" className="btn btn2">Submit</button>
            </form>
            <span id="msg">{msg}</span>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>Copyright Kanishka <i className="fas fa-code"></i></p>
      </div>
    </div>
  );
}

export default Contact;
