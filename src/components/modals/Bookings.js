"use client";

import api from "@/app/api/axiosInstance";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageProvider";
import { Button, Modal } from "react-bootstrap";

const Bookings = () => {
  const [customerBookings, setCustomerBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    const localUserId = localStorage.getItem("userId");
    const fetchBookings = async () => {
      console.log(localUserId, "user id before api");

      const response = await api.post("/getallcarbooking.php", {
        userId: localUserId,
      });
      console.log(response.data.status, "all car booking data");

      setCustomerBookings(response.data.data);
    };
    fetchBookings();
  }, []);

  

  const handleCancelClick = (booking) => {
    setSelectedBooking(booking);
    setShowModal(true);
  };
  const confirmCancelBooking = async () => {
    if (!selectedBooking) return;
    const localUserId = localStorage.getItem("userId");
    console.log(localUserId,"local user id in cancel booking");
    
    try {
      const response = await api.post("/cancel_booking.php", {
        booking_number: selectedBooking.booking_number,
      });
      console.log(response.data,"response from cancel api");
      
      if (response.data.status === "success") {
        const fetchBookings = async () => {
          const response = await api.post("/getallcarbooking.php", {
            userId: localUserId,
          });
          console.log(response.data.data, "all car booking data");

          setCustomerBookings(response.data.data);
        };
        fetchBookings();
      }
      else{
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error cancelling booking", error);
    }

    setShowModal(false);
  };

 
  return (
    <div>
      <h3 className="mb-4">{t("your_bookings")}</h3>
      <div className="row">
        {customerBookings?.length > 0 ? (
          customerBookings.map((booking, index) => (
            <div
              key={index}
              className="col-md-12 mb-4"
              // onClick={() => handleCardClick(booking)}
              style={{ cursor: "pointer" }}
            >
              <div
                className="card shadow-sm h-100"
                style={{
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <h5 className="mb-3">
                  Booking #: {booking.booking_number}{" "}
                  {booking.status === "cancelled" && (
                    // {booking.status === "cancelled" && (
                    <span className="badge bg-danger">Cancelled</span>
                  )}
                </h5>

                <div className="d-flex align-items-center">
                  <div
                    className="bookingCarImageBg"
                    style={{ marginRight: 30 }}
                  >
                    <Image
                      src={`https://admin.entaklymotors.com/storage/${booking?.car_details?.car_image}`}
                      alt={""}
                      width={150}
                      height={115}
                      unoptimized
                    />
                  </div>
                  <div>
                    <p>
                      <strong>Car:</strong> {booking.car_details?.car_name}
                      {/* {booking.car_details?.pickup_time} */}
                    </p>
                    <p>
                      <strong>Pickup:</strong>{" "}
                      {booking.car_details?.pickup_address}
                      {/* {booking.car_details?.pickup_time} */}
                    </p>
                    <p>
                      <strong>Return:</strong>{" "}
                      {booking.car_details?.return_address}
                      {/* {booking.car_details?.return_time} */}
                    </p>
                    <p className="mb-0">
                      <strong>Amount Paid:</strong> {t("AED")} {booking.amount}
                    </p>
                  </div>
                </div>
                {/* {booking.status==="confirmed" && ( */}
                {booking.status !== "cancelled" && (
                  <div className="d-flex justify-content-end">
                    <button
                      style={styles.cancelBookingBtn}
                      onClick={() => handleCancelClick(booking)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>{t("no_bookings_found")}</p>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to cancel this booking?</p>
          <p>
            Booking Id: <b>{selectedBooking?.booking_number}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            No
          </Button>
          <Button variant="danger" onClick={confirmCancelBooking}>
            Yes, Cancel it
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Bookings;

const styles = {
  cancelBookingBtn: {
    backgroundColor: "red",
    padding: "5px 10px",
    borderRadius: "5px",
    color: "#fff",
    display: "inline",
  },
};
