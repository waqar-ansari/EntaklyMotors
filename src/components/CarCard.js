import Image from "next/image";
import "../app/cars/cars.css";
import { FaUser, FaSuitcase, FaCheck } from "react-icons/fa";
import { TbAutomaticGearbox } from "react-icons/tb";
import { TiArrowSortedDown } from "react-icons/ti";
import { colors } from "../../public/colors/colors";
import { useTranslation } from "@/context/LanguageProvider";

export default function CarCard({ car, onClick, isSelected }) {
  const isLargeScreen =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 992px)").matches;

  const { t, language } = useTranslation();

  
  return (
    <div>
      <div
        className={`carCard ${isSelected ? "activeCarCard" : ""}`}
        onClick={onClick}
      >
        <div className="carOverlay">
          <div>
            <h4 className="carTitle">{car.name}</h4>
            <p className="carSubtitle">or similar</p>
            <div className="carIcons">
              <span className="cardCardIconBox">
                <FaUser size={12} style={{ marginRight: 5, marginBottom: 2 }} />{" "}
                {car.number_of_seats}
              </span>
              <span className="cardCardIconBox">
                <FaSuitcase
                  size={12}
                  style={{ marginRight: 5, marginBottom: 2 }}
                />{" "}
                2
              </span>
              <span className="cardCardIconBox">
                <TbAutomaticGearbox size={14} style={{ marginRight: 5 }} />{" "}
                {car.transmission_id==="0"?"Manual":"Automatic"}
              </span>
            </div>
          </div>
          <div>
            <Image
              src={`https://admin.entaklymotors.com/storage/${car.car_image}`}
              alt={car.name}
              width={700}
              height={420}
              layout="responsive"
              unoptimized
            />
          </div>
          <div>
            <p className="carIncluded">
              <FaCheck className="checkIcon" />
              {/* {car.mileage}{" "} */}200 
              <span className="text-lowercase"> {t("km_included")}</span>
            </p>
            <div className="carPricing">
              <span className="dailyRate">{car.rental_rate} AED / day</span>
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
