// "use client";
// import { useState } from "react";
// import CarCard from "@/components/CarCard";
// import CarDetails from "@/components/CarDetails";
// import "./cars.css";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

// import CustomDropdown from "@/components/dropdown/CustomDropdown";

// const carsData = [
//   {
//     id: 1,
//     name: "Premium (BMW 2 Series)",
//     image: "/images/car5.png",
//     price: 175,
//   },
//   {
//     id: 2,
//     name: "Luxury (BMW 3 Series)",
//     image: "/images/car6.png",
//     price: 184,
//   },
//   {
//     id: 3,
//     name: "Standard (Chevrolet Blazer)",
//     image: "/images/car4.png",
//     price: 199,
//   },
//   {
//     id: 4,
//     name: "Luxury (Mercedes C-Class)",
//     image: "/images/car2.png",
//     price: 200,
//   },
//   {
//     id: 5,
//     name: "SUV (Toyota Highlander)",
//     image: "/images/car1.png",
//     price: 190,
//   },
//   {
//     id: 6,
//     name: "Electric (Tesla Model 3)",
//     image: "/images/car3.png",
//     price: 210,
//   },
//   {
//     id: 7,
//     name: "Electric (Tesla Model 3)",
//     image: "/images/car1.png",
//     price: 210,
//   },
//   {
//     id: 7,
//     name: "Electric (Tesla Model 3)",
//     image: "/images/car4.png",
//     price: 210,
//   },
// ];

// export default function CarsPage() {
//   const [selectedCarId, setSelectedCarId] = useState(null);

//   const handleCloseDetails = () => {
//     setSelectedCarId(null);
//   };
//   return (
//     <div>
//       <Header headerPickupAndDrop={true} />

//       <div className="container mt-5">
//         <h3 style={{ textTransform: "uppercase", marginBottom: 20 }}>
//           Which car do you want to drive?
//         </h3>
//         <CustomDropdown
//           title={"MultiSelect"}
//           multiSelect={true}
//           showSelectedItemCount={true}
//           containerstyles={{ marginRight: 20 }}
//         />
//         <CustomDropdown title={"Sort By"} />
//         {carsData
//           .reduce((rows, car, index) => {
//             if (index % 3 === 0) {
//               rows.push([]);
//             }
//             rows[rows.length - 1].push(car);
//             return rows;
//           }, [])
//           .map((row, rowIndex) => (
//             <div key={rowIndex} className="row mb-3">
//               {row.map((car) => (
//                 <div key={car.id} className="col-lg-4 col-sm-6 col-12">
//                   <CarCard
//                     car={car}
//                     onClick={() =>
//                       setSelectedCarId(selectedCarId === car.id ? null : car.id)
//                     }
//                     isSelected={selectedCarId === car.id}
//                   />
//                 </div>
//               ))}

//               {selectedCarId && row.some((car) => car.id === selectedCarId) && (
//                 <div className="col-12 mt-4">
//                   <CarDetails
//                     car={carsData.find((car) => car.id === selectedCarId)}
//                     onClose={handleCloseDetails}
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { Modal } from "react-bootstrap";
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
];

export default function CarsPage() {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Check for mobile screen size
  const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 991px)").matches;

  const handleCarClick = (carId) => {
    if (selectedCarId === carId) {
      setSelectedCarId(null); // Close if clicking the same car
      setShowModal(false);
    } else {
      setSelectedCarId(carId);
      if (isMobile) {
        setShowModal(true);
      }
    }
  };

  return (
    <div>
      <Header headerPickupAndDrop={true} />

      <div className="container mt-5">
        <h3 style={{ textTransform: "uppercase", marginBottom: 20 }}>
          Which car do you want to drive?
        </h3>
        <CustomDropdown
          title={"MultiSelect"}
          multiSelect={true}
          showSelectedItemCount={true}
          containerstyles={{ marginRight: 20 }}
        />
        <CustomDropdown title={"Sort By"} />

        {/* For mobile, render just a simple list of car cards */}
        {isMobile ? (
          <div className="row">
            {carsData.map((car) => (
              <div key={car.id} className="col-sm-6 mb-2">
                <CarCard
                  car={car}
                  onClick={() => handleCarClick(car.id)}
                  isSelected={selectedCarId === car.id}
                />
              </div>
            ))}
          </div>
        ) : (
          // For larger screens, use the reduce function to group cars into rows
          carsData
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
                  <div key={car.id} className="col-lg-4 col-sm-6 col-12 mb-2 mb-lg-0">
                    <CarCard
                      car={car}
                      onClick={() => handleCarClick(car.id)}
                      isSelected={selectedCarId === car.id}
                    />
                  </div>
                ))}

                {/* Render Car Details below the row on large screens */}
                {!isMobile &&
                  selectedCarId &&
                  row.some((car) => car.id === selectedCarId) && (
                    <div className="col-12 mt-4">
                      <CarDetails
                        car={carsData.find((car) => car.id === selectedCarId)}
                        onClose={() => setSelectedCarId(null)}
                      />
                    </div>
                  )}
              </div>
            ))
        )}
      </div>

      {/* Modal for smaller screens */}
      <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Car Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-0">
          {selectedCarId && (
            <CarDetails
              car={carsData.find((car) => car.id === selectedCarId)}
              onClose={() => setShowModal(false)}
            />
          )}
        </Modal.Body>
      </Modal>

      <Footer />
    </div>
  );
}
