"use client";

import api from "@/app/api/axiosInstance";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageProvider";

const Bookings = () => {
  const [customerBookings, setCustomerBookings] = useState([]);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    const fetchBookings = async () => {
      const response = await api.post("/getallcarbooking.php", {
        userId: localUserId,
      });

      setCustomerBookings(response.data.data);
    };
    fetchBookings();
  }, []);

  const handleCardClick = (booking) => {
    router.push({
      pathname: "/booking/details",
      query: { booking: JSON.stringify(booking) }, // or send only booking_number
    });
  };
  console.log(customerBookings, "customerBookings");

  return (
    <div>
      <h3 className="mb-4">{t("your_bookings")}</h3>
      <div className="row">
        {customerBookings?.length > 0 ? (
          customerBookings.map((booking, index) => (
            <div
              key={index}
              className="col-md-12 mb-4"
              onClick={() => handleCardClick(booking)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <h5>Booking #: {booking.booking_number}</h5>
                <p>
                  <strong>Pickup:</strong>{" "}
                  {booking.car_details?.[0]?.rental_start_date} at{" "}
                  {booking.car_details?.[0]?.pickup_time}
                </p>
                <p>
                  <strong>Return:</strong>{" "}
                  {booking.car_details?.[0]?.rental_end_date} at{" "}
                  {booking.car_details?.[0]?.return_time}
                </p>
                <p>
                  <strong>Amount:</strong> AED {booking.amount}
                </p>
                <p>
                  <strong>Car ID:</strong> {booking.car_details?.[0]?.car_id}
                </p>
                <p>
                  <strong>Protection:</strong>{" "}
                  {booking.car_details?.[0]?.protection_package}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>{t("no_bookings_found")}</p>
        )}
      </div>
    </div>
  );
};

export default Bookings;
