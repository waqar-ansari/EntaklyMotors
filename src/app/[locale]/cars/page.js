// "use client";
// import { useState } from "react";
// import CarCard from "@/components/CarCard";
// import CarDetails from "@/components/CarDetails";
// import "./cars.css";

// const carsData = [
//   {
//     id: 1,
//     name: "Premium (BMW 2 Series)",
//     image: "/images/homeImage1.png",
//     price: 199,
//   },
//   {
//     id: 2,
//     name: "Luxury (BMW 3 Series)",
//     image: "/images/homeImage1.png",
//     price: 199,
//   },
//   {
//     id: 3,
//     name: "Standard (Chevrolet Blazer)",
// image: "/images/homeImage1.png",
//     price: 199,
//   },
//   {
//     id: 4,
//     name: "Standard (Chevrolet Blazer)",
// image: "/images/homeImage1.png",
//     price: 199,
//   },
//   {
//     id: 5,
//     name: "Standard (Chevrolet Blazer)",
// image: "/images/homeImage1.png",
//     price: 199,
//   },
//   {
//     id: 6,
//     name: "Standard (Chevrolet Blazer)",
// image: "/images/homeImage1.png",
//     price: 199,
//   },
// ];

// export default function CarsPage() {
//   const [selectedCarId, setSelectedCarId] = useState(null);

//   return (
//     <div className="container">
//       <div className="row">
//         {carsData.map((car) => (
//           <div key={car.id} className="col-md-4">
//             <CarCard
//               car={car}
//               onClick={() =>
//                 setSelectedCarId(selectedCarId === car.id ? null : car.id)
//               }
//               isSelected={selectedCarId === car.id}
//             />
//             {selectedCarId === car.id && <CarDetails car={car} />}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import CarCard from "@/components/CarCard";
import CarDetails from "@/components/CarDetails";
import "./cars.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const carsData = [
  {
    id: 1,
    name: "Premium (BMW 2 Series)",
    image: "/images/homeImage1.png",
    price: 175,
  },
  {
    id: 2,
    name: "Luxury (BMW 3 Series)",
    image: "/images/homeImage1.png",
    price: 184,
  },
  {
    id: 3,
    name: "Standard (Chevrolet Blazer)",
    image: "/images/homeImage1.png",
    price: 199,
  },
  {
    id: 4,
    name: "Luxury (Mercedes C-Class)",
    image: "/images/homeImage1.png",
    price: 200,
  },
  {
    id: 5,
    name: "SUV (Toyota Highlander)",
    image: "/images/homeImage1.png",
    price: 190,
  },
  {
    id: 6,
    name: "Electric (Tesla Model 3)",
    image: "/images/homeImage1.png",
    price: 210,
  },
  {
    id: 7,
    name: "Electric (Tesla Model 3)",
    image: "/images/homeImage1.png",
    price: 210,
  },
];

export default function CarsPage() {
  const [selectedCarId, setSelectedCarId] = useState(null);

  return (
   <div>
    <Header/>
      <div className="container">
        {carsData
          .reduce((rows, car, index) => {
            if (index % 3 === 0) {
              rows.push([]); // Create a new row every 3 cars
            }
            rows[rows.length - 1].push(car);
            return rows;
          }, [])
          .map((row, rowIndex) => (
            <div key={rowIndex} className="row mb-3">
              {row.map((car) => (
                <div key={car.id} className="col-md-4">
                  <CarCard
                    car={car}
                    onClick={() =>
                      setSelectedCarId(selectedCarId === car.id ? null : car.id)
                    }
                    isSelected={selectedCarId === car.id}
                  />
                </div>
              ))}
              {/* Insert CarDetails in the next full row when a car is clicked */}
              {selectedCarId && row.some((car) => car.id === selectedCarId) && (
                <div className="col-12">
                  <CarDetails
                    car={carsData.find((car) => car.id === selectedCarId)}
                  />
                </div>
              )}
            </div>
          ))}
      </div>
      <Footer/>
   </div>
  );
}
