"use client";
import React, { useState } from "react";
import { IoStarSharp } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { IoInformationCircleOutline } from "react-icons/io5";
import Tooltip from "rsuite/Tooltip";
import Whisper from "rsuite/Whisper";
import "rsuite/Tooltip/styles/index.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { useTranslation } from "@/context/LanguageProvider";

const OfferCheckoutCard = ({
  heading,
  extraInfo,
  packageName,
  numberOfStars,
  excessAmount,
  footer,
  discount,
  onPackageClick,
  selectedPackage,
  packagePrice,
  packagePros = [],
  packageCons = [],
}) => {
  const [stars, setStars] = useState(numberOfStars);
const {t,language} = useTranslation()
  return (
    <div className="w-100 h-100" onClick={() => onPackageClick(packageName,packagePrice)}>
      <div
        style={
          selectedPackage === packageName
            ? { ...styles.cardContainer, ...styles.activePackage }
            : styles.cardContainer
        }
      >
        <div>
          <div className="d-flex justify-content-between mb-3">
           <div>
              <span style={styles.cardHeading}>{heading}</span>
              <br/>
              <span style={styles.extraInfo}>{extraInfo}</span>
           </div>

            <div
              style={
                selectedPackage === packageName
                  ? { ...styles.radioButton, ...styles.activeRadio }
                  : styles.radioButton
              }
            ></div>
          </div>
          <div style={{ marginBottom: 10 }} className="mb-3">
            {[...Array(3)].map((_, i) =>
              i < stars ? <IoStarSharp /> : <IoStarOutline />
            )}

            {discount && (
              <div
                style={{
                  color: colors.themeMain,
                  ...(language === "ar" ? { marginRight: 15 } : { marginLeft: 15 }),
                  display: "inline-block",
                  alignItems: "center",
                }}
                className="mb-3"
              >
                <p
                  style={{
                    border: "1px solid #292268",
                    padding: "1px 10px",
                    borderRadius: 30,
                    fontFamily: fonts.helvetica700,
                  }}
                >
                  {discount}
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              fontWeight: 600,
              fontSize: 14,
              color: excessAmount ? "inherit" : "#3cc60c",
            }}
          >
            {" "}
            {excessAmount ? `Excess: up to AED ${excessAmount}` : "No Excess"}
          </div>
        </div>
        <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
          {packagePros.map((item, index) => {
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
          {packageCons.map((item, index) => {
            return (
              <div className="liContainer" key={index}>
                <li className="liCross">{item}</li>
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
        <p style={{ fontSize: 24, fontWeight: 600 }}>{footer}</p>
      </div>
    </div>
  );
};

export default OfferCheckoutCard;

const styles = {
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
  extraInfo: {
    fontSize: 20,
    color: colors.grey,
    fontWeight: 600,
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
    flex: "0 0 auto",
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
