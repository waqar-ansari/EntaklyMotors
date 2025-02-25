"use client";
import React, { useRef, useState } from "react";
import { Button, DateRangePicker, Input } from "rsuite";
import "rsuite/dist/rsuite.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { FaCar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PickupAndDropPicker = ({ heading = true }) => {
  const [range, setRange] = useState([null, null]);

  console.log(range.toLocaleString(), "range");
  const [showDateModal, setShowDateModal] = useState(false);

  const pickerRef = useRef(null);

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
      typeof window !== "undefined" && window.matchMedia("(min-width: 1200px)").matches;
  
    if (isLargeScreen) {
      openDatePicker(); // Call the function to open date picker
    } else {
      setShowDateModal(true); // Show modal for smaller screens
    }
  };

  return (
    <div>
      {heading && <p style={styles.heading}>Rent a Car</p>}
      <div
        className="d-md-flex justify-content-center pickupAndDropPicker flex-wrap "
        style={{ gap: "15px" }}
      >
        <div className="input-group customInputGroup position-relative">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="pickupLocation"
              placeholder="Pickup Location"
            />
            <label htmlFor="pickupLocation">Pick-up</label>
          </div>
          {/* { <div className="position-absolute" style={{ bottom: -40, left: 0 }}>
            <div style={{ background: "red" }}>pickup location div</div>
          </div>} */}
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
            />
            <label htmlFor="dropLocation">Drop-off</label>
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
        />

        <div
          className="input-group customInputGroup"
          // onClick={() => setShowDateModal(true)}
        >
          <span className="input-group-text">
            <FaCalendarAlt />
          </span>
          <div className="form-floating">
            <input
              // value={range[0] ? range[0].toLocaleString() : ""}
              value={range[0] ? formatDate(range[0]) : ""}
              className="form-control"
              placeholder="Pickup Date & Time"
              onClick={handlePickUpDateClick}
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
              // value={range[1] ? range[1].toLocaleString() : ""}
              value={range[0] ? formatDate(range[1]) : ""}
              className="form-control"
              placeholder="Return Date"
              onClick={handlePickUpDateClick}
            />
            <label htmlFor="floatingInputGroup1">Return Date</label>
          </div>
        </div>
        <Link href="/cars" style={styles.showCarsBtn}>
          Show cars
        </Link>
      </div>
      <Modal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        fullscreen
      >
        <Modal.Header closeButton>
          <Modal.Title>Choose Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateRangePicker format="dd MMM hh:mm" showMeridiem />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDateModal(false)}>
            Close
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
