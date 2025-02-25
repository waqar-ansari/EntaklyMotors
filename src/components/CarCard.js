import Image from "next/image";
import "../app/[locale]/cars/cars.css";
import { FaUser, FaSuitcase, FaCheck } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import { TiArrowSortedDown } from "react-icons/ti";
import { colors } from "../../public/colors/colors";

export default function CarCard({ car, onClick, isSelected }) {
  const isLargeScreen =
  typeof window !== "undefined" && window.matchMedia("(min-width: 992px)").matches;
  return (
    <div>
      <div
        className={`carCard ${isSelected ? "activeCarCard" : ""}`}
        onClick={onClick}
      >
        <div className="carOverlay">
          <div>
            <h4 className="carTitle">COMPACT ({car.name})</h4>
            <p className="carSubtitle">or similar | Saloon</p>
            <div className="carIcons">
              <span className="cardCardIconBox">
                <FaUser size={12} style={{ marginRight: 5, marginBottom: 2 }} />{" "}
                5
              </span>
              <span className="cardCardIconBox">
                <FaSuitcase
                  size={12}
                  style={{ marginRight: 5, marginBottom: 2 }}
                />{" "}
                3
              </span>
              <span className="cardCardIconBox">
                <TbAutomaticGearbox size={14} style={{ marginRight: 5 }} />{" "}
                Automatic
              </span>
            </div>
          </div>
          <div>
            <Image
              src={car.image}
              alt="car"
              width={752}
              height={500}
              layout="responsive"
            />
          </div>
          <div>
            <p className="carIncluded">
              <FaCheck className="checkIcon" /> 1,000 miles included
            </p>
            <div className="carPricing">
              <span className="dailyRate">{car.price} AED / day</span>
            </div>
            <div>
              <p className="tagStyle">Best Deal</p>
            </div>
          </div>
        </div>
        <img src={car.image} alt={car.name} className="carImage" />
      </div>
      {isSelected && isLargeScreen && (
        <div className="d-flex justify-content-center">
          <TiArrowSortedDown size={25} color={colors.themeMain} />
        </div>
      )}
    </div>
  );
}
