"use client";
import React, { useEffect, useState } from "react";
import CommonModal from "./CommonModal";
import { useDispatch, useSelector } from "react-redux";
import { calculateTotalPrice } from "@/redux/thunks/totalPriceThunk";
import { useTranslation } from "@/context/LanguageProvider";

const PriceDetailsModal = () => {
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);
  const [priceDetailsModalContent, setPriceDetailsModalContent] = useState("");
  const [translatedPackageName, setTranslatedPackageName] = useState("")
  const totalPrice = useSelector((state) => state.totalPrice);
  const openModal = (content) => {
    setPriceDetailsModalContent(content);
    setShowPriceDetailsModal(true);
  };
  const dispatch = useDispatch();
  const closeModal = () => {
    setShowPriceDetailsModal(false);
  };
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
  useEffect(() => {
    dispatch(calculateTotalPrice());
  }, [selectedCarDetails]);
  const selectedPackage = useSelector((state) => state.selectedPackage);
  const selectedAddons = useSelector((state) => state.selectedAddon);
  const {t, language} = useTranslation()


useEffect(()=>{
  if (selectedPackage.packageName ==="Basic Protection"){
    setTranslatedPackageName(t("basic_protection"))
  }
},[])
 
  return (
    <>
      <div>
        {/* <p>Total : 800</p> */}
        <p
          className="priceDetails mt-0 mb-0"
          onClick={() =>
            openModal(
              <>
                <p className="heading1">{t("price_details")}</p>
                <div className="section">
                  <p className="heading3">{t("rental_charges")}</p>
                  <div className="flex mb-0">
                    <p className="mb-0">
                      {numberOfRentalDays} {t("rental_days_x_aed")}{" "}
                      {selectedCarDetails.price}
                    </p>
                    <p className="m-0">
                      {numberOfRentalDays * selectedCarDetails.price}
                    </p>
                  </div>

                  {selectedAddons.map((addon, index) => {
                    return (
                      <div className="flex mb-0" key={index}>
                        <p className="mb-0">{addon.name}</p>
                        <p className="m-0">{addon.price}</p>
                      </div>
                    );
                  })}
                </div>
                
              {selectedPackage.packageName!==null &&  <div className="section">
                  <div className="flex">
                  <p className="mb-0">{t("protection_package")}</p>
                    {/* <p className="mb-0">{translatedPackageName}</p> */}
                    <p className="m-0">{selectedPackage.packagePrice}</p>
                  </div>
                </div>}

                {/* <div className="section">
                  <p className="heading3">{t("taxes_and_fees")}</p>
                  <div className="flex">
                    <p className="mb-0">{t("5%_vat")}</p>
                    <p className="m-0">200</p>
                  </div>
                </div> */}


                <div className="flex">
                  <p className="heading2 mb-0">{t("total")} ({t("incl_tax")})</p>
                  <p className="heading2 mb-0">{totalPrice}</p>
                </div>
              </>
            )
          }
        >
          {t("price_details")}
        </p>
      </div>
      <CommonModal
        show={showPriceDetailsModal}
        handleClose={closeModal}
        content={priceDetailsModalContent}
      />
    </>
  );
};

export default PriceDetailsModal;
