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
  const [selectedPackage, setSelectedPackage] = useState("Basic Protection");

  // const basicPacageTicks = ["Loss Damage Waiver"];
  // const basicPackageCross = [
  //   "Tyre and Windscreen Protection",
  //   "Interior Protection",
  //   "Personal Accident Protection",
  //   "Roadside Protection",
  // ];
  // const goldPackageTicks = [
  //   "Loss Damage Waiver",
  //   "Tyre and Windscreen Protection",
  // ];
  // const goldPackageCross = [
  //   "Interior Protection",
  //   "Personal Accident Protection",
  //   "Roadside Protection",
  // ];
  // const platinumPackageTicks = [
  //   "Loss Damage Waiver",
  //   "Tyre and Windscreen Protection",
  //   "Interior Protection",
  //   "Personal Accident Protection",
  //   "Roadside Protection",
  // ];

  const packages = [
    {
      packageName: "Basic Protection",
      heading: "Basic Protection",
      packagePrice: 0,
      numberOfStars: "1",
      excessAmount: "3,000.00",
      overview:"Basic Protection - Excess: up to AED3,000.00",
      footer: "Included",
      packagePros: ["Loss Damage Waiver"],
      packageCons: [
        "Tyre and Windscreen Protection",
        "Interior Protection",
        "Personal Accident Protection",
        "Roadside Protection",
      ],
    },
    {
      packageName: "Smart Protection",
      heading: "Smart Protection",
      packagePrice: 40,
      extraInfo: "(Minimum age 25)",
      numberOfStars: "2",
      overview:"Smart Protection - No excess",
      footer: "40 Aed/day",
      discount: "-19% online discount",
      packagePros: ["Loss Damage Waiver", "Tyre and Windscreen Protection"],
      packageCons: [
        "Interior Protection",
        "Personal Accident Protection",
        "Roadside Protection",
      ],
    },
    {
      packageName: "All Inclusive Protection",
      heading: "All Inclusive Protection",
      extraInfo: "(Minimum age 25)",
      packagePrice: 80,
      overview:"All Inclusive Protection - No excess",
      numberOfStars: "3",
      footer: "80 Aed/day",
      discount: "-35% online discount",
      packagePros: [
        "Loss Damage Waiver",
        "Tyre and Windscreen Protection",
        "Interior Protection",
        "Personal Accident Protection",
        "Roadside Protection",
      ],
      packageCons: [],
    },
  ];


  const dispatch = useDispatch();
  const platinumPackageCross = [];
  const handlePackageClick = (packageName, packagePrice,overview) => {
    setSelectedPackage(packageName);

    console.log(overview,"overviewww");
    
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
    return Math.abs(numberOfDays);
  };

  const rentalDetails = useSelector((state) => state.rentalDetail);
  const selectedCarDetails = useSelector((state) => state.selectedCar);
  const numberOfRentalDays = calculateNumberOfDays(
    rentalDetails.pickupDate,
    rentalDetails.returnDate
  );
  const selectedPackagedetail = useSelector((state) => state.selectedPackage);
  // useEffect(() => {
  //   const defaultPackage = {
  //     packageName: "Basic",
  //     packagePrice: 0,
  //   };
  //   dispatch(setSelectedPackageSlice(defaultPackage));

  //   dispatch(calculateTotalPrice());
  // }, []);
  // const bookingOverview = useSelector((state) => state.selectBookingOverview);
  const bookingOverview = useSelector(selectBookingOverview);

  const { t, language } = useTranslation();
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
                <p className="mb-0">
                  {t("total")}: {totalPrice}
                </p>
                <PriceDetailsModal />
              </div>
              <Link
                href="/cars/offerCheckout/addons"
                className="mt-0"
                style={styles.nextButton}
              >
                Continue
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
                  // onPackageClick={handlePackageClick}
                  onPackageClick={() => handlePackageClick(
                    protectionsPackage.packageName,
                    protectionsPackage.packagePrice,
                    protectionsPackage.overview
                  )}
                  packagePros={protectionsPackage.packagePros}
                  packageCons={protectionsPackage.packageCons}
                />
              </div>
            );
          })}
          {/* <div className="col-md-4 mb-4 col-sm-6 col-12 d-flex">
            <OfferCheckoutCard
              packageName="Basic"
              heading="Basic Protection"
              packagePrice={0}
              numberOfStars="1"
              excessAmount="3,000.00"
              footer="Included"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              packagePros={basicPacageTicks}
              packageCons={basicPackageCross}
            />
          </div>
          <div className="col-md-4 mb-4 col-sm-6 col-12 d-flex">
            <OfferCheckoutCard
              packageName="Gold"
              heading="Smart Protection"
              packagePrice={40}
              extraInfo="(Minimum age 25)"
              numberOfStars="2"
              footer="40 Aed/day"
              discount="-19% online discount"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              packagePros={goldPackageTicks}
              packageCons={goldPackageCross}
            />
          </div>
          <div className="col-md-4 mb-4 col-sm-6 col-12 d-flex">
            <OfferCheckoutCard
              packageName="Platinum"
              heading="All Inclusive Protection"
              extraInfo="(Minimum age 25)"
              packagePrice={80}
              numberOfStars="3"
              footer="80 Aed/day"
              discount="-35% online discount"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              packagePros={platinumPackageTicks}
              packageCons={platinumPackageCross}
            />
          </div> */}
        </div>
        <div className="row mb-5">
          <div className="col-md-6">
            <h6 style={{ color: colors.black, fontFamily: fonts.helvetica700 }}>
              Your booking overview:
            </h6>
            <ul
              style={{ listStyleType: "none", paddingLeft: 0 }}
              className="bookingOverview"
            >
              {bookingOverview.map((item, index) => {
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
