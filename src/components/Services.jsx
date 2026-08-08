import { motion } from "framer-motion";
import {
  GraduationCap,
  FileText,
  CreditCard,
  HeartPulse,
  Car,
  BriefcaseBusiness,
  ArrowUpRight
} from "lucide-react";

const services = [
  {
    icon: GraduationCap,
    title: "Scholarships",
    description: "Discover scholarships and understand eligibility requirements.",
    tag: "Education"
  },
  {
    icon: FileText,
    title: "Certificates",
    description: "Get guidance for income, domicile and other certificates.",
    tag: "Documents"
  },
  {
    icon: CreditCard,
    title: "PAN Services",
    description: "Understand PAN application and related documentation.",
    tag: "Finance"
  },
  {
    icon: HeartPulse,
    title: "Health Schemes",
    description: "Explore government healthcare programmes and benefits.",
    tag: "Healthcare"
  },
  {
    icon: Car,
    title: "Transport",
    description: "Get guidance for driving licence and transport services.",
    tag: "Transport"
  },
  {
    icon: BriefcaseBusiness,
    title: "Employment",
    description: "Explore government employment and skill opportunities.",
    tag: "Career"
  }
];

function Services() {
  return (
    <section className="services-section" id="services">

      <div className="section-container">

        <div className="section-heading">

          <div>
            <span className="section-label">
              GOVERNMENT SERVICES
            </span>

            <h2>
              One Saarthi.
              <span> Many Services.</span>
            </h2>
          </div>

          <p>
            Find the right government service without navigating
            through complicated portals and paperwork.
          </p>

        </div>

        <div className="services-grid">

          {services.map((service, index) => {

            const Icon = service.icon;

            return (
              <motion.div
                className="service-card"
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08
                }}
                whileHover={{ y: -6 }}
              >

                <div className="service-top">

                  <div className="service-icon">
                    <Icon size={24} />
                  </div>

                  <ArrowUpRight size={20} />

                </div>

                <span className="service-tag">
                  {service.tag}
                </span>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button>
                  Explore service →
                </button>

              </motion.div>
            );

          })}

        </div>

      </div>

    </section>
  );
}

export default Services;