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

  // Navigation & Theme States
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

  // Playful Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.15 },
    );

    document
      .querySelectorAll(".playful-reveal")
      .forEach((el) => observer.observe(el));

    return () => {
      document
        .querySelectorAll(".playful-reveal")
        .forEach((card) => observer.unobserve(card));
    };
  }, []);

  // Parallax Mouse Handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalize to -1 to 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    requestAnimationFrame(() => setMousePosition({ x, y }));
  };

  // About Section Interactive Dot Tracker
  const handleAboutMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--cursor-x", `${x}px`);
    e.currentTarget.style.setProperty("--cursor-y", `${y}px`);
  };

  const handleAboutMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty("--cursor-x", `-1000px`);
    e.currentTarget.style.setProperty("--cursor-y", `-1000px`);
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
      {/* Dark Transition "About" Section */}
      <section
        id="about-intro"
        className="about-transition-section"
        onMouseMove={handleAboutMouseMove}
        onMouseLeave={handleAboutMouseLeave}
        style={
          {
            "--cursor-x": "-1000px",
            "--cursor-y": "-1000px",
          } as React.CSSProperties
        }
      >
        {/* Top Left: Pinned Photos */}
        <div className="pinned-photos-container">
          <div className="pinned-polaroid p-left">
            <div className="polaroid-image-frame">
              <img src="v1/photos/my-hero-photo-1.png" alt="Memory 1" />
            </div>
            <div className="polaroid-pin"></div>
          </div>
          <div className="pinned-polaroid p-right">
            <div className="polaroid-image-frame">
              <img src="v1/photos/my-hero-photo-2.png" alt="Memory 2" />
            </div>
            <div className="polaroid-pin"></div>
            <span className="polaroid-caption">clicks.</span>
          </div>
        </div>

        <h1 className="about-massive-title">About Me.</h1>

        {/* Top Right: Camera Magnet */}
        <div className="camera-magnet-container">
          <div className="magnet-camera">
            <span className="camera-icon">📷</span>
          </div>
          <div className="magnet-word">click</div>
        </div>

        {/* Bottom Left: Developer Badge */}
        <div className="developer-badge-container">
          <div className="dev-badge">
            <span className="dev-badge-icon">{"</>"}</span>
            <span className="dev-badge-text">Developer</span>
          </div>
        </div>

        {/* Bottom Right: Spotify Functional Widget */}
        <div className="spotify-widget-container">
          <iframe
            style={{ borderRadius: "12px", pointerEvents: "auto" }}
            src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?utm_source=generator&theme=0"
            width="100%"
            height="300"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        <div className="scroll-hint">↓</div>
      </section>
      {/* 2. The Playful & Tactile Storyboard */}
      <section id="about-playful" className="playful-about-section">
        {/* Section 1: The Pick a Card Core Skills */}
        <div className="card-skills-section playful-reveal">
          <div className="sticky-note">Hover to flip!</div>
          <div className="cards-container">
            {/* Card 1: The Logic */}
            <div className="retro-flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front card-logic">
                  <div className="front-visual">
                    <span className="card-icon">🧠</span>
                  </div>
                  <h3 className="card-title">The Logic</h3>
                </div>
                <div className="flip-card-back">
                  <p>
                    "Building intelligent systems. Heavily focused on C++ DSA
                    and crafting clean, scalable data pipelines."
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: The Hardware */}
            <div className="retro-flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front card-hardware">
                  <div className="front-visual">
                    <span className="card-icon">⚡</span>
                  </div>
                  <h3 className="card-title">The Hardware</h3>
                </div>
                <div className="flip-card-back">
                  <p>
                    "Bridging code and reality. Tinkering with ESP32s and
                    building real-time, physical monitoring systems."
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3: The Canvas */}
            <div className="retro-flip-card">
              <div className="flip-card-inner">
                <div className="flip-card-front card-canvas">
                  <div className="front-visual">
                    <span className="card-icon">🎬</span>
                  </div>
                  <h3 className="card-title">The Canvas</h3>
                </div>
                <div className="flip-card-back">
                  <p>
                    "Cinematic framing and 3D modeling. Using DaVinci Resolve
                    and Blender to make the technical look beautiful."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: The Deep-Dive Showcase (Magazine Layout) */}
        <div className="deep-dive-showcase playful-reveal">
          <div className="showcase-left">
            <div className="bold-colored-square">
              <h3 className="square-text">Tech Lead</h3>
              <div className="floating-3d-element">
                <img
                  src="v1/photos/accessories/mobile.png"
                  alt="ESP32 Float"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="showcase-right">
            <h2 className="showcase-title">
              Project: Real-Time Health Monitor
            </h2>
            <p className="showcase-story">
              Leading teams and pushing the boundaries of hardware/software
              integration. I orchestrated the architecture for a massive
              240-player e-sports event and engineered physical IoT endpoints.
              It's about full-spectrum technical leadership.
            </p>
            <div className="showcase-stack">
              <span className="stack-badge">Kali Linux</span>
              <span className="stack-badge">C++</span>
              <span className="stack-badge">React & Vite</span>
              <span className="stack-badge">ESP32 Firmware</span>
            </div>
          </div>
        </div>

        {/* Section 3: The Tactile Playful Bento */}
        <div className="playful-bento-grid playful-reveal">
          {/* Box 1: The Fridge */}
          <div className="playful-box bento-fridge">
            <div className="fridge-door">
              <div className="fridge-handle"></div>
              <div className="sticky goal-1">Hit new bench PR</div>
              <div className="sticky goal-2">Plan next trip</div>
              <div className="magnet m-1">🏔️</div>
              <div className="magnet m-2">🌊</div>
            </div>
          </div>

          {/* Box 2: The Kitchen Box */}
          <div className="playful-box bento-kitchen">
            <div className="chef-cloche">
              <div className="cloche-base"></div>
              <div className="food-polaroids">
                <div className="food-polaroid fp-1">
                  <span>Cheesecake</span>
                </div>
                <div className="food-polaroid fp-2">
                  <span>Tiramisu</span>
                </div>
                <div className="food-polaroid fp-3">
                  <span>Fried Chicken</span>
                </div>
              </div>
              <div className="cloche-cover">
                <span className="cloche-handle"></span>
                <span className="cloche-label">Hover to Open</span>
              </div>
            </div>
          </div>

          {/* Box 3: The Spotify Player */}
          <div className="playful-box bento-spotify">
            <div className="mini-player">
              <div className="player-art">🎵</div>
              <div className="player-info">
                <h4>Focus & Grind</h4>
                <p>Heavy Coding Playlist</p>
                <div className="progress-bar">
                  <div className="progress-fill"></div>
                </div>
              </div>
              <div className="player-controls">
                <span>⏮</span> <span className="play-btn">▶</span>{" "}
                <span>⏭</span>
              </div>
            </div>
          </div>

          {/* Box 4: The Interactive Photo */}
          <div className="playful-box bento-vibe-photo">
            <img
              src="v1/photos/my-hero-photo-1.png"
              alt="Vibe"
              loading="lazy"
            />
            <div className="chat-bubble">
              Hey! Ready to build something huge?
            </div>
          </div>
        </div>

        {/* Section 4: The Outro Text */}
        <div className="outro-text-section playful-reveal">
          <p>
            "When I'm not writing code or debugging hardware, I'm usually away
            from my screen. I'm either in the kitchen trying out a new
            high-protein recipe, hitting the gym for a bulk, or out on the
            scooter finding a new route. I build things to work perfectly, but I
            design them to look cinematic."
          </p>
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
