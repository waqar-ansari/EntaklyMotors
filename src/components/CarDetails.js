"use client";
import "../app/[locale]/cars/cars.css";
import { FaUser, FaSuitcase, FaShoppingBag, FaDoorOpen } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import { IoInformationCircleOutline } from "react-icons/io5";
import { FaRegIdCard } from "react-icons/fa";
import { fonts } from "../../public/fonts/fonts";
import { colors } from "../../public/colors/colors";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import CommonModal from "./modals/CommonModal";
import { useState } from "react";
// import "../styles/globals.css";

export default function CarDetails({ car, onClose }) {
  const [showBestPriceModal, setShowBestPriceModal] = useState(false);
  const [showPriceDetailsModal, setShowPriceDetailsModal] = useState(false);
  const [bestPriceModalContent, setBestPriceModalContent] = useState("");
  const [priceDetailsModalContent, setPriceDetailsModalContent] = useState("");
  const openModal = (content) => {
    setBestPriceModalContent(content);
    setShowBestPriceModal(true);
  };

  const closeModal = () => {
    setShowBestPriceModal(false);
    setShowPriceDetailsModal(false);
  };
  return (
    <div className="carDetails">
      {/* Left Side - Car Image & Info Overlay */}
      <div className="carImageContainer">
        <div className="carDetailsOverlay">
          <div className="ms-4 mt-3">
            <h2 className="carTitle">MIDSIZE ({car.name})</h2>
            <p className="carSubtitle">or similar | Saloon</p>
          </div>
          <div>
            <Image
              src={car.image}
              className="carDetailsImage"
              alt={car.name}
              width={752}
              height={500}
              layout="responsive"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div className="carIcons" style={styles.carDetailsFacilities}>
              <span>
                <FaUser style={styles.iconStyles} /> 5 Seats
              </span>
              <span>
                <FaSuitcase style={styles.iconStyles} /> 2 Suitcase(s)
              </span>
              <span>
                <FaShoppingBag style={styles.iconStyles} /> 1 Bag(s)
              </span>
              <span>
                <TbAutomaticGearbox style={styles.iconStyles} /> Automatic
              </span>
              <span>
                <FaDoorOpen style={styles.iconStyles} /> 4 Doors
              </span>
            </div>
            <div className="text-center">
              <p>
                <FaRegIdCard style={styles.iconStyles} /> Minimum age of the
                youngest driver : 18
              </p>
            </div>
          </div>
        </div>
        {/* <img src={car.image} alt={car.name} className="carDetailsImage" /> */}
      </div>

      <div className="carInfo">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <p style={styles.carDetailsH}>Booking option</p>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <IoMdClose />
            </Link>
          </div>
          <div className="infoBox">
            <div className="infoContent">
              <div>
                <strong>Stay flexible</strong>
                <p className="mb-0">
                  Pay at pick-up, free cancellation and rebooking any time
                  before pick-up time
                </p>
              </div>
              <span style={styles.included}>
                Included{" "}
                <IoInformationCircleOutline
                  style={{
                    fontWeight: 800,
                    color: "#000",
                    fontSize: 20,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    openModal(
                      <>
                        <p className="heading3">
                          You will be asked to provide a valid payment
                          instrument, in order to complete the booking.
                        </p>
                        <ul>
                          <li>
                            A fee will be charged if the booking is cancelled.
                          </li>
                          <li>
                            Cancellation fees are based on your final selection
                            and will be displayed on the page where you finalize
                            your booking.
                          </li>
                          <li>
                            If you cancel after the scheduled pick-up time, no
                            refund will be given.
                          </li>
                        </ul>
                      </>
                    )
                  }
                />
              </span>
            </div>
          </div>
          <CommonModal
            show={showBestPriceModal}
            handleClose={closeModal}
            content={bestPriceModalContent}
          />
          <CommonModal
            show={showPriceDetailsModal}
            handleClose={closeModal}
            content={priceDetailsModalContent}
          />
          <p style={styles.carDetailsH}>Mileage</p>
          <div className="infoBox">
            <div className="infoContent">
              <div>
                <strong>2,426 miles</strong>
                <p className="mb-0">+AED 0.66 / for every additional mile</p>
              </div>
              <span style={styles.included}>Included</span>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="pricing">
            <span style={styles.dailyRate}>
              {car.price}{" "}
              <span
                style={{
                  fontFamily: fonts.helvetica400,
                  color: colors.black,
                  fontSize: 12,
                }}
              >
                AED / day
              </span>
            </span>

            <p
              className="priceDetails"
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

          <Link href="/cars/offerCheckout" className="nextButton" style={styles.nextButton}>
            Next
          </Link>
        </div>
      </div>
    </div>
  );
}
const styles = {
  iconStyles: {
    marginBottom: 2,
    marginRight: 3,
  },
  included: {
    fontFamily: fonts.helvetica700,
    letterSpacing: 1,
  },
  carDetailsH: {
    fontFamily: fonts.helvetica700,
    fontSize: 20,
    fontSize: 16,
    marginBottom: 0,
  },
  nextButton: {
    backgroundColor: colors.themeMain,
    color: colors.white,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    textDecoration:"none"
  },
  dailyRate: {
    fontSize: 20,
    color: colors.black,
    fontFamily: fonts.helvetica700,
  },
  carDetailsFacilities: {
    display: "flex",
    gap: 15,
    fontSize: 14,
    alignitems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
};
