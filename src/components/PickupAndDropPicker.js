"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, DateRangePicker, Input } from "rsuite";
import "rsuite/dist/rsuite.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { FaCar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.css";
import "../styles/datePickerStyles.css";
import { IoMdAirplane } from "react-icons/io";
import { FaArrowRightLong } from "react-icons/fa6";

const PickupAndDropPicker = ({ heading = true, showCarsButton = true }) => {
  const [range, setRange] = useState([null, null]);
  console.log(range, "range of date");

  const [showDateModal, setShowDateModal] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [pickupTime, setPickupTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
  const [showReturnTimeModal, setShowReturnTimeModal] = useState(false);
  const pickerRef = useRef(null);

  const loactionData = [
    {
      locationName: "Dubai International Airport Terminal 3",
      locationIcon: <IoMdAirplane />,
    },
    {
      locationName: "Dubai International Airport Terminal 2",
      locationIcon: <IoMdAirplane />,
    },
    {
      locationName: "Dubai International Airport Terminal 1",
      locationIcon: <IoMdAirplane />,
    },
    {
      locationName: "Dubai International Airport Terminal 4",
      locationIcon: <IoMdAirplane />,
    },
  ];

  useEffect(() => {
    const pickupDate = new Date();
    const returnDate = new Date(pickupDate);
    returnDate.setDate(pickupDate.getDate() + 2);

    setRange([pickupDate, returnDate]);
  }, []);

  // Function to open DateRangePicker
  const openDatePicker = () => {
    if (pickerRef.current) {
      pickerRef.current.open();
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    return date.toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  const handlePickUpDateClick = () => {
    const isLargeScreen =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1200px)").matches;

    if (isLargeScreen) {
      openDatePicker();
    } else {
      setShowDateModal(true);
    }
  };
  const handleLocationClick = (e) => {
    console.log("log1");
    // Prevent the blur event from firing when clicking a location
    e.stopPropagation(); // Make sure the click does not propagate to the input's onBlur event
    console.log("Location selected:", e.target.innerText);
  };
  const timeSlots = [];
  const periods = ["AM", "PM"];

  periods.forEach((period) => {
    for (let hour = 0; hour < 12; hour++) {
      const displayHour = hour === 0 ? 12 : hour; // Convert 0 to 12 for 12 AM/PM
      timeSlots.push(`${displayHour}:00 ${period}`);
      timeSlots.push(`${displayHour}:30 ${period}`);
    }
  });
  const handleClose = () => setShowPickupTimeModal(false);
  const handleShowPickupTimeModal = () => setShowPickupTimeModal(true);

  const handleShowReturnTimeModal = () => setShowReturnTimeModal(true);
  return (
    <div>
      {heading && <p style={styles.heading}>Rent a Car</p>}
      <div
        className="d-md-flex justify-content-center pickupAndDropPicker flex-wrap position-relative "
        style={{ gap: "15px" }}
      >
        {showLocations && (
          <div
            className="position-absolute mobDisplayNone"
            style={{ top: 70, left: 40, width: "70%" }}
          >
            <div
              style={{
                background: colors.white,
                boxShadow: "rgba(0, 0, 0, 0.75) 2px 2px 16px 1px",
                borderRadius: 10,
                padding: 20,
                zIndex: 999,
              }}
              onClick={handleLocationClick}
            >
              {loactionData.map((item, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: 25,
                      cursor: "pointer",
                    }}
                    onClick={handleLocationClick}
                  >
                    <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                      {item.locationIcon}
                    </span>
                    <p className="mb-0">{item.locationName}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="input-group customInputGroup ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="pickupLocation"
              placeholder="Pickup Location"
              onFocus={() => setShowLocations(true)} // Show dropdown on focus
              onBlur={() => setShowLocations(false)}
            />
            <label htmlFor="pickupLocation">Pick-up</label>
          </div>
        </div>
        <div className="mb-0 input-group customInputGroup ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="dropLocation"
              placeholder="Drop Location"
              onFocus={() => setShowLocations(true)} // Show dropdown on focus
              onBlur={() => setShowLocations(false)}
            />
            <label htmlFor="dropLocation">Return</label>
          </div>
        </div>

        <DateRangePicker
          format="dd MMM hh:mm"
          ref={pickerRef}
          value={range}
          onChange={setRange}
          showMeridiem
          style={{ width: 0, background: "transparent" }}
          showShortcuts={false}
          renderFooter={() => null}
          showHeader={false}
        />
        {/* date and time picker for mobile */}
        <div className="tabDisplayNone">
          <div className="d-flex gap-2">
            <div className="d-flex flex-column">
              <div
                className="input-group customInputGroup mb-0"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottom: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={
                      range[0]
                        ? range[0].toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""
                    }
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">Pick-up Date</label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={pickupTime}
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handleShowPickupTimeModal}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">Pick-up Time</label>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column">
              <div
                className="input-group customInputGroup mb-0"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottom: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={
                      range[0]
                        ? range[1].toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : ""
                    }
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">Return Date</label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <FaCalendarAlt />
                </span>
                <div className="form-floating">
                  <input
                    value={returnTime}
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handleShowReturnTimeModal}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">Return Time</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="datePickerGroup mobDisplayNone">
          <div className="input-group customInputGroup">
            <span className="input-group-text">
              <FaCalendarAlt />
            </span>
            <div className="form-floating">
              <input
                value={range[0] ? formatDate(range[0]) : ""}
                className="form-control"
                placeholder="Pickup Date & Time"
                onClick={handlePickUpDateClick}
                readOnly
              />
              <label htmlFor="floatingInputGroup1">Pick-up Date</label>
            </div>
          </div>

          <div className="input-group customInputGroup">
            <span className="input-group-text">
              <FaCalendarAlt />
            </span>
            <div className="form-floating">
              <input
                value={range[0] ? formatDate(range[1]) : ""}
                className="form-control"
                placeholder="Return Date"
                onClick={handlePickUpDateClick}
                readOnly
              />
              <label htmlFor="floatingInputGroup1">Return Date</label>
            </div>
          </div>
        </div>
        {showCarsButton && (
          <Link href="/cars" style={styles.showCarsBtn}>
            Show cars
          </Link>
        )}
      </div>
      <Modal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        fullscreen
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateRangePicker
            showOneCalendar
            style={{ width: 0, background: "transparent" }}
            onOk={() => setShowDateModal(false)}
            onClose={() => setShowDateModal(false)}
            ref={pickerRef}
            value={range}
            onChange={setRange}
            format="d MMMM yyyy"
            defaultOpen
            showMeridiem
            character="to"
            // showHeader={false}
          />
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
      <Modal show={showPickupTimeModal} fullscreen onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Pick-up Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)", // Ensures two items per row
                  padding: "10px 15px",
                  // border: "1px solid #ccc",
                  background: pickupTime === time ? "black" : "#f9f9f9", // Change background if selected
                  color: pickupTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setPickupTime(time);
                  console.log(`Selected time: ${time}`);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className ="justify-content-between">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            style={{ background: colors.themeMain, color: colors.white, height:45 }}
            onClick={() => {
              setShowPickupTimeModal(false);
              setShowReturnTimeModal(true);
            }}
          >
            Select Return Date <FaArrowRightLong style={{ marginLeft: 15 }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReturnTimeModal} fullscreen onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Return Time</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)", // Ensures two items per row
                  padding: "10px 15px",
                  // border: "1px solid #ccc",
                  background: returnTime === time ? "black" : "#f9f9f9", // Change background if selected
                  color: returnTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setReturnTime(time);
                  console.log(`Selected time: ${time}`);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            variant="secondary"
            onClick={() => setShowReturnTimeModal(false)}
          >
            Close
          </Button>
          <Button
            style={{ background: colors.themeMain, color: colors.white,height:45  }}
            onClick={() => {
              setShowReturnTimeModal(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PickupAndDropPicker;
const styles = {
  showCarsBtn: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    background: colors.themeMain,
    color: colors.white,
    fontFamily: fonts.helvetica400,
    textDecoration: "none",
  },
  heading: {
    fontFamily: fonts.helvetica700,
    fontSize: 26,
    marginBottom: 30,
  },
};
