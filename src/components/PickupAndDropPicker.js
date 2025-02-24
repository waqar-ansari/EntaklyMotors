"use client";
import React, { useRef, useState } from "react";
import { Button, DateRangePicker, Input } from "rsuite";
import "rsuite/dist/rsuite.css";
import { colors } from "../../public/colors/colors";
import { fonts } from "../../public/fonts/fonts";
import { FaCar } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import Link from "next/link";

const PickupAndDropPicker = ({ heading = true }) => {
  const [range, setRange] = useState([null, null]);

  console.log(range.toLocaleString(), "range");

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

  return (
    <div>
      {heading && <p style={styles.heading}>Rent a Car</p>}
      <div
        className="d-flex justify-content-center pickupAndDropPicker flex-wrap"
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
        <div className="input-group customInputGroup">
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

        <div className="input-group customInputGroup">
          <span className="input-group-text">
            <FaCalendarAlt />
          </span>
          <div className="form-floating">
            <input
              // value={range[0] ? range[0].toLocaleString() : ""}
              value={range[0] ? formatDate(range[0]) : ""}
              className="form-control"
              placeholder="Pickup Date & Time"
              onClick={openDatePicker}
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
              placeholder="Drop-off Date & Time"
              onClick={openDatePicker}
            />
            <label htmlFor="floatingInputGroup1">Drop-off Date</label>
          </div>
        </div>
        <Link href="/cars" style={styles.showCarsBtn}>
          Show cars
        </Link>
      </div>
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
