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

      const response = await api.post("/getallcarbooking.php", {
        userId: localUserId,
      });
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
    
    try {
      const response = await api.post("/cancel_booking.php", {
        booking_number: selectedBooking.booking_number,
      });
      
      if (response.data.status === "success") {
        const fetchBookings = async () => {
          const response = await api.post("/getallcarbooking.php", {
            userId: localUserId,
          });

          setCustomerBookings(response.data.data);
        };
        fetchBookings();
      }
      else{
        alert(t("failed_to_cancel_booking"));
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
                  {t("booking")} #: {booking.booking_number}{" "}
                  {booking.status === "cancelled" && (
                    // {booking.status === "cancelled" && (
                    <span className="badge bg-danger">{t("cancelled")}</span>
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
                      <strong>{t("car")}:</strong> {booking.car_details?.car_name}
                      {/* {booking.car_details?.pickup_time} */}
                    </p>
                    <p>
                      <strong>{t("pick_up")}:</strong>{" "}
                      {booking.car_details?.pickup_address}
                      {/* {booking.car_details?.pickup_time} */}
                    </p>
                    <p>
                      <strong>{t("return")}:</strong>{" "}
                      {booking.car_details?.return_address}
                      {/* {booking.car_details?.return_time} */}
                    </p>
                    <p className="mb-0">
                      <strong>{t("amount_paid")}:</strong> {t("AED")} {booking.amount}
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
                      {t("cancel_booking")}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="vh-100"><p>{t("no_bookings_found")}</p></div>
        )}
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t("cancel_booking")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{t("cancel_this_booking")}</p>
          <p>
            {t("booking_id")}: <b>{selectedBooking?.booking_number}</b>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            {t("no")}
          </Button>
          <Button variant="danger" onClick={confirmCancelBooking}>
            {t("yes_cancel_it")}
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
