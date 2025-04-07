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
              At ENTAKLY MOTORS CAR RENTAL LLC, we strive to provide a seamless
              and transparent car rental experience. Below are our rental terms
              and conditions to ensure clarity and a smooth rental process.
            </p>
          </div>
          <div className="col-md-12">
            <div className="mb-5">
              <h5 className="mb-3">1. Eligibility Requirements</h5>
              <p style={styles.paraStyles} className="mb-3">
                To rent a vehicle, the customer must:
              </p>
              <ul>
                <li style={styles.liStyle}>
                  Be at least 21 years old (age may vary based on the car
                  category)
                </li>
                <li style={styles.liStyle}>
                  Hold a valid driving license (UAE or international)
                </li>
                <li style={styles.liStyle}>
                  Provide a valid passport & Emirates ID (for UAE residents) or
                  passport & visa (for tourists)
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">2. Rental Duration & Extensions</h5>
              <ul>
                <li style={styles.liStyle}>Minimum rental period: 24 hours</li>
                <li style={styles.liStyle}>
                  Rental is calculated on a 24-hour basis
                </li>
                <li style={styles.liStyle}>
                  Late returns beyond 2 hours will be charged an additional full
                  day’s rate
                </li>
                <li style={styles.liStyle}>
                  Extensions must be requested before the rental period expires
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">3. Insurance & Liability</h5>
              <ul>
                <li style={styles.liStyle}>
                  All vehicles come with basic insurance (as per UAE law)
                </li>
                <li style={styles.liStyle}>
                  Additional full insurance coverage is available at an extra
                  cost
                </li>
                <li style={styles.liStyle}>The renter is liable for:</li>
                <ul>
                  <li style={styles.liStyle}>
                    Any damage not covered by insurance
                  </li>
                  <li style={styles.liStyle}>
                    Traffic violations, toll fees (Salik), and parking fines
                  </li>
                  <li style={styles.liStyle}>
                    Loss of car accessories (keys, documents, etc.)
                  </li>
                </ul>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">4. Fuel Policy</h5>
              <ul>
                <li style={styles.liStyle}>
                  Vehicles are provided with a certain fuel level and must be
                  returned with the same level
                </li>
                <li style={styles.liStyle}>
                  If returned with less fuel, refueling charges will apply
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">5. Usage Restrictions</h5>
              <ul>
                <li style={styles.liStyle}>The car must not be used for:</li>
                <ul>
                  <li style={styles.liStyle}>
                    Off-roading, racing, or illegal activities
                  </li>
                  <li style={styles.liStyle}>
                    Transporting hazardous materials
                  </li>
                  <li style={styles.liStyle}>
                    Subletting or commercial use (unless agreed in contract)
                  </li>
                </ul>
                <li style={styles.liStyle}>
                  Driving outside the UAE requires written permission
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">6. Traffic Fines & Salik (Toll) Charges</h5>
              <ul>
                <li style={styles.liStyle}>
                  The renter is fully responsible for any traffic fines, Salik
                  (toll) charges, or parking violations
                </li>

                <li style={styles.liStyle}>
                  Charges will be deducted from the security deposit or billed
                  separately
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">7. Breakdown & Accidents</h5>
              <ul>
                <li style={styles.liStyle}>
                  In case of a breakdown, contact our 24/7 roadside assistance
                </li>

                <li style={styles.liStyle}>In the event of an accident:</li>
                <ul>
                  <li style={styles.liStyle}>
                    Call the police and obtain an official report
                  </li>

                  <li style={styles.liStyle}>
                    Inform our support team immediately
                  </li>
                  <li style={styles.liStyle}>
                    Repairs will only be done at authorized service centers
                  </li>
                </ul>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">8. Vehicle Return Policy</h5>
              <ul>
                <li style={styles.liStyle}>
                  The car must be returned to the agreed location & time
                </li>

                <li style={styles.liStyle}>
                  Any damages or additional charges will be assessed at return
                </li>
                <li style={styles.liStyle}>
                  {" "}
                  Failure to return the car on time without notice may result in
                  penalty fees
                </li>
              </ul>
            </div>
            <div className="mb-5">
              <h5 className="mb-3">9. Cancellation & Refund Policy</h5>
              <ul>
                <li style={styles.liStyle}>
                  Cancellations must be made at least 24 hours in advance
                </li>

                <li style={styles.liStyle}>
                  Last-minute cancellations may be subject to a cancellation fee
                </li>
                <li style={styles.liStyle}>No refunds for early returns</li>
              </ul>
            </div>
            <h6 style={styles.paraStyles} className="mb-5">
              By renting a car from ENTAKLY MOTORS CAR RENTAL LLC, you agree to
              these terms and conditions. For any clarifications, please
              <Link href="/contactUs" className="text-decoration-none">
                {" "}
                contact our customer support
              </Link>
            </h6>
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
