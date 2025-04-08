"use client";
import React, { useEffect } from "react";
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
import { useTranslation } from "@/context/LanguageProvider";

const BookingConfirmation = () => {
  const searchParams = useSearchParams();

  const bookingId = searchParams.get("booking_id");
  const transactionId = searchParams.get("transaction_id");
  const selectedPackageDetails = useSelector((state) => state.selectedPackage);
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
  const { t, language } = useTranslation();

  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    const completeBooking = async (paymentIntent) => {
      const bookingDetails = {
        userId: localUserId,
        carId: JSON.stringify(selectedCarDetail.id),
        name: fullname,
        email: email,
        phoneNumber: {
          countryCode: countryCode,
          number: phoneNumber,
        },
        pickupLocation: rentalDetail.pickupLocation,
        returnLocation: rentalDetail.returnLocation,
        pickupDate: new Date(rentalDetail.pickupDate)
          .toISOString()
          .split("T")[0],
        returnDate: new Date(rentalDetail.returnDate)
          .toISOString()
          .split("T")[0],
        pickupTime: rentalDetail.pickupTime,
        returnTime: rentalDetail.returnTime,
        protectionPackage: selectedPackageDetails.packageName,
        addons: selectedAddons,
        totalPrice: totalPrice,
        paymentIntentId: paymentIntent.id,
        currency: "aed",
        status: paymentIntent.status,
      };
      completeBooking()
      const paymentResponse = await api.post("/carbooking.php", bookingDetails);

      if (paymentResponse.data.status === "error") {
        console.error("Error in booking:", paymentResponse.data);
      } else {
        const bookingData = new URLSearchParams(
          paymentResponse.data
        ).toString();
        router.replace(`/booking/success?${bookingData}`);
      }
    };
  }, []);
  return (
    <>
      <Header />
      <div className="container p-4 bg-gray-100">
        <div className="shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-bold mb-2">
            {t("booking_confirmation")}
          </h2>
          <hr style={{ height: 2, backgroundColor: colors.themeMain }} />
          <h3 className="text-center mb-4" style={{ color: colors.themeMain }}>
            {t("booking_reserved")}
          </h3>
          <div className="text-center">
            <PiCheckCircle color="#6fcf97" style={{ fontSize: 80 }} />
          </div>
          <div className="text-center mt-4 fs-5 mb-5">
            {t("congratulations_your_booking_has_been_confirmed")}
            {/* <span className="displayBlock">
              Thank you for choosing ENTAKLY Motors for your car rental needs.
            </span> */}
          </div>
          {/* <h2 className="text-lg font-bold mb-2">Booking Details</h2> */}
          <hr style={{ height: 2, backgroundColor: colors.themeMain }} />
          <div className="row mb-5 align-items-stretch">
            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4
                  className="font-bold mb-3"
                  style={{ color: colors.themeMain }}
                >
                  {t("booking_details")} :
                </h4>
                <p className="mb-0">
                  <b>
                    {t("rental_days")}: {numberOfRentalDays}
                  </b>
                </p>
                <p>
                  <b>
                    {t("booking_id")}: {bookingId}
                  </b>
                </p>
              </div>
            </div>

            <div className="col-md-3 d-flex mb-3">
              <div className="border p-4 rounded flex-fill d-flex flex-column">
                <h4
                  className="font-bold mb-3"
                  style={{ color: colors.themeMain }}
                >
                  {t("pick_up")}:
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
                  {t("return")}:
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
            <h2 className="text-lg font-bold mb-2">{t("payment_details")}</h2>
            <hr
              style={{
                height: 2,
                backgroundColor: colors.themeMain,
                margin: "1rem 0rem",
              }}
            />
            <div className="d-flex justify-content-between align-items-center">
              <p className="mb-0 fw-bold">{t("transaction_id")} </p>
              <p className="mb-0 fw-bold">{transactionId}</p>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <p className="mb-0"> {t("total_price")}:</p>
                <PriceDetailsModal />
              </div>
              <p className="mb-0 fw-bold">
                {t("aed")} {totalPrice}
              </p>
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
