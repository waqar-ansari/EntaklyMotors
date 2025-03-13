"use client";
import React, { useState } from "react";
import { fonts } from "../../public/fonts/fonts";
import Toggle from "rsuite/Toggle";
import "rsuite/Toggle/styles/index.css";
import { useTranslation } from "@/context/LanguageProvider";

const AddonService = ({ icon, isActive, toggleActive, addonName, addonPrice }) => {
  const [showDetails, setShowDetails] = useState(false);
  const handleAddon = () => {
  };
  const handleDetailsClick = (event) => {
    setShowDetails(!showDetails);
    event.stopPropagation();
  };
  const {t,language} = useTranslation()
  const styles = {
    addonServiceContainer: {
      padding: 20,
      borderRadius: 10,
      boxShadow: "0 0 0 1px #ccc",
      marginBottom: 20,
      cursor: "pointer",
    },
    iconStyle: {
      fontSize: 20,
      marginRight: language === "ar" ? 0 : 20,
      marginLeft: language === "ar" ? 20 : 0, 
    },
    addonName: {
      fontSize: 16,
      fontFamily: fonts.helvetica400,
      fontWeight: 600,
    },
    addonDetails: {
      fontSize: 14,
      fontFamily: fonts.helvetica400,
      textDecoration: "underline",
      marginRight: language === "ar" ? 0 : 10,
      marginLeft: language === "ar" ? 10 : 0, 
    },
    addonPrice: {
      fontSize: 14,
      fontFamily: fonts.helvetica400,
      fontWeight: 600,
    },
    addonPriceUnit: {
      fontSize: 12,
      fontFamily: fonts.helvetica400,
      fontWeight: 500,
    },
    addonDetailsText: {
      padding: 20,
    },
    activeAddon: {
      boxShadow: "0 0 0 2px black",
      border: "0px",
    },
  };
  
  return (
    <div
      onClick={toggleActive}
      style={
        isActive
          ? { ...styles.addonServiceContainer, ...styles.activeAddon }
          : styles.addonServiceContainer
      }
    >
      <div className="d-flex w-100">
        <div style={styles.iconStyle}>{icon ? icon : null}</div>
        <div className="w-100">
          <div className="d-flex justify-content-between align-items-center">
            <p style={styles.addonName}>{addonName}</p>
            <div className="d-flex align-items-center justify-content-end">
              <p onClick={handleDetailsClick} style={styles.addonDetails}>
                {showDetails ? "Close Details" : "Details"}
              </p>
              <Toggle
                size="lg"
                checked={isActive}
                onChange={(newState) => toggleActive(newState)}
              />
            </div>
          </div>
          <p style={styles.addonPrice}>
          {addonPrice} AED<span style={styles.addonPriceUnit}>/day</span>
          </p>

          {showDetails && (
            <p style={styles.addonDetailsText}>this is addon detail</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonService;
