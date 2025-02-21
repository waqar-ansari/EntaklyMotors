"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import Link from "next/link";
import React, { useState } from "react";
import { colors } from "../../../../../public/colors/colors";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import "../../../../styles/inputFields.css";
import { Checkbox } from "rsuite";
import { IoInformationCircleSharp } from "react-icons/io5";
const page = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleCountryChange = (value, country) => {
    setCountryCode(`+${country.dialCode}`);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-5">
            <div className="d-flex justify-content-end align-items-center">
              <PriceDetailsModal />
              <Link
                href="/cars/offerCheckout/addons"
                className="mt-0"
                style={styles.nextButton}
              >
                Continue
              </Link>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            <div>
              <h3>Who will drive?</h3>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder="Company"
                id="company"
              />
              <label for="company" className="inputLabelBg">
                Company
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="First name"
                  id="firstName"
                />
                <label for="firstName" className="inputLabelBg">
                  First name
                </label>
              </div>
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Surname"
                  id="surname"
                />
                <label for="surname" className="inputLabelBg">
                  Surname
                </label>
              </div>
            </div>
            <div className="input-box form-floating mt-0">
              <input
                className="form-control"
                type="email"
                placeholder="Email"
                id="email"
              />
              <label for="email" className="inputLabelBg">
                Email
              </label>
            </div>
            <div
              className="d-flex align-items-center"
              style={{ marginBottom: 30 }}
            >
              <PhoneInput
                country={"ae"}
                value={""}
                inputStyle={{ display: "none" }}
                onChange={handleCountryChange}
                enableSearch
                searchPlaceholder="Search..."
                searchStyle={{ width: 280, marginLeft: 0 }}
              />
              <div style={{ margin: "0px 10px" }}>{countryCode}</div>

              <div className="input-box form-floating w-100 my-0">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Phone Number"
                  id="phoneNumber"
                  // value={`${countryCode} ${phoneNumber}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label for="phoneNumber" className="inputLabelBg">
                  Phone Number
                </label>
              </div>
            </div>
            <div>
              <Checkbox>I am 25 years of age or older</Checkbox>
              <div className="d-flex align-items-center mb-5 mt-3 ms-2">
                <IoInformationCircleSharp
                  style={{ fontSize: 20, marginRight: 20 }}
                />
                <p>
                  Drivers must have held their driver's license for at least 1
                  year(s) for this vehicle
                </p>
              </div>
            </div>
            <div>
              <h3>How would you like to pay?</h3>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder="Card number"
                id="cardNumber"
              />
              <label for="cardNumber" className="inputLabelBg">
              Card number
              </label>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder="Cardholder name"
                id="cardholderName"
              />
              <label for="cardholderName" className="inputLabelBg">
              Cardholder name
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Expiration date (MM/YY)"
                  id="expirationDate"
                />
                <label for="expirationDate" className="inputLabelBg">
                  Expiration date (MM/YY)
                </label>
              </div>
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="CVV"
                  id="cvv"
                />
                <label for="cvv" className="inputLabelBg">
                CVV
                </label>
              </div>
            </div>
            <div className="mt-4">
                <h3>
                What is your invoice address?
                </h3>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder="Street Address"
                id="streetAddress"
              />
              <label for="streetAddress" className="inputLabelBg">
              Street Address
              </label>
            </div>
            <div className="d-flex justify-content-between">
              <div
                className="input-box form-floating mt-0"
                style={{ width: "28%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="Zip Code"
                  id="zipCode"
                />
                <label for="zipCode" className="inputLabelBg">
                  Zip Code
                </label>
              </div>
              <div
                className="input-box form-floating mt-0"
                style={{ width: "68%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder="City"
                  id="city"
                />
                <label for="city" className="inputLabelBg">
                  City
                </label>
              </div>
            </div>
            {/* <div className="d-flex justify-content-between align-items-center">
                <span>Total</span>
                <span>1000 Aed</span>
            </div> */}
            <div className="mb-5"><PriceDetailsModal/></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
const styles = {
  nextButton: {
    backgroundColor: colors.themeMain,
    color: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    width: 200,
    padding: 10,
    fontSize: 16,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginTop: 15,
    marginLeft: 15,
  },
};
