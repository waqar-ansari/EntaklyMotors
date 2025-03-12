"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import Link from "next/link";
import React, { useState } from "react";
import { colors } from "../../../../public/colors/colors";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import "../../../styles/inputFields.css";
import { Checkbox } from "rsuite";
import { IoInformationCircleSharp } from "react-icons/io5";
import Image from "next/image";
import "../../cars/cars.css";
import { FaShop } from "react-icons/fa6";
import { useSelector } from "react-redux";

const page = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleCountryChange = (value, country) => {
    setCountryCode(`+${country.dialCode}`);
  };
  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.abs(daysDifference); // Use Math.abs to get the absolute value in case the dates are reversed
  };
  const rentalDetail = useSelector((state) => state.rentalDetail);
  const numberOfRentalDays = calculateDaysBetween(
    rentalDetail.pickupDate,
    rentalDetail.returnDate
  );
const selectedCarDetail = useSelector((state)=>state.selectedCar)

 const totalPrice = useSelector((state) => state.totalPrice);
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-5 mobDisplayNone">
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p className="mb-0">Total: {totalPrice}</p>
                <PriceDetailsModal />
              </div>
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
                <p className="mb-0">
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
            {/* <div className="mt-4">
              <h3>What is your invoice address?</h3>
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
            </div> */}
            {/* <div className="d-flex justify-content-between align-items-center">
                <span>Total</span>
                <span>1000 Aed</span>
            </div> */}
            <div className="d-flex justify-content-between align-items-center">
              <h6>Total</h6>
              <h6>{totalPrice}</h6>
            </div>
            <div className="mb-5">
              <PriceDetailsModal />
            </div>
            <Link href="#" className="mt-0" style={styles.payAndBookButton}>
              Pay and Book
            </Link>
          </div>
          <div className="col-md-4">
            <div
              className="sticky-top"
              style={{
                top: "20px",
                backgroundColor: "#ebebf0",
                padding: 20,
                borderRadius: 10,
                marginBottom: 20,
              }}
            >
              <div className="d-flex align-items-center mb-5">
                <div className="reviewPageImageBg">
                  <Image
                    src={selectedCarDetail.image}
                    alt="visa"
                    width={92}
                    height={71}
                    // style={{ position: "absolute", top: 0, right: 0 }}
                  />
                </div>
                <div>
                  <div className="ms-2">
                    <h6 style={{ marginBottom: 5 }}>
                      {selectedCarDetail.name}
                    </h6>
                    <p style={{ marginBottom: 5, color: "#828287" }}>
                      or similar | CCAR
                    </p>
                    <p style={{ fontWeight: 600, marginBottom: 0 }}>
                      {numberOfRentalDays} Rental Days
                    </p>
                  </div>
                </div>
              </div>
              <div className="pickupAndReturn">
                <FaShop className="icon-top" />
                <div className="mb-2">
                  <p
                    style={{
                      color: "#828287",
                      marginBottom: 5,
                      fontWeight: 600,
                    }}
                  >
                    Pick-up
                  </p>
                  <h6 style={{ marginBottom: 5 }}>
                    {rentalDetail.pickupLocation}
                  </h6>
                  <p>
                    {rentalDetail.pickupDate} | {rentalDetail.pickupTime}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      color: "#828287",
                      marginBottom: 5,
                      fontWeight: 600,
                    }}
                  >
                    Return
                  </p>
                  <h6 style={{ marginBottom: 5 }}>
                    {rentalDetail.returnLocation}
                  </h6>
                  <p>
                    {rentalDetail.returnDate} | {rentalDetail.returnTime}
                  </p>
                </div>
                <FaShop className="icon-bottom" />
              </div>
              <hr className="hrStyle" />
              <h6 className="mb-3">Your Booking overview:</h6>
              <ul style={{ listStyleType: "none" }}>
                <li className="liTick">Third party insurance</li>
                <li className="liTick">
                  600 km are included, each additional kilometer costs AED 1.35
                </li>
                <li className="liTick">
                  Smart Protection (Minimum age 25) - No excess
                </li>
                <li className="liTick">
                  Booking option: Best price - Pay now, cancel and rebook for a
                  fee
                </li>
              </ul>
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
  payAndBookButton: {
    backgroundColor: colors.themeMain,
    color: colors.white,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    width: 300,
    padding: 10,
    fontSize: 16,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    marginBottom: 20,
    fontWeighr: 700,
  },
};
