"use client";
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import CarCard from "@/components/CarCard";
import CarDetails from "@/components/CarDetails";
import "./cars.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomDropdown from "@/components/dropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSelectedCar,
  setSelectedCar,
} from "@/redux/slices/selectedCarSlice";
import { useTranslation } from "@/context/LanguageProvider";
import { AiOutlineClose } from "react-icons/ai";
import { clearSelectedAddons } from "@/redux/slices/selectedAddonSlice";
import { clearSelectedPackage } from "@/redux/slices/selectedPackageSlice";
import { setCarBookingOverview } from "@/redux/slices/bookingOverviewSlice";
import api from "../api/axiosInstance";

const carsData = [
  {
    id: 1,
    name: "Premium (BMW 2 Series)",
    image: "/images/car4.png",
    price: 175,
    km_included: 200,
    km_price: 0.5,
  },
  {
    id: 2,
    name: "Luxury (BMW 3 Series)",
    image: "/images/car4.png",
    price: 184,
    km_included: 200,
    km_price: 1.5,
  },
  {
    id: 3,
    name: "Standard (Chevrolet Blazer)",
    image: "/images/car4.png",
    price: 199,
    km_included: 200,
    km_price: 1.0,
  },
  {
    id: 4,
    name: "Luxury (Mercedes C-Class)",
    image: "/images/car4.png",
    price: 200,
    km_included: 200,
    km_price: 2.0,
  },
  {
    id: 5,
    name: "SUV (Toyota Highlander)",
    image: "/images/car4.png",
    price: 190,
    km_included: 200,
    km_price: 2.2,
  },
  {
    id: 6,
    name: "Electric (Tesla Model 3)",
    image: "/images/car4.png",
    price: 210,
    km_included: 200,
    km_price: 1.8,
  },
];

export default function CarsPage() {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [carsData, setCarsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const bookingOverview = useSelector((state) => state.bookingOverview);

  const dispatch = useDispatch();
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 991px)").matches;
 const rentalDetail = useSelector((state) => state.rentalDetail);
  const handleCarClick = (car) => {
    if (selectedCarId === car.id) {
      setSelectedCarId(null);
      dispatch(clearSelectedCar());
      setShowModal(false);
    } else {
      setSelectedCarId(car.id);

      const selectedCarDetails = {
        id: car.id,
        name: car.name,
        image: car.car_image,
        price: car.rental_rate,
      };
      const bookingOverviewForSelectedCar = [t("200_km_included")];

      // bookingOverviewForSelectedCar.map((item) => dispatch(setBookingOverview(item)));
      dispatch(setCarBookingOverview(bookingOverviewForSelectedCar));

      dispatch(setSelectedCar(selectedCarDetails));
      if (isMobile) {
        setShowModal(true);
      }
    }
  };
  console.log(rentalDetail,"rentalDetail");
  
  console.log(rentalDetail.pickupdate,"rentalDetail.pickupdate");
  console.log(rentalDetail.returndate,"rentalDetail.returndate");
  
  const localUserId = localStorage.getItem("userId");
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      try {
        const response = await api.post("/getallcarslanguage.php", {
          // user_id: localUserId,
          language: language==="ar"?"ar":language ==="ru"?"ru_RU": "en_US",
          pickupdate: rentalDetail.pickupDate,
          returndate: rentalDetail.returnDate,
        });
        if (response.data.error) {
          console.log(response.data.error);
          setIsLoading(false);
        } else {
          // const carsData = response.data.cars;
          console.log(response.data.cars, "response cars");

          setCarsData(response.data.cars);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching cars:", error);
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  useEffect(() => {
    dispatch(clearSelectedAddons());
    dispatch(clearSelectedPackage());
  }, []);

  const selectedCar = useSelector((state) => state.selectedCar);

  const { t, language } = useTranslation();
  return (
    <div>
      <Header headerPickupAndDrop={true} />

      {isLoading?
      
     <div className="d-flex justify-content-center align-items-center vh-100">
        <span
        className="spinner-border me-2"
        role="status"
        aria-hidden="true"
        style={{ width: '2rem', height: '2rem' }}
      ></span>
     </div>
    
      
     : <div className="container mt-5">
     <h3 style={{ textTransform: "uppercase", marginBottom: 20 }}>
       {t("which_car_you_want_to_drive")}
     </h3>
     {/* <CustomDropdown
       title={"MultiSelect"}
       multiSelect={true}
       showSelectedItemCount={true}
       containerstyles={{
         ...(language === "ar" ? { marginLeft: 20 } : { marginRight: 20 }),
       }}
     />

     <CustomDropdown title={t("sort_by")} /> */}

     {isMobile ? (
       <div className="row">
         {carsData.map((car) => (
           <div key={car.id} className="col-sm-6 mb-2">
             <CarCard
               car={car}
               onClick={() => handleCarClick(car)}
               isSelected={selectedCarId === car.id}
             />
           </div>
         ))}
       </div>
     ) : (
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
             {row.map((car) => {
               return (
                 <div
                   key={car.id}
                   className="col-lg-4 col-sm-6 col-12 mb-2 mb-lg-0"
                 >
                   <CarCard
                     car={car}
                     onClick={() => handleCarClick(car)}
                     isSelected={selectedCarId === car.id}
                   />
                 </div>
               );
             })}

             {!isMobile &&
               selectedCarId &&
               row.some((car) => car.id === selectedCarId) && (
                 <div className="col-12 mt-4">
                   <CarDetails
                     car={carsData.find((car) => car.id === selectedCarId)}
                     onClose={() => {
                       dispatch(clearSelectedCar());
                       setSelectedCarId(null);
                     }}
                   />
                 </div>
               )}
           </div>
         ))
     )}
   </div>}

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        fullscreen
        centered
      >
        <Modal.Header className="d-flex">
          <Modal.Title>Car Details</Modal.Title>
          <span onClick={() => setShowModal(false)}>
            <AiOutlineClose />
          </span>
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
