import React, { useState, useEffect } from "react";
import "./HRRushView.css";

const HRRushView: React.FC = () => {
  const toolPlaceholders = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    src: `v1/photos/tools/${i + 1}.png`, // Paths fixed based on actual public/photos directory
    alt: `Tool ${i + 1}`,
  }));

  // Hero Image Swapper State
  const heroImages = [
    "v1/photos/my-hero-photo-1.png",
    "v1/photos/my-hero-photo-2.png",
  ];
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  // Desktop knolling accessories (top-down view)
  const accessoryPlaceholders = [
    {
      id: "laptop",
      src: "v1/photos/accessories/laptop.png",
      alt: "Laptop",
      className: "acc-laptop",
    },
    {
      id: "coffee",
      src: "v1/photos/accessories/coffee.png",
      alt: "Coffee",
      className: "acc-coffee",
    },
    {
      id: "plant",
      src: "v1/photos/accessories/plant.png",
      alt: "Plant",
      className: "acc-plant",
    },
    // {
    //   id: "headset",
    //   src: "v1/photos/accessories/headset.png",
    //   alt: "Headset",
    //   className: "acc-headset",
    // },
    {
      id: "mobile",
      src: "v1/photos/accessories/mobile.png",
      alt: "Mobile",
      className: "acc-mobile",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev === 0 ? 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hr-rush-container">
      <div className="hero-wrapper-container">
        {/* Floating Pill Navigation */}
        <nav className="hr-rush-nav">
          <div className="nav-brand">Developed by Akash</div>
          <div className="nav-links-container">
            <a href="#about" className="nav-btn">
              About
            </a>
            <a href="#projects" className="nav-btn">
              Projects
            </a>
            <a href="/Akash_Resume.pdf" download className="nav-btn">
              Resume
            </a>
          </div>
        </nav>

        <section id="hero" className="hr-rush-section hr-hero-section">
          {/* Floating Background Icons - Reduced to 8 for cognitive balance */}
          <div className="floating-icons-container">
            {toolPlaceholders.slice(0, 8).map((tool) => (
              <img
                key={tool.id}
                src={tool.src}
                alt={tool.alt}
                className={`float-icon float-icon-${tool.id}`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }} // hides if image doesn't exist yet
              />
            ))}
          </div>

          {/* Desk Accessories (Top-down view) */}
          <div className="accessories-container">
            {accessoryPlaceholders.map((acc) => (
              <img
                key={acc.id}
                src={acc.src}
                alt={acc.alt}
                className={`accessory ${acc.className}`}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }} // hides if image doesn't exist yet
              />
            ))}
          </div>

          {/* Central Hero Content */}
          <div className="hero-content">
            <div className="hero-photo-container">
              {/* Swaps between /hero_1.png and /hero_2.png in your public folder */}
              <img
                src={heroImages[currentHeroIdx]}
                alt="Akash Profile"
                className="hero-photo"
              />
            </div>
          </div>
        </section>
      </div>{" "}
      {/* End of hero-wrapper-container */}
      {/* Empty spaces for other sections to be filled later */}
      <section id="about" className="hr-rush-section placeholder-section">
        <div className="section-placeholder-content">
          <h2>About Me Space</h2>
          <p>Content goes here...</p>
        </div>
      </section>
      <section id="experience" className="hr-rush-section placeholder-section">
        <div className="section-placeholder-content">
          <h2>Experience Space</h2>
          <p>Content goes here...</p>
        </div>
      </section>
      <section id="projects" className="hr-rush-section placeholder-section">
        <div className="section-placeholder-content">
          <h2>Projects Space</h2>
          <p>Content goes here...</p>
        </div>
      </section>
      <section id="contact" className="hr-rush-section placeholder-section">
        <div className="section-placeholder-content">
          <h2>Contact Space</h2>
          <p>Content goes here...</p>
        </div>
      </section>
    </div>
  );
};

export default HRRushView;
