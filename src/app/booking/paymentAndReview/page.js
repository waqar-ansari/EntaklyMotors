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
import { loadStripe } from "@stripe/stripe-js";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import api from "@/app/api/axiosInstance";

const page = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localUserId, setLocalUserId] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const handleCountryChange = (value, country) => {
    setCountryCode(`+${country.dialCode}`);
  };

  useEffect(() => {
    setLocalUserId(localStorage.getItem("userId"));
  }, [localUserId]);

  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.abs(daysDifference);
  };
  const rentalDetail = useSelector((state) => state.rentalDetail);
  const selectedPackageDetails = useSelector((state) => state.selectedPackage);
  const selectedAddonDetails = useSelector((state) => state.selectedAddon);

  const selectedAddons = selectedAddonDetails.map((item) => item.name);

  const numberOfRentalDays = calculateDaysBetween(
    rentalDetail.pickupDate,
    rentalDetail.returnDate
  );
  const selectedCarDetail = useSelector((state) => state.selectedCar);

  const bookingOverview = useSelector(selectBookingOverview);
  const totalPrice = useSelector((state) => state.totalPrice);
  const { t, language } = useTranslation();
  const makePayment = async () => {
    const bookingDetails = {
      userId: localUserId,
      carId: JSON.stringify(selectedCarDetail.id),
      name: fullname,
      email: email,
      phoneNumber: {
        countryCode: countryCode,
        number: phoneNumber,
      },
      pickupLocation: rentalDetail.pickupLocation,
      returnLocation: rentalDetail.returnLocation,
      pickupDate: new Date(rentalDetail.pickupDate).toISOString().split("T")[0],
      returnDate: new Date(rentalDetail.returnDate).toISOString().split("T")[0],
      pickupTime: rentalDetail.pickupTime,
      returnTime: rentalDetail.returnTime,
      protectionPackage: selectedPackageDetails.packageName,
      addons: selectedAddons,
      totalPrice: totalPrice,
    };
    console.log(bookingDetails, "booking details");

    const response = await api.post("carbooking.php", bookingDetails);
    console.log(response.data, "response after booking");

    // router.push("/booking/success");

    const bookingData = new URLSearchParams(response.data).toString();
    router.push(`/booking/success?${bookingData}`);

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
  };
  const handleCheckboxChange = (value, checked) => {
    setIsChecked(checked);
  };
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12 pt-5 mobDisplayNone">
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p className="mb-0 fw-bold">
                  {t("total")}: {totalPrice} AED
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
            <div className="input-box form-floating mt-0">
              <input
                className="form-control"
                type="text"
                placeholder={t("full_name")}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                id="fullName"
              />
              <label for="fullName" className="inputLabelBg">
                {t("full_name")}
              </label>
            </div>

            <div className="input-box form-floating mt-0">
              <input
                className="form-control"
                type="email"
                placeholder={t("email")}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
              <Checkbox onChange={handleCheckboxChange}>
                {t("i_am_25_years_of_age")}
              </Checkbox>
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
              <h6 className="fw-bold">{t("total")}</h6>
              <h6 className="fw-bold">{totalPrice} {t("aed")}</h6>
            </div>
            <div className="mb-5">
              <PriceDetailsModal />
            </div>
            {/* <Link
              href="/booking/success"
              onClick={makePayment}
              className="mt-0"
              style={styles.payAndBookButton}
            >
              {t("pay_and_book")}
            </Link> */}
            <Link
              href={isChecked ? "/booking/success" : "#"}
              onClick={(e) => {
                if (!isChecked) {
                  e.preventDefault();
                } else {
                  makePayment();
                }
              }}
              className="mt-0"
              style={{
                ...styles.payAndBookButton,
                pointerEvents: isChecked ? "auto" : "none",
                opacity: isChecked ? 1 : 0.5,
              }}
            >
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
                    src={`https://admin.entaklymotors.com/storage/${selectedCarDetail.image}`}
                    alt={selectedCarDetail.name}
                    width={92}
                    height={71}
                    unoptimized
                    // style={{ position: "absolute", top: 0, right: 0 }}
                  />
                </div>
                <div>
                  <div className="ms-2">
                    <h6 style={{ marginBottom: 5 }}>
                      {selectedCarDetail.name}
                    </h6>
                    <p style={{ marginBottom: 5, color: "#828287" }}>
                      or similar
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
