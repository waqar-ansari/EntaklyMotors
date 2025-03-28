"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSelector } from "react-redux";
import { PiCheckCircle } from "react-icons/pi";
import { colors } from "../../../../public/colors/colors";
import { selectBookingOverview } from "@/redux/slices/bookingOverviewSlice";
import { IoLocationSharp } from "react-icons/io5";
import { IoCalendarSharp } from "react-icons/io5";
import Image from "next/image";
import PriceDetailsModal from "@/components/modals/PriceDetailsModal";
import { useSearchParams } from "next/navigation";



const BookingConfirmation = () => {
  const searchParams = useSearchParams();
// console.log(searchParams,"search params");
const bookingId = searchParams.get("booking_id");
  const transactionId = searchParams.get("transaction_id");

  const rentalDetail = useSelector((state) => state.rentalDetail);
  const selectedCarDetail = useSelector((state) => state.selectedCar);
  const bookingOverview = useSelector(selectBookingOverview);
  const totalPrice = useSelector((state) => state.totalPrice);
  const calculateDaysBetween = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDifference = end - start;
    const daysDifference = timeDifference / (1000 * 3600 * 24);
    return Math.abs(daysDifference);
  };
  const numberOfRentalDays = calculateDaysBetween(
    rentalDetail.pickupDate,
    rentalDetail.returnDate
  );
console.log(bookingId, transactionId,"booking and transaction id");

  return (
    <>
      <Header />
      <div className="container p-4 bg-gray-100">
        <div className="shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-2">Booking Confirmation</h2>
          <hr style={{ height: 2, backgroundColor: colors.themeMain }} />
          <h3 className="text-center mb-4" style={{ color: colors.themeMain }}>
            Booking Reserved
          </h3>
          <div className="text-center">
            <PiCheckCircle color="#6fcf97" style={{ fontSize: 80 }} />
          </div>
          <div className="text-center mt-4 fs-5 mb-5">
            Congratulations, your booking has been confirmed. Enjoy the ride and make memories.
            {/* <span className="displayBlock">
              Thank you for choosing ENTAKLY Motors for your car rental needs.
            </span> */}
          </div>
          {/* <h2 className="text-lg font-bold mb-2">Booking Details</h2> */}
          <hr style={{ height: 2, backgroundColor: colors.themeMain }} />
          <div className="row mb-5 align-items-stretch">
            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4 className="font-bold mb-3" style={{ color: colors.themeMain }}>
                  Booking Details:
                </h4>
                <p className="mb-0">
                  <b>No. of rental Days: {numberOfRentalDays}</b>
                </p>
                <p>
                  <b>Booking Id: {bookingId}</b>
                </p>
              
              </div>
            </div>

            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4
                  className="font-bold mb-3"
                  style={{ color: colors.themeMain }}
                >
                  Pick Up:
                </h4>
                <div className="d-flex align-items-center">
                  <IoLocationSharp className="me-2" />
                  <p className="mb-0">{rentalDetail.pickupLocation}</p>
                </div>
                <div className="d-flex align-items-center">
                  <IoCalendarSharp className="me-2" />
                  <p className="mb-0">
                    {rentalDetail.pickupDate} {rentalDetail.pickupTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4
                  className="font-bold mb-3"
                  style={{ color: colors.themeMain }}
                >
                  Return:
                </h4>
                <div className="d-flex align-items-center">
                  <IoLocationSharp className="me-2" />
                  <p className="mb-0">{rentalDetail.returnLocation}</p>
                </div>
                <div className="d-flex align-items-center">
                  <IoCalendarSharp className="me-2" />
                  <p className="mb-0">
                    {rentalDetail.returnDate} {rentalDetail.returnTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4 style={{ color: colors.themeMain }} className="mb-3">
                  {selectedCarDetail.name}
                </h4>
                <Image
                  src={`https://admin.entaklymotors.com/storage/${selectedCarDetail.image}`}
                  alt={selectedCarDetail.name}
                  width={400}
                  height={308}
                  layout="responsive"
                />
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="row align-items-stretch"></div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-2">Payment Details</h2>
            <hr
              style={{
                height: 2,
                backgroundColor: colors.themeMain,
                margin: "1rem 0rem",
              }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-bold">Transaction Id </p>
              <p className="mb-0 fw-bold">{transactionId}</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0"> Total Price:</p>
                <PriceDetailsModal />
              </div>
              <p className="mb-0 fw-bold">AED {totalPrice}</p>
            </div>
            <hr
              style={{
                height: 2,
                backgroundColor: colors.themeMain,
                margin: "1rem 0rem",
              }}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingConfirmation;
