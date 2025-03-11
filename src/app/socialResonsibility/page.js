import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { fonts } from "../../../public/fonts/fonts";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-12 mt-5">
            <p className="mb-5" style={styles.paraStyles}>
              At ENTAKLY MOTORS CAR RENTAL LLC, we believe that corporate
              responsibility goes beyond just providing high-quality car rental
              services. We are committed to ethical business practices,
              environmental sustainability, and community engagement, ensuring
              that our operations contribute positively to society
            </p>
            <h3 className="mb-5">Our Corporate Responsibility Commitments</h3>
            <div className="mb-5">
              <h5 className="mb-4">1. Environmental Sustainability</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>Eco-Friendly Fleet:</span>{" "}
                  Investing in hybrid & electric vehicles to reduce carbon
                  emissions.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    Sustainable Practices:
                  </span>
                  Implementing paperless contracts, digital invoicing, and
                  energy-efficient facilities.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>Responsible Disposal:</span>
                  Responsible Disposal: Ensuring eco-friendly recycling of
                  vehicle parts and materials.
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">2. Customer Safety & Satisfaction</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Regular Vehicle Maintenance:
                  </span>{" "}
                  Ensuring all cars meet safety and quality standards.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    24/7 Roadside Assistance:
                  </span>
                  Providing immediate support in case of emergencies.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    {" "}
                    Transparent Pricing & Policies:
                  </span>
                  No hidden charges, ensuring fair business practices.
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">
                3. Community Engagement & Social Initiatives
              </h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Employment Opportunities:
                  </span>{" "}
                  Supporting local talent and fair employment policies.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Charity & Sponsorships:
                  </span>
                  Partnering with organizations for community development & road
                  safety awareness.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Accessible Mobility Solutions:
                  </span>
                  Offering affordable rental options for people with special
                  needs.
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-4">4. Ethical Business Practices</h5>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Fair & Inclusive Workplace:
                  </span>{" "}
                  Promoting diversity, equal opportunities, and fair wages.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Compliance & Integrity:
                  </span>
                  Adhering to local laws and international business standards.
                </li>
                <li className="liTick" style={styles.liStyle}>
                  <span style={{ fontWeight: 600 }}>
                    Data Privacy & Security:
                  </span>
                  Ensuring customer data protection and secure transactions.
                </li>
              </ul>
            </div>
            <p className="mb-4" style={styles.paraStyles}>
              At ENTAKLY MOTORS CAR RENTAL LLC, we are dedicated to making a
              difference while delivering exceptional car rental services. Our
              commitment to sustainability, safety, and ethical business defines
              who we are.
            </p>
            <div className="mb-5">
                <Link href="/contactUs" className=" text-decoration-none" style={styles.paraStyles}>
                Contact Us to Learn More!
                </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
const styles = {
  paraStyles: {
    fontFamily: fonts.helvetica400,
    fontSize: 16,
  },
  liStyle: {
    marginBottom: 10,
    fontFamily: fonts.helvetica400,
  },
};
