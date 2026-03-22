import React, { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { OrbitControls, TorusKnot } from "@react-three/drei";
import "./DevTimeView.css";

// A simple spinning 3D shape for the Hero section
const SpinningShape = () => {
  const meshRef = useRef<Mesh>(null!);
  useFrame((_: any, delta: number) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <TorusKnot ref={meshRef} args={[1, 0.3, 128, 64]} scale={1.5}>
      <meshStandardMaterial color="#3b82f6" wireframe={true} />
    </TorusKnot>
  );
};

const DevTimeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState("esp32");

  return (
    <div className="dev-time-container">
      <nav className="dev-sidebar">
        <div className="sidebar-header">
          <h2>Johan_Nerd_OS</h2>
          <span className="version">v3.1.0</span>
        </div>

        <ul className="nav-links">
          <li className="nav-category">Case Studies</li>
          <li
            className={activeTab === "esp32" ? "active" : ""}
            onClick={() => setActiveTab("esp32")}
          >
            ESP32 Health Monitor
          </li>
          <li
            className={activeTab === "workflow" ? "active" : ""}
            onClick={() => setActiveTab("workflow")}
          >
            Creative Workflow
          </li>

          <li className="nav-category mt-4">The Lab</li>
          <li
            className={activeTab === "sandbox" ? "active" : ""}
            onClick={() => setActiveTab("sandbox")}
          >
            C++ DSA Sandbox
          </li>
        </ul>

        <div className="sidebar-cta">
          <p>Ready to collaborate?</p>
          <button
            className="cta-btn outline"
            onClick={() => window.open("mailto:johan@example.com")}
          >
            Let's Build
          </button>
        </div>
      </nav>

      <main className="dev-content">
        {/* Constant Hero Area */}
        <header className="dev-hero">
          <div className="hero-text">
            <h1>Architecture &amp; Process</h1>
            <p className="doc-lead">
              A deep dive into how I think, build, troubleshoot, and bridge
              logic with creative direction.
            </p>
          </div>
          <div className="hero-3d">
            <Canvas camera={{ position: [0, 0, 4] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <SpinningShape />
              <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.5}
              />
            </Canvas>
          </div>
        </header>

        {activeTab === "esp32" && (
          <section className="doc-section fade-in">
            <h2>The ESP32 Real-Time Ecosystem</h2>
            <p>
              This isn't just a simple microcontroller project—it's a
              full-stack, distributed system designed for high reliability and
              zero-latency telemetry routing.
            </p>

            <h3>Hardware Schematics & Pipeline</h3>
            <div className="diagram-container">
              <div className="diagram-node hardware">ESP32 (C++)</div>
              <div className="diagram-arrow">➔</div>
              <div className="diagram-node highlight">FastAPI Gateway</div>
              <div className="diagram-arrow">➔</div>
              <div className="diagram-node">Celery/Redis</div>
              <div className="diagram-arrow">➔</div>
              <div className="diagram-node mobile">React Native App</div>
            </div>

            <h3>Backend Architecture</h3>
            <p>
              The FastAPI backend consumes an average of 10,000 UDP packets per
              second emitted by the ESP32 array over a local mesh network.
              Instead of writing directly to PostgreSQL, which would block the
              event loop, data is buffered in Redis and asynchronously flushed
              by Celery workers.
            </p>

            <p>To communicate with the mobile app synchronously:</p>
            <pre className="code-block">
              {`# The mobile app establishes a persistent connection
@app.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            # Redis pub/sub listener pushing directly to WS
            data = await redis_client.subscribe("telemetry_stream")
            await manager.broadcast(data)
    except WebSocketDisconnect:
        manager.disconnect(websocket)`}
            </pre>
          </section>
        )}

        {activeTab === "workflow" && (
          <section className="doc-section fade-in">
            <h2>Creative Workflow: Logic meets Art</h2>
            <p className="doc-lead">
              Applying software engineering principles to Color Grading and 3D
              Modeling.
            </p>

            <h3>Color Grading (DaVinci Resolve)</h3>
            <p>
              My grading pipeline is structured much like a functional program.
              I use a fixed node-tree architecture where every node represents a
              pure transformation.
            </p>
            <ul className="tech-list">
              <li>
                <strong>Node 1-3 (Prep):</strong> Noise reduction, CST (Color
                Space Transform) from Log to Rec.709, and balancing.
              </li>
              <li>
                <strong>Node 4-6 (Look):</strong> Contrast curves, Halation
                modeling, and creative LUTs.
              </li>
              <li>
                <strong>Node 7-9 (Finish):</strong> Film grain, sharpening, and
                final output CST.
              </li>
            </ul>
            <p>
              This strict node hierarchy ensures reproducibility across entirely
              different shots.
            </p>

            <h3>3D Modeling (Blender)</h3>
            <p>
              I use procedural generation via Geometry Nodes whenever possible.
              By treating vertices and faces as arrays to be manipulated by math
              operations, I can create infinitely scalable structures without
              destructive mesh editing.
            </p>
          </section>
        )}

        {activeTab === "sandbox" && (
          <section className="doc-section fade-in">
            <h2>The Lab: C++ DSA Snippets</h2>
            <p className="doc-lead">
              A collection of raw, optimized algorithms and data structures I've
              built for competitive programming and system-level efficiency.
            </p>

            <h3>Custom Memory Pool Allocator</h3>
            <p>
              Wrote this to bypass the overhead of standard <code>new</code> and{" "}
              <code>delete</code> during graph traversal algorithms on massive
              datasets.
            </p>
            <pre className="code-block cpp">
              {`template <typename T, size_t BlockSize = 4096>
class MemoryPool {
private:
    union Slot {
        T element;
        Slot* next;
    };
    
    Slot* currentBlock_;
    Slot* currentSlot_;
    Slot* lastSlot_;
    Slot* freeSlots_;
    
    // ... block allocation logic
public:
    template <typename... Args>
    T* allocate(Args&&... args) {
        if (freeSlots_ != nullptr) {
            Slot* result = freeSlots_;
            freeSlots_ = freeSlots_->next;
            return new (result) T(std::forward<Args>(args)...);
        }
        // Fallback to block allocation
    }
};`}
            </pre>
          </section>
        )}

        <section className="cta-footer">
          <a
            href="https://github.com/johan"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            GitHub Repository
          </a>
          <span className="divider">•</span>
          <a
            href="https://blog.johan.com"
            target="_blank"
            rel="noreferrer"
            className="footer-link"
          >
            Technical Blog
          </a>
        </section>
      </main>
    </div>
  );
};

export default DevTimeView;
