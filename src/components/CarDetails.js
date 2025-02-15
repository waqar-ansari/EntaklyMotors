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

export default function CarDetails({ car, onClose }) {
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
          <div style={{marginBottom:20}}>
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
                  style={{ fontWeight: 700, color: "#000" }}
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
            {/* <span className="totalRate">5,200.05 AED total</span> */}
            {/* <a href="#" className="priceDetails">
              Price details
            </a> */}
          </div>

          <button className="nextButton" style={styles.nextButton}>
            Next
          </button>
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
