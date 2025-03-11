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
          <div className="col-md-12 mt-5">
            <p style={styles.paraStyles}>
              Luxury Mercedes-Benz V-Class Rental with Chauffeur
            </p>
            <p style={styles.paraStyles} className="mb-5">
              Experience premium comfort and elegance with our Mercedes-Benz
              V-Class rental service with a professional driver. Whether for
              business trips, airport transfers, VIP events, or family travel,
              our luxury van ensures a smooth and stylish ride.
            </p>
            <div className="mb-5">
              <h4 className="mb-3">
                Why Choose Our V-Class Chauffeur Service?
              </h4>
              <ul style={{ listStyleType: "none" }}>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Spacious & Comfortable</span> –
                  Luxury seating for up to 7 passengers
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Professional Chauffeurs</span> –
                  Highly trained, English-speaking drivers
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Privacy & Convenience</span> –
                  Tinted windows, WiFi, and premium interiors
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Flexible Booking</span> – Hourly,
                  daily, or long-term rentals available
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Airport & Hotel Transfers</span> –
                  Hassle-free pick-up and drop-off
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}>Business & Leisure Travel</span> –
                  Ideal for corporate clients and families
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">Services Offered:</h4>
              <ul style={{ listStyleType: "none" }}>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> Airport Transfers</span> – VIP
                  service with meet & greet at arrivals
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> Business Travel</span> – Stylish
                  transport for executives & corporate events
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> City Tours & Sightseeing</span> –
                  Explore in luxury with a knowledgeable driver
                </li>
                <li style={styles.liStyle} className="liTick">
                  <span style={styles.bold}> Special Events & Weddings</span> –
                  Elegant chauffeur service for your big day
                </li>
              </ul>
            </div>
            <p style={styles.paraStyles}>
              Book your Mercedes-Benz V-Class with a chauffeur today and enjoy a
              first-class travel experience!
            </p>
            <div className=" mb-5">
              <Link
                href="/contactUs"
                className="text-decoration-none"
                style={styles.paraStyles}
              >
                Contact Us Now!
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
    fontSize: 16,
  },
  bold: {
    fontWeight: "bold",
  },
};
