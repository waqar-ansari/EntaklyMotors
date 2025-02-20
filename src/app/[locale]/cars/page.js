"use client";
import { useState } from "react";
import CarCard from "@/components/CarCard";
import CarDetails from "@/components/CarDetails";
import "./cars.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import CustomDropdown from "@/components/dropdown/CustomDropdown";

const carsData = [
  {
    id: 1,
    name: "Premium (BMW 2 Series)",
    image: "/images/car5.png",
    price: 175,
  },
  {
    id: 2,
    name: "Luxury (BMW 3 Series)",
    image: "/images/car6.png",
    price: 184,
  },
  {
    id: 3,
    name: "Standard (Chevrolet Blazer)",
    image: "/images/car4.png",
    price: 199,
  },
  {
    id: 4,
    name: "Luxury (Mercedes C-Class)",
    image: "/images/car2.png",
    price: 200,
  },
  {
    id: 5,
    name: "SUV (Toyota Highlander)",
    image: "/images/car1.png",
    price: 190,
  },
  {
    id: 6,
    name: "Electric (Tesla Model 3)",
    image: "/images/car3.png",
    price: 210,
  },
  {
    id: 7,
    name: "Electric (Tesla Model 3)",
    image: "/images/car1.png",
    price: 210,
  },
  {
    id: 7,
    name: "Electric (Tesla Model 3)",
    image: "/images/car4.png",
    price: 210,
  },
];

export default function CarsPage() {
  const [selectedCarId, setSelectedCarId] = useState(null);

  const handleCloseDetails = () => {
    setSelectedCarId(null);
  };
  return (
    <div>
      <Header headerPickupAndDrop={true} />

      <div className="container mt-5">
        <h3 style={{ textTransform: "uppercase", marginBottom: 20 }}>
          Which car do you want to drive?
        </h3>
        {/* <CustomDropdown title={"Sort By"} multiSelect={true} showSelectedItemCount={true}/> */}
        {carsData
          .reduce((rows, car, index) => {
            if (index % 3 === 0) {
              rows.push([]);
            }
            rows[rows.length - 1].push(car);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="row mb-3">
              {row.map((car) => (
                <div key={car.id} className="col-lg-4 col-sm-6 col-12">
                  <CarCard
                    car={car}
                    onClick={() =>
                      setSelectedCarId(selectedCarId === car.id ? null : car.id)
                    }
                    isSelected={selectedCarId === car.id}
                  />
                </div>
              ))}

              {selectedCarId && row.some((car) => car.id === selectedCarId) && (
                <div className="col-12 mt-4">
                  <CarDetails
                    car={carsData.find((car) => car.id === selectedCarId)}
                    onClose={handleCloseDetails}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}
