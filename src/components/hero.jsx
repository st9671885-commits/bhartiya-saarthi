import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Languages,
  Sparkles
} from "lucide-react";

function Hero() {
  return (
    <section className="hero" id="home">

      <div className="hero-background">
        <div className="hero-orb orb-one"></div>
        <div className="hero-orb orb-two"></div>
      </div>

      <div className="hero-container">

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >

          <div className="trust-badge">
            <span className="badge-dot"></span>
            Built for Bharat • Accessible for Everyone
          </div>

          <h1>
            Government Services,
            <span> Made Simple.</span>
          </h1>

          <p>
            Bhartiya Saarthi helps citizens discover, understand,
            prepare, and track government services from one simple
            digital platform.
          </p>

          <div className="hero-buttons">

            <button className="primary-btn">
              Explore Services
              <ArrowRight size={18} />
            </button>

            <button className="secondary-btn">
              <MessageCircle size={18} />
              Ask Saarthi
            </button>

          </div>

          <div className="hero-features">

            <div>
              <FileCheck2 size={19} />
              <span>Smart Documents</span>
            </div>

            <div>
              <Sparkles size={19} />
              <span>AI Assistance</span>
            </div>

            <div>
              <Languages size={19} />
              <span>Multilingual</span>
            </div>

          </div>

        </motion.div>

        <motion.div
          className="hero-card-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <div className="hero-card">

            <div className="card-header">
              <div>
                <span>Welcome back</span>
                <h3>Your Government Journey</h3>
              </div>

              <div className="status-dot"></div>
            </div>

            <div className="readiness-card">

              <div className="readiness-circle">
                <strong>82%</strong>
                <small>Ready</small>
              </div>

              <div>
                <span>Application Readiness</span>
                <h4>Scholarship Application</h4>
                <p>3 of 4 requirements completed</p>
              </div>

            </div>

            <div className="mini-progress">
              <div></div>
            </div>

            <div className="document-list">

              <div className="document-item">
                <div className="document-icon success">
                  ✓
                </div>

                <div>
                  <strong>Aadhaar Card</strong>
                  <span>Verified</span>
                </div>
              </div>

              <div className="document-item">
                <div className="document-icon success">
                  ✓
                </div>

                <div>
                  <strong>Income Certificate</strong>
                  <span>Verified</span>
                </div>
              </div>

              <div className="document-item">
                <div className="document-icon warning">
                  !
                </div>

                <div>
                  <strong>Bank Passbook</strong>
                  <span>Action required</span>
                </div>
              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>
  );
}

export default Hero;