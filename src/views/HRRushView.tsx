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

  // Interaction States
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCaffeineRush, setIsCaffeineRush] = useState(false);
  const [coffeeClicks, setCoffeeClicks] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Typewriter States
  const skills = [
    "AI & Data Science",
    "Building Software",
    "Crafting 3D Models",
    "Editing Cinematic Video",
  ];
  const [skillText, setSkillText] = useState("");
  const [skillIndex, setSkillIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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
    {
      id: "headset",
      src: "v1/photos/accessories/headset.png",
      alt: "Headset",
      className: "acc-headset",
    },
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

  // Typewriter Loop
  useEffect(() => {
    const currentSkill = skills[skillIndex];
    // Speed up typing if in caffeine rush!
    const baseTypeSpeed = isDeleting ? 40 : 80;
    const typeSpeed = isCaffeineRush ? baseTypeSpeed / 3 : baseTypeSpeed;

    const timeout = setTimeout(() => {
      if (!isDeleting && skillText === currentSkill) {
        setTimeout(() => setIsDeleting(true), isCaffeineRush ? 500 : 2000); // Pause before deleting
      } else if (isDeleting && skillText === "") {
        setIsDeleting(false);
        setSkillIndex((prev) => (prev + 1) % skills.length);
      } else {
        setSkillText(
          currentSkill.substring(0, skillText.length + (isDeleting ? -1 : 1)),
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [skillText, isDeleting, skillIndex, isCaffeineRush, skills]);

  // Bento Cards Reveal & Hover Physics
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1 },
    );

    document
      .querySelectorAll(".bento-card")
      .forEach((el) => observer.observe(el));

    const handleCardMouseMove = (e: MouseEvent) => {
      const card = e.currentTarget as HTMLElement;
      // Skip 3D tilt if the card is flipped (hobbies card)
      if (card.classList.contains("flipped")) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleCardMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      if (card.classList.contains("flipped")) return;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    };

    const cards = document.querySelectorAll(".bento-card");
    cards.forEach((card) => {
      card.addEventListener("mousemove", handleCardMouseMove as any);
      card.addEventListener("mouseleave", handleCardMouseLeave);
    });

    const btn = document.querySelector(".magnetic-btn") as HTMLElement;
    const handleBtnMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    };
    const handleBtnLeave = () => {
      btn.style.transform = `translate(0px, 0px)`;
    };

    if (btn) {
      btn.addEventListener("mousemove", handleBtnMove);
      btn.addEventListener("mouseleave", handleBtnLeave);
    }

    return () => {
      cards.forEach((card) => observer.unobserve(card));
      cards.forEach((card) => {
        card.removeEventListener("mousemove", handleCardMouseMove as any);
        card.removeEventListener("mouseleave", handleCardMouseLeave);
      });
      if (btn) {
        btn.removeEventListener("mousemove", handleBtnMove);
        btn.removeEventListener("mouseleave", handleBtnLeave);
      }
    };
  }, []);

  // Parallax Mouse Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePosition({ x, y });
  };

  // Coffee Easter Egg
  const handleCoffeeClick = () => {
    const newClicks = coffeeClicks + 1;
    setCoffeeClicks(newClicks);
    if (newClicks >= 3) {
      setIsCaffeineRush(true);
      setTimeout(() => setIsCaffeineRush(false), 8000); // 8 seconds of caffeine rush
      setCoffeeClicks(0);
    }
  };

  return (
    <div
      className={`hr-rush-container ${isCaffeineRush ? "caffeine-rush" : ""} ${isDarkMode ? "late-night-vibe" : ""}`}
      onMouseMove={handleMouseMove}
      style={
        {
          "--mouse-x": mousePosition.x,
          "--mouse-y": mousePosition.y,
        } as React.CSSProperties
      }
    >
      <div className="hero-wrapper-container">
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={() => setIsDarkMode(!isDarkMode)}
          title="Toggle Late-Night Developer Vibe"
        >
          {isDarkMode ? "☀️" : "🌙"}
        </button>

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
          <div className="floating-icons-container parallax-layer-back">
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
          <div className="accessories-container parallax-layer-front">
            {accessoryPlaceholders.map((acc) => (
              <img
                key={acc.id}
                src={acc.src}
                alt={acc.alt}
                className={`accessory ${acc.className} ${isCaffeineRush && acc.id === "coffee" ? "shaking" : ""}`}
                onClick={acc.id === "coffee" ? handleCoffeeClick : undefined}
                // Interactive hover sounds or actions could be mapped here later
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }} // hides if image doesn't exist yet
              />
            ))}
          </div>

          {/* Central Hero Content */}
          <div className="hero-content parallax-layer-mid">
            {/* The Hook (Typography) */}
            <div className="hero-typography-hook">
              <h1 className="hero-headline">Hi, I'm Akash.</h1>
              <h2 className="hero-subheadline">
                <span className="typewriter-text">{skillText}</span>
                <span className="typewriter-cursor">|</span>
              </h2>
            </div>

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
      {/* End of hero-wrapper-container */}
      {/* 1. Dark "About Me" Transition Section */}
      <section className="about-transition-section">
        <h1 className="about-massive-title">About Me.</h1>
        <div className="scroll-hint">↓</div>
      </section>
      {/* 2. Glassmorphic Bento Grid */}
      <section id="about" className="bento-section">
        <div className="bento-grid-container">
          {/* Card 1: Main Intro (2x2) */}
          <div className="bento-card bento-main-intro bento-span-2x2">
            <h3 className="bento-headline">
              Designing experiences &<br />
              writing clean logic.
            </h3>
            <p className="bento-p">
              I focus on building intuitive, high-performance web applications
              that merge striking aesthetics with robust engineering.
            </p>
            <div className="magnetic-btn-wrapper">
              <button className="magnetic-btn">Get in Touch</button>
            </div>
            {/* Abstract 3D shape placeholder (CSS spinning element for now) */}
            <div className="abstract-3d-shape"></div>
          </div>

          {/* Card 2: Tech Stack (2x1) */}
          <div className="bento-card bento-tech bento-span-2x1">
            <h4 className="bento-label">Tech Stack & Tools</h4>
            <div className="tech-icons-grid">
              {toolPlaceholders.slice(0, 10).map((tool) => (
                <div className="tech-icon-wrapper" key={`stack-${tool.id}`}>
                  <img
                    src={tool.src}
                    alt={tool.alt}
                    className="tech-stack-icon"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <span className="tech-tooltip">Advanced</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Live Status (1x1) */}
          <div className="bento-card bento-status bento-span-1x1">
            <div className="status-header">
              <span className="pulsing-dot"></span>
              <h4 className="bento-label">Live Status</h4>
            </div>
            <p className="status-text">
              <span className="status-tag">Currently</span>
              Building a full-stack web app
            </p>
            <p className="status-text mt-3">
              <span className="status-tag">Learning</span>
              Advanced System Architecture
            </p>
          </div>

          {/* Card 5: Project Spotlight (1x2 Tall) moved to right side visually */}
          <div className="bento-card bento-spotlight bento-span-1x2">
            <h4 className="bento-label absolute-label">Project Spotlight</h4>
            <img
              src="v1/photos/my-hero-photo-1.png"
              alt="Project"
              className="spotlight-image"
            />
            <div className="spotlight-overlay">
              <h4>VitalBridge IoT</h4>
              <p>View Case Study ↗</p>
            </div>
          </div>

          {/* Card 4: Journey / Milestones (2x1) */}
          <div className="bento-card bento-journey bento-span-2x1">
            <h4 className="bento-label">Journey & Milestones</h4>
            <div className="milestone-scroll">
              <div className="milestone-card">
                <h5 className="ms-year">2024</h5>
                <p className="ms-text">Launched Major Project</p>
              </div>
              <div className="milestone-card">
                <h5 className="ms-year">2023</h5>
                <p className="ms-text">Full-Stack Development</p>
              </div>
              <div className="milestone-card">
                <h5 className="ms-year">2022</h5>
                <p className="ms-text">Began Computer Science</p>
              </div>
            </div>
          </div>

          {/* Card 6: Beyond the Screen (1x1) Flip Card */}
          <div
            className="bento-card bento-hobbies bento-span-1x1"
            onClick={(e) => e.currentTarget.classList.toggle("flipped")}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h4 className="bento-label">Beyond the Screen</h4>
                <div className="hobby-emojis">📷 🎾 ☕ ✈️</div>
                <span className="flip-hint">Click to flip</span>
              </div>
              <div className="flip-card-back">
                <p className="bento-p small-p">
                  When I'm not coding, you'll find me shooting photos, playing
                  tennis, or searching for the perfect espresso.
                </p>
              </div>
            </div>
          </div>
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
