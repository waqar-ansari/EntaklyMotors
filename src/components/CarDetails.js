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
import { useTranslation } from "@/context/LanguageProvider";
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
  const rentalDetails = useSelector((state) => state.rentalDetail);
  const selectedCarDetails = useSelector((state) => state.selectedCar);
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
  const { t, language } = useTranslation();
  return (
    <>
      <div className="carDetails">
        {/* Left Side - Car Image & Info Overlay */}
        <div className="carImageContainer">
          <div className="carDetailsOverlay">
            <div className="ms-4 mt-3">
              <h2 className="carTitle">{car.name}</h2>
              <p className="carSubtitle">or similar</p>
            </div>
            <div>
              <Image
                  src={`https://admin.entaklymotors.com/storage/${car.car_image}`}
                className="carDetailsImage"
                alt={car.name}
                width={752}
                height={500}
                layout="responsive"
                unoptimized

              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div className="carIcons" style={styles.carDetailsFacilities}>
                <span>
                  <FaUser style={styles.iconStyles} /> {car.number_of_seats} Seats
                </span>
                <span>
                  <FaSuitcase style={styles.iconStyles} /> 2 Suitcase(s)
                </span>
                <span>
                  <FaShoppingBag style={styles.iconStyles} /> 1 Bag(s)
                </span>
                <span>
                  <TbAutomaticGearbox style={styles.iconStyles} /> {car.transmission_id==="1"?"Automatic":"Manual"}
                </span>
                <span>
                  <FaDoorOpen style={styles.iconStyles} /> {car.number_of_doors} Doors
                </span>
              </div>
              <div className="text-center">
                <p>
                  <FaRegIdCard style={styles.iconStyles} />{" "}
                  {t("minimum_age_of_youngest_driver")}
                </p>
              </div>
            </div>
          </div>
          {/* <img src={car.image} alt={car.name} className="carDetailsImage" /> */}
        </div>

        <div className="carInfo">
          <div>
            <div className="d-flex justify-content-between align-items-center">
              <p style={styles.carDetailsH}>{t("booking_option")}</p>
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
                  <strong>{t("stay_flexible")}</strong>
                  <p className="mb-0">{t("pay_online_free_cancellation")}</p>
                </div>
                <span style={styles.included}>
                  {t("included")}
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

            <p style={styles.carDetailsH}>{t("mileage")}</p>
            <div className="infoBox">
              <div className="infoContent">
                <div>
                  {/* <strong>{car.mileage}km</strong> */}
                  <strong>200km</strong>
                  <p className="mb-0">
                    {/* +AED {car.additional_km_price} / {t("for_every_additional_km")} */}
                    +AED 1.50 / {t("for_every_additional_km")}
                  </p>
                </div>
                <span style={styles.included}>{t("included")}</span>
              </div>
            </div>
            <p style={styles.carDetailsH}>{t("deposit")}</p>
            <div className="infoBox">
              <div className="infoContent">
                <div>
                  <strong>{t("zero_deposit")}</strong>
                  <p className="mb-0">{t("no_deposit_required")}</p>
                </div>
                <span style={styles.included}>{t("included")}</span>
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
              <p style={{ marginBottom: 5 }}>
                {t("total")} :{" "}
                {numberOfRentalDays * selectedCarDetails.price}
              </p>
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
              {t("next")}
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
