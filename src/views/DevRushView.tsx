import React from "react";
import "./DevRushView.css";

const DevRushView: React.FC = () => {
  return (
    <div className="dev-rush-container">
      <div className="dev-rush-dashboard">
        <header className="dev-header">
          <div className="mac-buttons">
            <span className="mac-btn close"></span>
            <span className="mac-btn minimize"></span>
            <span className="mac-btn maximize"></span>
          </div>
          <div className="tab-title">johan_tldr_repo.sh</div>
        </header>

        <div className="terminal-body">
          <div className="cmd-line">
            <span className="prompt">root@johan-kali:~#</span>
            <span className="command">
              echo "Talk is cheap. Show me the code."
            </span>
          </div>
          <div className="stdout">Talk is cheap. Show me the code.</div>

          <div className="cmd-line spacing">
            <span className="prompt">root@johan-kali:~#</span>
            <span className="command">cat stack_matrix.yaml</span>
          </div>

          <pre className="yaml-output">
            {`core:
  languages: [C++, Python, TypeScript]
  theory: [Data Structures & Algorithms]
env:
  os: Kali Linux
  tools: [Docker, Git, Neovim]
creative_tech:
  video: DaVinci Resolve Studio 20
  3D: Blender`}
          </pre>

          <div className="cmd-line spacing">
            <span className="prompt">root@johan-kali:~#</span>
            <span className="command">
              ls -la --color=always /projects/top_repos
            </span>
          </div>

          <div className="repo-grid">
            <a
              href="https://github.com/johan/esp32-health-monitor"
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              <div className="repo-internal">
                <h4>📁 esp32-health-monitor</h4>
                <p>
                  The ESP32 Real-Time Health Monitor. Hardware schematics +
                  WebSockets backend.
                </p>
              </div>
            </a>

            <a
              href="https://github.com/johan/multi-view-portfolio"
              target="_blank"
              rel="noreferrer"
              className="repo-link"
            >
              <div className="repo-internal">
                <h4>📁 multi-view-portfolio</h4>
                <p>
                  The code for this very multi-view, OS-booting React portfolio.
                </p>
              </div>
            </a>
          </div>

          <div className="cmd-line spacing">
            <span className="prompt">root@johan-kali:~#</span>
            <span className="command">./execute_ctas.sh</span>
          </div>

          <div className="dev-cta-row">
            <a
              href="https://github.com/johan"
              target="_blank"
              rel="noreferrer"
              className="brutalist-btn"
            >
              [ GitHub ]
            </a>
            <a
              href="https://linkedin.com/in/johan"
              target="_blank"
              rel="noreferrer"
              className="brutalist-btn"
            >
              [ Dev Socials ]
            </a>
            <a
              href="/Johan_Resume.pdf"
              download
              className="brutalist-btn primary"
            >
              [ raw_resume.pdf ]
            </a>
          </div>

          <div className="cmd-line spacing">
            <span className="prompt">root@johan-kali:~#</span>
            <span className="command cursor">_</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevRushView;
