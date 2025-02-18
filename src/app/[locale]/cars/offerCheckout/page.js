"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState } from "react";
import "../../../../components/modals/commonModal.css";
import CommonModal from "@/components/modals/CommonModal";
import Link from "next/link";
import { colors } from "../../../../../public/colors/colors";
import { IoInformationCircleSharp } from "react-icons/io5";
import { IoStarSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { fonts } from "../../../../../public/fonts/fonts";

const page = () => {
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);
  const [priceDetailsModalContent, setPriceDetailsModalContent] = useState("");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const openModal = (content) => {
    setPriceDetailsModalContent(content);
    setShowPriceDetailsModal(true);
  };

  const closeModal = () => {
    setShowPriceDetailsModal(false);
  };
  const packageClicked = (item) => {
    setSelectedPackage(item);
  };
  return (
    <>
      <Header />
      <div className="container pt-5">
        <div className="row">
          <div className="col-12">
            <div className="d-flex justify-content-end align-items-center">
              <div>
                <p>Total : 800</p>
                <p
                  className="priceDetails mt-0"
                  onClick={() =>
                    openModal(
                      <>
                        <p className="heading1">Price Details</p>
                        <div className="section">
                          <p className="heading3">Rental charges</p>
                          <div className="flex mb-0">
                            <p>3 Rental days x AED 226.50</p>
                            <p className="m-0">200</p>
                          </div>
                        </div>
                        <div className="section">
                          <p className="heading3">Taxes and fees</p>
                          <div className="flex">
                            <p>Premium Location Fee</p>
                            <p className="m-0">200</p>
                          </div>
                          <div className="flex mb-0">
                            <p>Vehicle License Fee</p>
                            <p className="m-0">200</p>
                          </div>
                        </div>
                        <div className="flex">
                          <p className="heading2">Total (incl. tax)</p>
                          <p className="heading2">200</p>
                        </div>
                      </>
                    )
                  }
                >
                  Price details
                </p>
              </div>
              <Link href="" className="mt-0" style={styles.nextButton}>
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
        <div className="row d-flex align-items-stretch">
          <div
            className="col-md-4 mb-4"
            onClick={() => {
              packageClicked("Basic");
            }}
          >
            <div
              style={
                selectedPackage == "Basic"
                  ? { ...styles.cardContainer, ...styles.activePackage }
                  : styles.cardContainer
              }
            >
              <div>
                <div className="d-flex justify-content-between mb-3">
                  <span style={styles.cardHeading}>Basic Protection</span>
                  <div
                    style={
                      selectedPackage == "Basic"
                        ? { ...styles.radioButton, ...styles.activeRadio }
                        : styles.radioButton
                    }
                  ></div>
                </div>
                <div style={{ marginBottom: 10 }} className="mb-3">
                  <IoStarSharp />
                  <IoStarOutline />
                  <IoStarOutline />
                </div>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                  {" "}
                  Excess: up to AED 3,000.00
                </div>
              </div>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <div className="liContainer">
                  <li className="liTick">Loss Damage Waiver</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Tyre and Windscreen Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Interior Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Personal Accident Protection</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Roadside Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
              </ul>
              <p style={{ fontSize: 24, fontWeight: 600 }}>Included</p>
            </div>
          </div>
          <div
            className="col-md-4 mb-4"
            onClick={() => {
              packageClicked("Gold");
            }}
          >
            <div
              style={
                selectedPackage == "Gold"
                  ? { ...styles.cardContainer, ...styles.activePackage }
                  : styles.cardContainer
              }
            >
              <div className="d-flex justify-content-between mb-3">
                <span style={styles.cardHeading}>
                  Smart Protection (Minimum age 25)
                </span>
                <div
                  style={
                    selectedPackage == "Gold"
                      ? { ...styles.radioButton, ...styles.activeRadio }
                      : styles.radioButton
                  }
                ></div>
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                }}
                className="mb-3"
              >
                <div>
                  <IoStarSharp />
                  <IoStarSharp />
                  <IoStarOutline />
                </div>
                <div style={{ color: colors.themeMain, marginLeft: 15 }}>
                  <p
                    style={{
                      border: "1px solid #292268",
                      padding: "1px 10px",
                      borderRadius: 30,
                      fontFamily: fonts.helvetica700,
                    }}
                  >
                    -19% online discount
                  </p>
                </div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#3cc60c" }}>
                {" "}
                No excess
              </div>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <div className="liContainer">
                  <li className="liTick">Loss Damage Waiver</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liTick">Tyre and Windscreen Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Interior Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Personal Accident Protection</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liCross">Roadside Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
              </ul>
              <p style={{ fontSize: 24, fontWeight: 600 }}>
                50 <span style={{ fontSize: 14 }}>AED / Day</span>
              </p>
            </div>
          </div>
          <div
            className="col-md-4 mb-4"
            onClick={() => {
              packageClicked("Platinum");
            }}
          >
            <div
              style={
                selectedPackage == "Platinum"
                  ? { ...styles.cardContainer, ...styles.activePackage }
                  : styles.cardContainer
              }
            >
              <div className="d-flex justify-content-between mb-3">
                <span style={styles.cardHeading}>
                  All Inclusive Protection (Minimum age 25)
                </span>
                <div
                  style={
                    selectedPackage == "Platinum"
                      ? { ...styles.radioButton, ...styles.activeRadio }
                      : styles.radioButton
                  }
                ></div>
              </div>
              <div
                style={{
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                }}
                className="mb-3"
              >
                <div>
                  <IoStarSharp />
                  <IoStarSharp />
                  <IoStarSharp />
                </div>
                <div style={{ color: colors.themeMain, marginLeft: 15 }}>
                  <p
                    style={{
                      border: "1px solid #292268",
                      padding: "1px 10px",
                      borderRadius: 30,
                      fontFamily: fonts.helvetica700,
                    }}
                  >
                    -35% online discount
                  </p>
                </div>
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#3cc60c" }}>
                {" "}
                No excess
              </div>
              <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                <div className="liContainer">
                  <li className="liTick">Loss Damage Waiver</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liTick">Tyre and Windscreen Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liTick">Interior Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liTick">Personal Accident Protection</li>

                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
                <div className="liContainer">
                  <li className="liTick">Roadside Protection</li>
                  <Whisper
                    placement="left"
                    trigger="hover"
                    speaker={<Tooltip>Information Information</Tooltip>}
                  >
                    <IoInformationCircleOutline style={styles.iIcon} />
                  </Whisper>
                </div>
              </ul>
              <p style={{ fontSize: 24, fontWeight: 600 }}>
                75 <span style={{ fontSize: 14 }}>AED / Day</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CommonModal
        show={showPriceDetailsModal}
        handleClose={closeModal}
        content={priceDetailsModalContent}
      />
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
    cursor:"pointer",
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
