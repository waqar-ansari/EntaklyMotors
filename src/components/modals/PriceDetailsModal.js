"use client";
import React, { useState } from "react";
import CommonModal from "./CommonModal";

const PriceDetailsModal = () => {
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);
  const [priceDetailsModalContent, setPriceDetailsModalContent] = useState("");

  const openModal = (content) => {
    setPriceDetailsModalContent(content);
    setShowPriceDetailsModal(true);
  };

  const closeModal = () => {
    setShowPriceDetailsModal(false);
  };
  return (
    <>
      <div>
        {/* <p>Total : 800</p> */}
        <p
          className="priceDetails mt-0 mb-0"
          onClick={() =>
            openModal(
              <>
                <p className="heading1">Price Details</p>
                <div className="section">
                  <p className="heading3">Rental charges</p>
                  <div className="flex mb-0">
                    <p className="mb-0">3 Rental days x AED 226.50</p>
                    <p className="m-0">200</p>
                  </div>
                </div>
                <div className="section">
                  <p className="heading3">Taxes and fees</p>
                  <div className="flex">
                    <p className="mb-0">Premium Location Fee</p>
                    <p className="m-0">200</p>
                  </div>
                  <div className="flex mb-0">
                    <p className="mb-0">Vehicle License Fee</p>
                    <p className="m-0">200</p>
                  </div>
                </div>
                <div className="flex">
                  <p className="heading2 mb-0">Total (incl. tax)</p>
                  <p className="heading2 mb-0">200</p>
                </div>
              </>
            )
          }
        >
          Price details
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
