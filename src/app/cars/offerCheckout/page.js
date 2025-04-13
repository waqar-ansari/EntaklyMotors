"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import "../../../components/modals/commonModal.css";
import Link from "next/link";
import { colors } from "../../../../public/colors/colors";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { fonts } from "../../../../public/fonts/fonts";
import OfferCheckoutCard from "@/components/OfferCheckoutCard";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPackageSlice } from "@/redux/slices/selectedPackageSlice";
import { calculateTotalPrice } from "@/redux/thunks/totalPriceThunk";
import { useTranslation } from "@/context/LanguageProvider";
import { clearSelectedAddons } from "@/redux/slices/selectedAddonSlice";
import { selectBookingOverview, setPackageBookingOverview } from "@/redux/slices/bookingOverviewSlice";

const page = () => {
  const { t, language } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState();

  const packages = [
    {
      packageName: t("basic_protection"),
      heading: t("basic_protection"),
      packagePrice: 0,
      numberOfStars: "1",
      excessAmount: "3,000.00",
      overview: t("basic_protection_excess_upto"),
      footer: t("included"),
      packagePros: [t("loss_damage_waiver")],
      packageCons: [
        t("tyre_and_windscreen_protection"),
        t("interior_protection"),
        t("personal_accident_protection"),
        t("roadside_protection"),
      ],
    },
    {
      packageName: t("smart_protection"),
      heading: t("smart_protection"),
      packagePrice: 40,
      extraInfo: "(Minimum age 25)",
      numberOfStars: "2",
      overview:t("smart_protection_no_excess"),
      footer: "40" + t("aed/day"),
      discount: "-19% " + t("online_discount"),
      packagePros: [t("loss_damage_waiver"),  t("tyre_and_windscreen_protection")],
      packageCons: [
        t("interior_protection"),
        t("personal_accident_protection"),
        t("roadside_protection"),
      ],
    },
    {
      packageName: t("all_inclusive_protection"),
      heading: t("all_inclusive_protection"),
      extraInfo: "(Minimum age 25)",
      packagePrice: 80,
      overview:t("all_inclusive_protection_no_excess"),
      numberOfStars: "3",
      footer: "80" + t("aed/day"),
      discount: "-35% online discount",
      packagePros: [
        t("loss_damage_waiver"),
         t("tyre_and_windscreen_protection"),
        t("interior_protection"),
        t("personal_accident_protection"),
        t("roadside_protection"),
      ],
      packageCons: [],
    },
  ];


  const dispatch = useDispatch();
  const handlePackageClick = (packageName, packagePrice,overview) => {
    setSelectedPackage(packageName);
    
    dispatch(setPackageBookingOverview([`${overview}`]));
    dispatch(setSelectedPackageSlice({ packageName, packagePrice }));
  };
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [selectedPackage]);
  useEffect(() => {
    dispatch(clearSelectedAddons());
    dispatch(setPackageBookingOverview([]))
  }, []);

  useEffect(() => {
    const defaultPackage = packages.find(pkg => pkg.packageName === "Basic");
  
    if (defaultPackage) {
      dispatch(setPackageBookingOverview([defaultPackage.overview]));
      dispatch(setSelectedPackageSlice({
        packageName: defaultPackage.packageName,
        packagePrice: defaultPackage.packagePrice,
      }));
    }
  }, [dispatch]);
  const totalPrice = useSelector((state) => state.totalPrice);
  const calculateNumberOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const numberOfDays = timeDifference / (1000 * 3600 * 24);
    return numberOfDays === 0 ? 1 : Math.abs(numberOfDays);
  };

  const rentalDetails = useSelector((state) => state.rentalDetail);
  const selectedCarDetails = useSelector((state) => state.selectedCar);
  const numberOfRentalDays = calculateNumberOfDays(
    rentalDetails.pickupDate,
    rentalDetails.returnDate
  );
  const selectedPackagedetail = useSelector((state) => state.selectedPackage);
  const bookingOverview = useSelector(selectBookingOverview);
  const translatedBookingOverview = bookingOverview.map(item => {
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
      item === "Roadside Protection" ||
      item === "Защита на дороге" ||
      item === "مساعدة على الطريق"
    )
      return t("roadside_protection");
    return item;
  });
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
      marginLeft: language === "ar" ? 0 : 15,
      marginRight: language === "ar" ? 15 : 0,
    },
    cardContainer: {
      cursor: "pointer",
      boxShadow: "0 0 0 1px #ccc",
      borderRadius: 10,
      padding: 16,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    cardHeading: {
      fontSize: 24,
      color: colors.lightBlack,
      fontWeight: 700,
    },
    radioButton: {
      width: 20,
      height: 20,
      borderRadius: 10,
      border: "1px solid #ccc",
      marginLeft: 20,
      flex: "0 0 auto",
    },
    iIcon: {
      fontSize: 18,
    },
    activePackage: {
      boxShadow: "0 0 0 2px black",
      border: "0px",
    },
    activeRadio: {
      boxSizing: "border-box",
      border: "5px solid #000",
    },
  };
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-between justify-content-sm-end align-items-center mb-md-4 mb-2">
              <div>
                <p className="mb-0 fw-bold">
                  {t("total")}: {totalPrice} {t("aed")}
                </p>
                <PriceDetailsModal />
              </div>
              <Link
                // href="/cars/offerCheckout/addons"
                href={selectedPackage ? "/cars/offerCheckout/addons" : "#"}
                className={`mt-0 ${!selectedPackage ? "pointer-events-none opacity-50 cursor-not-allowed" : ""}`}
                style={styles.nextButton}
              >
                {t("continue")}
              </Link>
            </div>
            <div className="d-flex align-items-center mb-md-5 mb-4">
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
        </div>
        <div className="row mb-5">
          {packages.map((protectionsPackage, index) => {
            return (
              <div className="col-md-4 mb-4 col-sm-6 col-12 d-flex" key={index}>
                <OfferCheckoutCard
                  packageName={protectionsPackage.packageName}
                  heading={protectionsPackage.heading}
                  packagePrice={protectionsPackage.packagePrice}
                  numberOfStars={protectionsPackage.numberOfStars}
                  excessAmount={protectionsPackage.excessAmount}
                  footer={protectionsPackage.footer}
                  selectedPackage={selectedPackage}
                  onPackageClick={() => handlePackageClick(
                    protectionsPackage.packageName,
                    protectionsPackage.packagePrice,
                    protectionsPackage.overview
                  )}
                  packagePros={protectionsPackage.packagePros}
                  packageCons={protectionsPackage.packageCons}
                  // discount={protectionsPackage.discount}
                />
              </div>
            );
          })}
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <h6 style={{ color: colors.black, fontFamily: fonts.helvetica700 }}>
              {t("your_booking_overview")}
            </h6>
            <ul
              style={{ listStyleType: "none", paddingLeft: 0 }}
              className="bookingOverview"
            >
              {translatedBookingOverview.map((item, index) => {
                return (
                  <div className="liContainer" key={index}>
                    <li className="liTick">{item}</li>
                    {/* <Whisper
                      placement="left"
                      trigger="hover"
                      speaker={<Tooltip>Information Information</Tooltip>}
                    >
                      <IoInformationCircleOutline style={styles.iIcon} />
                    </Whisper> */}
                  </div>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default page;
