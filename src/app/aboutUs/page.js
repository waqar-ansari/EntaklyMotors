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
          <div className="col-md-12 my-5">
            <p style={styles.paraStyles}>
              Your Trusted Partner in Car Rental, Export, and Sales
            </p>
            <p style={styles.paraStyles} className="mb-5">
              At ENTAKLY MOTORS, we specialize in providing premium car rental
              services, seamless vehicle exports, and hassle-free car sales.
              Based in Dubai, JBR we cater to both local and international
              clients, ensuring a smooth and reliable experience in the
              automotive industry.
            </p>
          </div>
          <div className="row">
            <h2 className="text-center mb-5">Our Services</h2>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">Car Rental:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                Short-term & long-term rentals
              </li>
              <li className="liTick" style={styles.liStyle}>
                Luxury, sports, and economy cars
              </li>
              <li className="liTick" style={styles.liStyle}>
                Chauffeur & self-drive options
              </li>
              <li className="liTick" style={styles.liStyle}>
                Corporate & individual leasing
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">Car Export:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                Global vehicle shipping
              </li>
              <li className="liTick" style={styles.liStyle}>
                Wide selection of new & pre-owned cars
              </li>
              <li className="liTick" style={styles.liStyle}>
                Hassle-free paperwork & logistics
              </li>
              <li className="liTick" style={styles.liStyle}>
                Competitive pricing & secure transactions
              </li>
            </ul>
          </div>
          <div className="col-md-4 mb-5">
            <h3 className="mb-4">Car Sales:</h3>
            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
              <li className="liTick" style={styles.liStyle}>
                New & used car sales
              </li>
              <li className="liTick" style={styles.liStyle}>
                Flexible financing & lease-to-own options
              </li>
              <li className="liTick" style={styles.liStyle}>
                Trade-in services available
              </li>
              <li className="liTick" style={styles.liStyle}>
                Quality-checked vehicles with warranty
              </li>
            </ul>
          </div>
        </div>
        <p style={styles.paraStyles} className="mb-5 mt-5">
          With a commitment to quality, affordability, and customer
          satisfaction, we make car ownership and rentals easier than ever.
          Whether you’re looking to rent a car for a day, buy your dream car, or
          export vehicles internationally, our over 10 years experienced
          specialists here to serve you.
        </p>
        <p style={styles.paraStyles} className="mb-5">
          <Link href="/contactUs" className="text-decoration-none">
            Contact us
          </Link>{" "}
          today to learn more!
        </p>
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
