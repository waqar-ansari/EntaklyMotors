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
import ar from "react-phone-input-2/lang/ar.json";
import ru from "react-phone-input-2/lang/ru.json";
import { Elements } from "@stripe/react-stripe-js";

const PaymentPage = () => {
  const [countryCode, setCountryCode] = useState("+971");
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [localUserId, setLocalUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const { t, language } = useTranslation();

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
  const profile = useSelector((state) => state.profile);
  useEffect(() => {
    if (profile) {
      if (profile.fullname) setFullName(profile.fullname);
      if (profile.email) setEmail(profile.email);
      if (profile.phonenumber?.number)
        setPhoneNumber(profile.phonenumber.number);
      if (profile.phonenumber?.countryCode)
        setCountryCode(profile.phonenumber.countryCode);
    }
  }, [profile]);
  const translatedBookingOverview = bookingOverview.map((item) => {
    if (item === "Free Cancellation") return t("free_cancellation");
    if (item === "Zero Deposit") return t("zero_deposit");
    if (
      item ===
        "200 km are included, each additional kilometer costs AED 0.65" ||
      item ===
        "Включено 200 км, каждый дополнительный километр стоит AED 0.65" ||
      item === "يشمل السعر 200 كم، كل كيلومتر إضافي يكلف 0.65 درهم إماراتي"
    )
      return t("200_km_included");
    if (
      item === "All Inclusive Protection - No excess" ||
      item === "حماية شاملة - لا تحمل ذاتي" ||
      item === "Защита Все включено - Без защиты"
    )
      return t("all_inclusive_protection_no_excess");
    if (
      item === "Basic Protection - Excess: up to AED3,000.00" ||
      item === "الحماية الأساسية - تحمل ذاتي: حتى ٣,٠٠٠ درهم" ||
      item === "Базовая защита - франшиза: до AED 3,000.00"
    )
      return t("basic_protection_excess_upto");
    if (
      item === "Additional Driver" ||
      item === "سائق إضافي" ||
      item === "Дополнительный водитель"
    )
      return t("additional_driver");
    if (
      item === "Smart Protection - No excess" ||
      item === "حماية ذكية بدون مبالغة" ||
      item === "Умная защита - без франшизы"
    )
      return t("smart_protection_no_excess");
    if (
      item === "Baby seat (0-18 kg / Group 0+/1)" ||
      item === "مقعد طفل (٠-١٨ كجم / المجموعة ٠+/١" ||
      item === "Детское сиденье (0-18 кг / Группа 0+/1)"
    )
      return t("baby_seat");
    if (
      item === "Roadside Protection" ||
      item === "Защита на дороге" ||
      item === "مساعدة على الطريق"
    )
      return t("roadside_protection");
    return item;
  });

  const totalPrice = useSelector((state) => state.totalPrice);

  const continueToPayment = async () => {
    setIsLoading(true);
    try {
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
      };

      const bookingResponse = await api.post(
        "/carbookingnew.php",
        bookingDetails
      );
console.log(bookingResponse,"booking response");

      if (bookingResponse.data.status === "error") {
        setIsLoading(false)
        return;
      }

      const bookingId = bookingResponse.data.booking_number;

      const stripe = await loadStripe(
        "pk_test_51R3XPNCvoTSNB6AOjILWKU5d9NGh1QFAu9OlTS7MKIMon5N3L1ZraqzwfDl01lpRq9vdhzUhmNy96wfSONS0yBrQ00iEBIMQAL"
      );

      const amount = totalPrice;

      const sessionData = new URLSearchParams();
      sessionData.append("payment_method_types[]", "card");
      sessionData.append("line_items[0][price_data][currency]", "aed");
      sessionData.append(
        "line_items[0][price_data][unit_amount]",
        (amount * 100).toString()
      );
      sessionData.append(
        "line_items[0][price_data][product_data][name]",
        "Custom Payment"
      );
      sessionData.append("line_items[0][quantity]", "1");
      sessionData.append("mode", "payment");

      sessionData.append(
        "success_url",
        `${window.location.origin}/booking/success?session_id={CHECKOUT_SESSION_ID}&booking_id=${bookingId}`
      );
      sessionData.append(
        "cancel_url",
        `${window.location.origin}/booking/paymentAndReview`
      );

      const response = await fetch(
        "https://api.stripe.com/v1/checkout/sessions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer sk_test_51R3XPNCvoTSNB6AOCZYZjMVY7HLur9TGtdqrWzBNO57Psfzbpnqya6YtWwW0r6nUDvaW8fBR1XsFXKN2vcihmYMf005Ukp7883`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: sessionData,
        }
      );

      const data = await response.json();

      if (!data.id) {
        setIsLoading(false)
        console.error("Session creation failed:", data);
        return;
      }

      const { error } = await stripe.redirectToCheckout({ sessionId: data.id });

      if (error) {
        console.error("Stripe redirect error:", error);
        setIsLoading(false)
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setIsLoading(false)
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
                value={fullname}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
                id="fullName"
                required
              />
              <label for="fullName" className="inputLabelBg">
                {t("full_name")}
              </label>
            </div>
            <div className="input-box form-floating mt-0">
              <input
                className="form-control"
                type="text"
                value={email}
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
                // value={""}
                value={countryCode}
                inputStyle={{ display: "none" }}
                onChange={handleCountryChange}
                enableSearch
                searchPlaceholder={t("search...")}
                searchStyle={{ width: 280, marginLeft: 0 }}
                localization={
                  language === "ar" ? ar : language === "ru" ? ru : undefined
                }
              />

              <div
                style={{ margin: "0px 10px" }}
                dir={language === "ar" ? "ltr" : "ltr"}
              >
                {countryCode}
              </div>

              <div className="input-box w-100 my-0">
                <input
                  className="form-control"
                  style={{ textAlign: language === "ar" ? "right" : "left" }}
                  type="number"
                  placeholder={t("phone_number")}
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
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
                  continueToPayment();
                }
                disabled = { isLoading };
              }}
              className="mt-0"
              style={{
                ...styles.payAndBookButton,
                pointerEvents: isChecked ? "auto" : "none",
                opacity: isChecked ? 1 : 0.5,
              }}
            >
              {isLoading ? (
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                t("continue_to_pay")
              )}
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
                {translatedBookingOverview.map((item, index) => {
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
