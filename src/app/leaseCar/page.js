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
              <h4 className="mb-3">Lease-to-Own Your Car in Just 2 Years with Only 20% Down Payment!</h4>
            </p>
            <p style={styles.paraStyles} className="mb-5">
              Are you looking for a simple and cost-effective solution to get
              your ideal vehicle? With our hassle-free lease-to-own option, you
              may drive your automobile right away and make reasonable payments
              over a 24-month period.
            </p>
            <div className="mb-5">
              <h4 className="mb-3">How It Operates:</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>Make a 20% down payment</span> – To
                  gain immediate access to your vehicle at a minimal initial
                  cost.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>Fixed Monthly Payments</span> – For
                  24 months, make reasonable installment payments.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>Ownership Transfer</span> – At the
                  end of the lease term, the car is 100% yours!
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">Why Pick Our Lease-to-Own Plan?</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>Short-Term Ownership: </span>Rather
                  than relying on long-term finance, you can own your car in as
                  little as two years.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> No Bank Financing Needed: </span> A
                  streamlined approval procedure without intricate loan
                  conditions.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> Flexible payment options: </span>
                  Include fixed monthly installments that can be adjusted to fit
                  your spending plan.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> Drive Your Car Right Away: </span>
                  Avoid lengthy wait times and get your vehicle on the road as
                  soon as possible!
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>All car models are eligible: </span>
                  There are many different new and used cars to choose from.
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h4 className="mb-3">Qualifications for Eligibility:</h4>
              <ul>
                <li style={styles.liStyle}>
                  <span style={styles.bold}> Minimum age: 21 </span>
                  cost.
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    {" "}
                    Current UAE driver's license (or its equivalent in another
                    country)
                  </span>
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    {" "}
                    Evidence of income or ownership of a business
                  </span>
                </li>
                <li style={styles.liStyle}>
                  <span style={styles.bold}>
                    UAE residency (for foreigners)
                  </span>
                </li>
              </ul>
            </div>
            <p style={styles.paraStyles}>This is the perfect option for individuals and businesses looking for a fast, reliable, and 
            cost-effective way to own a car.</p>
            <p style={styles.paraStyles}>Interested.
            </p>
            <p style={styles.paraStyles} className="mb-5"><Link href="/contactUs" className="text-decoration-none">Contact us</Link> today to get started!</p>

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
  bold: {
    fontWeight: "bold",
  },
};
