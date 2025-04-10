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
import ar from 'react-phone-input-2/lang/ar.json'
import ru from 'react-phone-input-2/lang/ru.json'
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
  Elements,
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localUserId, setLocalUserId] = useState("");
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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
  const elements = useElements();
  const stripe = useStripe();

  // const makePayment = async () => {
  //   if (!stripe || !elements || !elements.getElement(PaymentElement)) {
  //     console.error("Stripe has not loaded yet.");
  //     return;
  //   }
  //   const { error: submitError } = await elements.submit();
  //   if (submitError) {
  //     setErrorMessage("submit error",submitError.message);
  //     return;
  //   }
  //   const res = await api.post("/payment_intent.php", { amount: totalPrice });
  //   console.log(res.data.intent.client_secret, "res from intent", totalPrice);
  //   const clientSecret = res.data.intent.client_secret;
  //   console.log("it is called after the intent");
  //   console.log(elements,"elementselements");

  //   const { error } = await stripe.confirmPayment({
  //     elements,
  //     clientSecret,
  //     confirmParams: {
  //       return_url: "/booking/success",
  //     },
  //   });
  //   if (error) {
  //     setErrorMessage("error from confirm payment",error.message);
  //   } else {
  //     console.log("success");
  //   }

  //   const bookingDetails = {
  //     userId: localUserId,
  //     carId: JSON.stringify(selectedCarDetail.id),
  //     name: fullname,
  //     email: email,
  //     phoneNumber: {
  //       countryCode: countryCode,
  //       number: phoneNumber,
  //     },
  //     pickupLocation: rentalDetail.pickupLocation,
  //     returnLocation: rentalDetail.returnLocation,
  //     pickupDate: new Date(rentalDetail.pickupDate).toISOString().split("T")[0],
  //     returnDate: new Date(rentalDetail.returnDate).toISOString().split("T")[0],
  //     pickupTime: rentalDetail.pickupTime,
  //     returnTime: rentalDetail.returnTime,
  //     protectionPackage: selectedPackageDetails.packageName,
  //     addons: selectedAddons,
  //     totalPrice: totalPrice,
  //   };
  //   const bookingData = {
  //     ...bookingDetails,
  //     paymentMethodId: paymentMethod.id,
  //   };
  //   console.log(bookingDetails, "booking details");
  //   console.log(bookingData, "bookingData");

  //   const paymentResponse = await api.post("/carbooking.php", bookingDetails);

  //   console.log(paymentResponse.data, "paymentIntent response");
  //   if (paymentResponse.data.status === "error") {
  //     console.log("error");
  //   } else {
  //     const bookingData = new URLSearchParams(paymentResponse.data).toString();
  //     router.replace(`/booking/success?${bookingData}`);
  //   }
  // };

  const makePayment = async () => {
    try {
      if (!stripe || !elements) {
        console.error("Stripe has not loaded yet.");
        return;
      }

      const cardElement = elements.getElement(CardNumberElement);
      if (!cardElement) {
        console.error("CardNumberElement is not available.");
        return;
      }
      const res = await api.post("/payment_intent.php", { totalPrice });

      const clientSecret = res?.data?.intent?.client_secret;
      const paymentIntentId = res?.data?.intent?.id;

      if (!clientSecret || !paymentIntentId) {
        console.error("Invalid PaymentIntent response:", res.data);
        return;
      }
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (error) {
        console.error("Error from confirmCardPayment:", error.message);
        setErrorMessage("Error from confirmCardPayment", error.message);
        return;
      }

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
        pickupDate: new Date(rentalDetail.pickupDate)
          .toISOString()
          .split("T")[0],
        returnDate: new Date(rentalDetail.returnDate)
          .toISOString()
          .split("T")[0],
        pickupTime: rentalDetail.pickupTime,
        returnTime: rentalDetail.returnTime,
        protectionPackage: selectedPackageDetails.packageName,
        addons: selectedAddons,
        totalPrice: totalPrice,
        paymentIntentId: paymentIntent.id,
        currency: "aed",
        status: paymentIntent.status,
      };

      const paymentResponse = await api.post("/carbooking.php", bookingDetails);

      if (paymentResponse.data.status === "error") {
        console.error("Error in booking:", paymentResponse.data);
      } else {

        const bookingData = new URLSearchParams(
          paymentResponse.data
        ).toString();

        router.replace(`/booking/success?${bookingData}`);
      }
    } catch (err) {
      console.error("Unexpected Error in makePayment:", err);
    }
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
                  {t("total")}: {totalPrice} {t("aed")}
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
                localization={language === "ar" ? ar : language === "ru" ? ru : undefined}
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

            <div className="payment-form">
              <div className="input-box form-floating mb-3">
                <div
                  className="form-control stripe-input"
                  style={{ backgroundColor: "#eee" }}
                >
                  <CardNumberElement
                    name="cardNumber"
                    options={{
                      showIcon: true,
                    }}
                  />
                </div>
                <label className="inputLabelBg">Card Number</label>
              </div>

              <div className="input-box form-floating mb-3">
                <div
                  className="form-control stripe-input"
                  style={{ backgroundColor: "#eee" }}
                >
                  <CardExpiryElement />
                </div>
                <label className="inputLabelBg">Expiry Date</label>
              </div>

              <div className="input-box form-floating mb-3">
                <div
                  className="form-control stripe-input"
                  style={{ backgroundColor: "#eee" }}
                >
                  <CardCvcElement
                    options={{
                      placeholder: "123",
                    }}
                  />
                </div>
                <label className="inputLabelBg">CVV</label>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <h6 className="fw-bold">{t("total")}</h6>
              <h6 className="fw-bold">
                {totalPrice} {t("aed")}
              </h6>
            </div>
            <div className="mb-5">
              <PriceDetailsModal />
            </div>
            <button
              // href={isChecked ? "" : "#"}
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
            </button>
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
                      {t("or_similar")}
                    </p>
                    <p style={{ fontWeight: 600, marginBottom: 0 }}>
                      {numberOfRentalDays} {t("rental_days")}
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

const page = () => {
  const options = {
    mode: "payment",
    amount: 100,
    currency: "aed",
  };

  const stripePromise = loadStripe(
    "pk_test_51R3XPNCvoTSNB6AOjILWKU5d9NGh1QFAu9OlTS7MKIMon5N3L1ZraqzwfDl01lpRq9vdhzUhmNy96wfSONS0yBrQ00iEBIMQAL"
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentPage />
    </Elements>
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