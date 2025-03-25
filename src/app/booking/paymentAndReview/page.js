"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { useTranslation } from "@/context/LanguageProvider";
import { selectBookingOverview } from "@/redux/slices/bookingOverviewSlice";
import {loadStripe} from '@stripe/stripe-js';
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";


const page = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [phoneNumber, setPhoneNumber] = useState("");

const router = useRouter();
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
  const selectedCarDetail = useSelector((state) => state.selectedCar);

  const bookingOverview = useSelector(selectBookingOverview);
  const totalPrice = useSelector((state) => state.totalPrice);
  const { t, language } = useTranslation();
  const makePayment=async()=>{

    router.push("/booking/success");

    console.log("make payment");
    
  //  const stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

  //  const body={

  //  }
  //   const response=await fetch('http://localhost:3001/payment',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify(body)
  //   })
  //   const session=await response.json();
  //   console.log(session);
  //   const result=await stripe.redirectToCheckout({
  //     sessionId:session.id
  //   })
  //   console.log(result);
  //   if(result.error){
  //     console.log(result.error.message);
  //   }
    
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-5 mobDisplayNone">
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p className="mb-0">
                  {t("total")}: {totalPrice}
                </p>
                <PriceDetailsModal />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-8">
            <div>
              <h3>{t("who_will_drive")}</h3>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder="Company"
                id="company"
              />
              <label for="company" className="inputLabelBg">
                {t("company")}
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
                  placeholder={t("first_name")}
                  id="firstName"
                />
                <label for="firstName" className="inputLabelBg">
                  {t("first_name")}
                </label>
              </div>
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder={t("surname")}
                  id="surname"
                />
                <label for="surname" className="inputLabelBg">
                  {t("surname")}
                </label>
              </div>
            </div>
            <div className="input-box form-floating mt-0">
              <input
                className="form-control"
                type="email"
                placeholder={t("email")}
                id="email"
              />
              <label for="email" className="inputLabelBg">
                {t("email")}
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
                  placeholder={t("phone_number")}
                  id="phoneNumber"
                  // value={`${countryCode} ${phoneNumber}`}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label for="phoneNumber" className="inputLabelBg">
                  {t("phone_number")}
                </label>
              </div>
            </div>
            <div>
              <Checkbox>{t("i_am_25_years_of_age")}</Checkbox>
              <div className="d-flex align-items-center mb-5 mt-3 ms-2">
                <IoInformationCircleSharp
                  style={{
                    fontSize: 20,
                    ...(language === "ar"
                      ? { marginLeft: 20 }
                      : { marginRight: 20 }),
                  }}
                />
                <p className="mb-0">{t("drivers_must_have_held")}</p>
              </div>
            </div>
            <div>
              <h3>{t("how_would_you_like_to_pay")}</h3>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder={t("card_number")}
                id="cardNumber"
              />
              <label for="cardNumber" className="inputLabelBg">
                {t("card_number")}
              </label>
            </div>
            <div className="input-box form-floating">
              <input
                className="form-control"
                type="text"
                placeholder={t("cardholder_name")}
                id="cardholderName"
              />
              <label for="cardholderName" className="inputLabelBg">
                {t("cardholder_name")}
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
                  placeholder={t("expiration_date")}
                  id="expirationDate"
                />
                <label for="expirationDate" className="inputLabelBg">
                  {t("expiration_date")}
                </label>
              </div>
              <div
                className="input-box form-floating mt-0"
                style={{ width: "48%" }}
              >
                <input
                  className="form-control"
                  type="text"
                  placeholder={t("cvv")}
                  id="cvv"
                />
                <label for="cvv" className="inputLabelBg">
                  {t("cvv")}
                </label>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h6>{t("total")}</h6>
              <h6>{totalPrice}</h6>
            </div>
            <div className="mb-5">
              <PriceDetailsModal />
            </div>
            <Link href="/booking/success" onClick={makePayment} className="mt-0" style={styles.payAndBookButton}>
              {t("pay_and_book")}
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
                    alt={selectedCarDetail.name}
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
                    {t("pick_up")}
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
                    {t("return")}
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
              <h6 className="mb-3">{t("booking_overview")}:</h6>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                {bookingOverview.map((item, index) => {
                  return (
                    <li className="liTick" key={index}>
                      {item}
                    </li>
                  );
                })}

                {/* <li className="liTick">
                  200 km are included, each additional kilometer costs AED 1.50
                </li>
                <li className="liTick">
                  Smart Protection (Minimum age 25) - No excess
                </li>
                <li className="liTick">
                  Booking option: Best price - Pay now, cancel and rebook for a
                  fee
                </li> */}
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
