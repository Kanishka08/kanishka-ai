import React, { useState } from "react";

function Contact() {

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    const form = e.target;

    const formData = {
      name: form.Name.value,
      email: form.Email.value,
      message: form.Message.value,
    };

    try {

      const response = await fetch(
        "/.netlify/functions/contact",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {

        setMsg("Message Sent Successfully");

        form.reset();

      } else {

        setMsg("Failed to send message");

      }

    } catch (error) {

      console.error(error);

      setMsg("Something went wrong");

    } finally {

      setLoading(false);

      setTimeout(() => {
        setMsg("");
      }, 5000);

    }

  };

  return (

    <div id="contact">

      <div className="container">

        <div className="row">

          <div className="contact-left">

            <h1 className="sub-title">
              Contact Me
            </h1>

            <p>
              <i className="fas fa-paper-plane"></i>
              {" "}
              kanishkachoudhury08@gmail.com
            </p>

            <p>
              <i className="fas fa-phone-alt"></i>

              {" "}

              <a href="tel:+918910048321">
                8910048321
              </a>

              {" / "}

              <a href="tel:+919804076282">
                9804076282
              </a>

            </p>

            <div className="social-icons">

              <a
                href="https://www.linkedin.com/in/kanishka-n-choudhury/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin"></i>
                {" "}
                Kanishka
              </a>

            </div>

          </div>

          <div className="contact-right">

            <form onSubmit={handleSubmit}>

              <input
                type="text"
                name="Name"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                name="Email"
                placeholder="Your Email"
                required
              />

              <textarea
                name="Message"
                rows="6"
                placeholder="Your Message"
                required
              ></textarea>

              <button
                type="submit"
                className="btn btn2"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Submit"}
              </button>

            </form>

            <span id="msg">
              {msg}
            </span>

          </div>

        </div>

      </div>

      <div className="copyright">

        <p>
          Copyright Kanishka
          {" "}
          <i className="fas fa-code"></i>
        </p>

      </div>

    </div>

  );
}

export default Contact;