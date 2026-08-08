function Footer() {
  return (
    <footer className="footer" id="about">

      <div className="footer-container">

        <div className="footer-brand">

          <div className="brand-logo">
            BS
          </div>

          <div>
            <h3>Bhartiya Saarthi</h3>
            <p>
              Your Smart Gateway to Government Services.
            </p>
          </div>

        </div>

        <div className="footer-links">

          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#how-it-works">How It Works</a>

        </div>

      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Bhartiya Saarthi
        </span>

        <span>
          Built for Bharat 🇮🇳
        </span>
      </div>

    </footer>
  );
}

export default Footer;