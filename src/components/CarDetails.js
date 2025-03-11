"use client";
import "../app/cars/cars.css";
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
import PriceDetailsModal from "./modals/PriceDetailsModal";
import { useSelector } from "react-redux";
// import "../styles/globals.css";

export default function CarDetails({ car, onClose }) {
  const [showBestPriceModal, setShowBestPriceModal] = useState(false);
  const [bestPriceModalContent, setBestPriceModalContent] = useState("");
  const openModal = (content) => {
    setBestPriceModalContent(content);
    setShowBestPriceModal(true);
  };

  const closeModal = () => {
    setShowBestPriceModal(false);
  };
  const rentalDetails = useSelector((state)=>state.rentalDetail)
  const selectedCarDetails = useSelector((state)=>state.selectedCar)
  const calculateNumberOfDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const numberOfDays = timeDifference / (1000 * 3600 * 24);
    return Math.abs(numberOfDays);
  };
  const numberOfRentalDays = calculateNumberOfDays(
    rentalDetails.pickupDate,
    rentalDetails.returnDate
  );
  
  return (
    <>
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
                    Pay online, free cancellation and rebooking any time
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
                              Cancellation fees are based on your final
                              selection and will be displayed on the page where
                              you finalize your booking.
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
            <p style={styles.carDetailsH}>Deposit</p>
            <div className="infoBox">
              <div className="infoContent">
                <div>
                  <strong>Zero Deposit</strong>
                  <p className="mb-0">No deposit required — get started right away!</p>
                </div>
                <span style={styles.included}>Included</span>
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="pricing">
              {/* <span style={styles.dailyRate}>
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
              </span> */}
              <p style={{marginBottom:5}}>Total : {numberOfRentalDays*selectedCarDetails.price +400}</p>
              <div>
              <p className="tagStyleCarDetails">Best Deal</p>
            </div>

              <PriceDetailsModal />
            </div>

            <Link
              href="/cars/offerCheckout"
              className="nextButton"
              style={styles.nextButton}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
      <CommonModal
        show={showBestPriceModal}
        handleClose={closeModal}
        content={bestPriceModalContent}
      />
    </>
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
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
