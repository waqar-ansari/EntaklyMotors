import "../app/[locale]/cars/cars.css"
import { FaUser, FaSuitcase, FaCheck } from "react-icons/fa";

export default function CarCard({ car, onClick }) {
  return (
    <div className="carCard" onClick={onClick}>
      <div className="carOverlay">
        <div>
          <h4 className="carTitle">COMPACT ({car.name})</h4>
          <p className="carSubtitle">or similar | Saloon</p>
          <div className="carIcons">
            <span><FaUser /> 5</span>
            <span><FaSuitcase /> 3</span>
            <span> Automatic</span>
          </div>
        </div>
        <div>
          <p className="carIncluded">
            <FaCheck className="checkIcon" /> 2,426 miles included
          </p>
          <div className="carPricing">
            <span className="dailyRate">{car.price} د.إ / day</span>
            <span className="totalRate">{car.price * 34} د.إ total</span>
          </div>
        </div>
      </div>
      <img src={car.image} alt={car.name} className="carImage" />
    </div>
  );
}
