import React, { useState } from "react";
import "./HRTimeView.css";

const HRTimeView: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { type: "Photography", desc: "Capturing light and shadow." },
    { type: "Design", desc: "UI/UX and Digital Illustrations." },
    { type: "Filmmaking", desc: "Color grading and cinematic composition." },
  ];

  return (
    <div className="hr-time-container">
      <div className="hr-time-content">
        <header className="hr-time-hero">
          <h1>Johan: The Intersection of Logic and Art</h1>
          <p className="narrative-intro">
            I don’t just write code; I craft experiences. My journey is fueled
            by a relentless passion to blend the rigorous logic of structural
            engineering with the boundless creativity of filmmaking and design.
            I believe that the best technology doesn’t just work flawlessly—it
            feels right.
          </p>
        </header>

        <section className="hr-time-section">
          <h2>Leadership & Impact</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">Current</span>
                <h3>Tech Club Lead</h3>
                <p>
                  Driving technical innovation and fostering a community of
                  builders. Spearheaded workshops on AI integration and modern
                  web architecture, mentoring students to build their first
                  end-to-end applications.
                </p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <span className="timeline-date">Event Organization Focus</span>
                <h3>Structuring the 240-Member E-Sports Event</h3>
                <p>
                  A massive flex in project management. Organized and executed a
                  competitive gaming event for 240 active participants across
                  multiple titles (Free Fire, Chess, Carrom, Uno, Hide Online).
                </p>
                <ul>
                  <li>
                    Designed and developed the automated registration portal.
                  </li>
                  <li>
                    Managed tournament brackets, real-time scoring, and live
                    communications.
                  </li>
                  <li>
                    Coordinated a volunteer staff of 20 to ensure zero downtime
                    during the 12-hour event.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="hr-time-section">
          <h2>The Multidisciplinary Showcase</h2>
          <p className="section-subtitle">
            A glimpse into my eye for design, beyond the IDE.
          </p>

          <div className="carousel">
            <div
              className="carousel-track"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="carousel-slide">
                  <div className="placeholder-art">
                    <span className="art-icon">
                      {slide.type === "Photography"
                        ? "📷"
                        : slide.type === "Design"
                          ? "🎨"
                          : "🎬"}
                    </span>
                    <h3>{slide.type}</h3>
                    <p>{slide.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="carousel-controls">
              {slides.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === activeSlide ? "active" : ""}`}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                ></button>
              ))}
            </div>
          </div>
        </section>

        <section className="hr-time-section beyond-screen">
          <h2>Beyond the Screen</h2>
          <div className="hobbies-grid">
            <div className="hobby-card">
              <span className="hobby-icon">🏋️‍♂️</span>
              <h3>The Iron Temple</h3>
              <p>
                Discipline isn't just mental; it's physical. My long-term
                fitness and bulking journey has taught me the value of
                consistency, progressive overload, and pushing past
                plateaus—principles I apply directly to complex engineering
                problems.
              </p>
            </div>
            <div className="hobby-card">
              <span className="hobby-icon">👨‍🍳</span>
              <h3>Culinary Experiments</h3>
              <p>
                Like writing elegant code, cooking is about understanding how
                distinct components harmonize. Whether it's mastering the
                perfect sear or balancing complex flavor profiles, the kitchen
                is where I refuel my creativity.
              </p>
            </div>
          </div>
        </section>

        <section className="hr-time-cta">
          <h2>Let's connect.</h2>
          <div className="contact-form-placeholder">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <textarea placeholder="How can we collaborate?"></textarea>
            <button className="submit-btn">Send Message</button>
          </div>
          <p className="social-links">
            <a
              href="https://linkedin.com/in/johan"
              target="_blank"
              rel="noreferrer"
            >
              Connect on LinkedIn
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default HRTimeView;
