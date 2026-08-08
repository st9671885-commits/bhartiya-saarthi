import { motion } from "framer-motion";
import {
  Search,
  Upload,
  CheckCircle2,
  Send
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell Saarthi",
    description: "Describe the government service you need in simple words."
  },
  {
    number: "02",
    icon: Upload,
    title: "Prepare Documents",
    description: "Upload documents and let Saarthi organize your requirements."
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Verify & Complete",
    description: "Check your readiness and complete the guided application."
  },
  {
    number: "04",
    icon: Send,
    title: "Track Progress",
    description: "Keep track of your application status from one dashboard."
  }
];

function HowItWorks() {
  return (
    <section className="how-section" id="how-it-works">

      <div className="section-container">

        <div className="section-heading centered">

          <span className="section-label">
            SIMPLE BY DESIGN
          </span>

          <h2>
            From confusion to
            <span> completion.</span>
          </h2>

          <p>
            Four simple steps to navigate government services
            with confidence.
          </p>

        </div>

        <div className="steps-grid">

          {steps.map((step, index) => {

            const Icon = step.icon;

            return (
              <motion.div
                className="step-card"
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}
              >

                <span className="step-number">
                  {step.number}
                </span>

                <div className="step-icon">
                  <Icon size={25} />
                </div>

                <h3>{step.title}</h3>

                <p>{step.description}</p>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default HowItWorks;