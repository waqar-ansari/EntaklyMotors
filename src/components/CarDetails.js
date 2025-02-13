import "../app/[locale]/cars/cars.css";

export default function CarDetails({ car }) {
  return (
    <div className="carDetailsContainer">
      {/* Car Image */}
      <div className="carDetailsImage">
        <img src={car.imageUrl} alt={car.name} />
      </div>

      {/* Car Details */}
      <div className="carDetailsContent">
        <div className="carDetailsHeader">
          <h2>{car.name}</h2>
          <p className="carDetailsType">or similar | Saloon</p>
        </div>
        <div className="carDetailsSpecs">
          <p>5 Seats</p>
          <p>2 Suitcase(s)</p>
          <p>1 Bag(s)</p>
          <p>Automatic</p>
          <p>4 Doors</p>
        </div>
        <div className="carDetailsDriverAge">
          <p>Minimum age of the youngest driver: 16</p>
        </div>
        <div className="carDetailsBookingOption">
          <h3>Booking option</h3>
          <p>Stay flexible</p>
          <p>Pay at pick-up, free cancellation and rebooking any time before pick-up time</p>
        </div>
        <div className="carDetailsIncluded">
          <h3>Included</h3>
          <p>Mileage: 2,426 miles</p>
          <p>+AED 0.66 / for every additional mile</p>
          <p>Fuel: 152.94L* / day | 5,200.05L total</p>
        </div>
        <div className="carDetailsPrice">
          <h3>Price details</h3>
          <p>Price: {car.price} $/day</p>
        </div>
        <button className="carDetailsBtn">Next</button>
      </div>
    </div>
  );
}