"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, DateRangePicker, Input} from "rsuite";
import "rsuite/dist/rsuite.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { FaCar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";
import { Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/rsuite.css";


const PickupAndDropPicker = ({ heading = true, showCarsButton = true }) => {
  const [range, setRange] = useState([null, null]);

  const [showDateModal, setShowDateModal] = useState(false);
  const pickerRef = useRef(null);

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

        <div className="datePickerGroup">
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
                // value={range[1] ? range[1].toLocaleString() : ""}
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
              format="d MMMM yyyy HH:mm" 
              defaultOpen
              showMeridiem
              // showHeader={false}
            />
       
        </Modal.Body>
        <Modal.Footer>
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
