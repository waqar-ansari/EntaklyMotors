"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import "../../../../components/modals/commonModal.css";
import Link from "next/link";
import { colors } from "../../../../../public/colors/colors";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { fonts } from "../../../../../public/fonts/fonts";
import OfferCheckoutCard from "@/components/OfferCheckoutCard";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";

const page = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const basicPacageTicks = ["Loss Damage Waiver"];
  const basicPackageCross = [
    "Tyre and Windscreen Protection",
    "Interior Protection",
    "Personal Accident Protection",
    "Roadside Protection",
  ];
  const goldPackageTicks = [
    "Loss Damage Waiver",
    "Tyre and Windscreen Protection",
  ];
  const goldPackageCross = [
    "Interior Protection",
    "Personal Accident Protection",
    "Roadside Protection",
  ];
  const platinumPackageTicks = [
    "Loss Damage Waiver",
    "Tyre and Windscreen Protection",
    "Interior Protection",
    "Personal Accident Protection",
    "Roadside Protection",
  ];
  const platinumPackageCross = [];
  const handlePackageClick = (packageName) => {
    setSelectedPackage(packageName);
  };
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p>Total: 800</p>
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

            <div className="d-flex align-items-center mb-5">
              <IoInformationCircleSharp
                style={{ fontSize: 20, marginRight: 20 }}
              />
              <p>
                Drivers must have held their driver's license for at least 1
                year(s) for this vehicle
              </p>
            </div>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4 mb-4 d-flex">
            <OfferCheckoutCard
              packageName="Basic"
              heading="Basic Protection"
              numberOfStars="1"
              excessAmount="3,000.00"
              footer="Included"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              liTicks={basicPacageTicks}
              liCross={basicPackageCross}
            />
          </div>
          <div className="col-md-4 mb-4 d-flex">
            <OfferCheckoutCard
              packageName="Gold"
              heading="Smart Protection"
              extraInfo="(Minimum age 25)"
              numberOfStars="2"
              footer="30 Aed/day"
              discount="-19% online discount"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              liTicks={goldPackageTicks}
              liCross={goldPackageCross}
            />
          </div>
          <div className="col-md-4 mb-4 d-flex">
            <OfferCheckoutCard
              packageName="Platinum"
              heading="All Inclusive Protection"
              extraInfo="(Minimum age 25)"
              numberOfStars="3"
              footer="60 Aed/day"
              discount="-35% online discount"
              selectedPackage={selectedPackage}
              onPackageClick={handlePackageClick}
              liTicks={platinumPackageTicks}
              liCross={platinumPackageCross}
            />
          </div>
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
              <div className="liContainer">
                <li className="liTick">Third party insurance</li>
                <Whisper
                  placement="left"
                  trigger="hover"
                  speaker={<Tooltip>Information Information</Tooltip>}
                >
                  <IoInformationCircleOutline style={styles.iIcon} />
                </Whisper>
              </div>
              <div className="liContainer">
                <li className="liTick">
                  Loss Damage Waiver up to AED 3,000.00 financial responsibility
                </li>
              </div>
              <div className="liContainer">
                <li className="liTick">
                  600 km are included, each additional kilometer costs AED 1.35
                </li>
                <Whisper
                  placement="left"
                  trigger="hover"
                  speaker={<Tooltip>Information Information</Tooltip>}
                >
                  <IoInformationCircleOutline style={styles.iIcon} />
                </Whisper>
              </div>
              <div className="liContainer">
                <li className="liTick">
                  Booking option: Best price - Pay now, cancel and rebook for a
                  fee
                </li>
              </div>
            </ul>
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
