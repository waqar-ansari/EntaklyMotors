"use client";
import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Button, CustomProvider, DateRangePicker, Input } from "rsuite";
import enUS from "rsuite/esm/locales/en_US";
import arEG from "rsuite/esm/locales/ar_EG";
import ruRU from "rsuite/esm/locales/ru_RU";
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
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdKey } from "react-icons/md";
import { TbArrowBack } from "react-icons/tb";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { HiMiniHome } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import "../styles/inputFields.css";
import {
  clearRentalDetail,
  setRentalDetailDataSlice,
} from "@/redux/slices/rentalDetailSlice";
import { useTranslation } from "../context/LanguageProvider";
import { useRouter } from "next/navigation";
// import { getLocationData } from "../../public/locations/allLocations";

const PickupAndDropPicker = ({
  heading = true,
  showCarsButton = true,
  onShowCarsClick,
}) => {
  const [range, setRange] = useState([null, null]);
  const [hoveredItem, setHoveredItem] = useState({});

  const dispatch = useDispatch();
  const { t, language } = useTranslation();

  const rentalDetails = useSelector((state) => state.rentalDetail);

  const [showDateModal, setShowDateModal] = useState(false);
  const [showLocations, setShowLocations] = useState(false);
  const [pickupTime, setPickupTime] = useState(rentalDetails.pickupTime || "10:00 AM");
  const [returnTime, setReturnTime] = useState(rentalDetails.returnTime || "10:00 AM");
  const [pickupLocation, setPickupLocation] = useState(
    rentalDetails.pickupLocation || ""
  );
  const [returnLocation, setReturnLocation] = useState(
    rentalDetails.returnLocation || ""
  );
  const [showPickupTimeModal, setShowPickupTimeModal] = useState(false);
  const [showReturnTimeModal, setShowReturnTimeModal] = useState(false);
  const [showReturnTimeModalMobile, setShowReturnTimeModalMobile] =
    useState(false);
  const [showPickupTimeModalMobile, setShowPickupTimeModalMobile] =
    useState(false);
  const [pickupLocationModal, setPickupLocationModal] = useState(false);
  const [returnLocationModal, setReturnLocationModal] = useState(false);
  const [showLocationHeading, setShowLocationHeading] = useState("");
  const [locationSearch, setLocationSearch] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [error, setError] = useState("");
  const [activeInput, setActiveInput] = useState(null);
  const pickerRef = useRef(null);
  const showLocationsRef = useRef(null);
  const router = useRouter();
  useEffect(() => {
    const pickupDate = new Date();
    pickupDate.setDate(pickupDate.getDate() + 1);
    const returnDate = new Date(pickupDate);
    returnDate.setDate(pickupDate.getDate() + 2);
    setRange([pickupDate, returnDate]);
    // setPickupTime("10:00 AM");
    // setReturnTime("10:00 AM");
  }, []);
  const calendarLocales = {
    en: enUS,
    ar: arEG,
    ru: ruRU,
  };
  const openDatePicker = () => {
    if (pickerRef.current) {
      pickerRef.current.open();
    }
  };
  const locationData = [
    {
      locationName: t("dubai_international_airport_terminal_1"),
      address: t("dubai_international_airport_terminal_1"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("dubai_international_airport_terminal_2"),
      address: t("dubai_international_airport_terminal_2"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("dubai_international_airport_terminal_3"),
      address: t("dubai_international_airport_terminal_3"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: t("al_maktoum_international_airport_dwc"),
      address: t("al_maktoum_international_airport_dwc"),
      locationIcon: <HiMiniHome />,
    },
    {
      locationName: "JBR",
      address: "JBR",
      locationIcon: <HiMiniHome />,
    },
  ];
  // const formatDate = (date) => {
  //   if (!date) return "";
  //   return date.toLocaleString("en-GB", {
  //     day: "numeric",
  //     month: "short",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //     hour12: true,
  //   });
  // };
  useEffect(() => {
    setFilteredLocations(locationData);
  }, []);
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
  // const handleLocationClick = (e, item) => {
  //   setPickupLocation(item.locationName)
  //   e.stopPropagation();
  // };
  const handleLocationClick = (e, item) => {
    e.stopPropagation();

    if (activeInput === "pickup") {
      setPickupLocation(item.locationName);
      setError("");
    } else if (activeInput === "drop") {
      setReturnLocation(item.locationName);
    }

    setShowLocations(false);
  };
  const timeSlots = [];
  const periods = ["AM", "PM"];

  periods.forEach((period) => {
    for (let hour = 0; hour < 12; hour++) {
      const displayHour = hour === 0 ? 12 : hour;
      timeSlots.push(`${displayHour}:00 ${period}`);
      timeSlots.push(`${displayHour}:30 ${period}`);
    }
  });
  const handleClose = () => setShowPickupTimeModal(false);
  const handleShowPickupTimeModal = () => setShowPickupTimeModal(true);
  const handleShowPickupTimeModalMobile = () =>
    setShowPickupTimeModalMobile(true);

  const handleShowReturnTimeModal = () => setShowReturnTimeModal(true);
  const handleInputClick = (inputType, heading) => {
    if (activeInput === inputType) {
      // Close the div only if the same input is clicked again
      setShowLocations(false);
      setActiveInput(null);
    } else {
      // Show the div with a new heading
      setShowLocations(true);
      setShowLocationHeading(heading);
      setActiveInput(inputType);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showLocationsRef.current &&
        !showLocationsRef.current.contains(event.target) &&
        event.target.id !== "pickupLocation" &&
        event.target.id !== "returnLocation"
      ) {
        setShowLocations(false);
        setActiveInput(null);
      }
    };

    if (showLocations) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [showLocations]);
  const handlePickUpTimeClick = () => {
    setShowPickupTimeModal(true);
  };
  const handleReturnTimeClick = () => {
    setShowReturnTimeModal(true);
  };
  const pickupDate = range[0]
    ? range[0].toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const returnDate = range[1]
    ? range[1].toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const handleShowCarsClick = (e) => {
    if (!pickupLocation && !rentalDetails.pickupLocation) {
      setError(t("please_select_a_pickup_location"));
      e.preventDefault();
      return;
    }
    setError("");

    const rentalData = {
      pickupLocation: pickupLocation || rentalDetails.pickupLocation,
      returnLocation:
        returnLocation || rentalDetails.returnLocation || pickupLocation,
      pickupDate: pickupDate || rentalDetails.pickupDate,
      returnDate: returnDate || rentalDetails.returnDate,
      pickupTime: pickupTime || rentalDetails.pickupTime,
      returnTime: returnTime || rentalDetails.returnTime,
    };

    dispatch(setRentalDetailDataSlice(rentalData));
    localStorage.setItem("refreshCars", "true");
    router.push("/cars");
  };
  const handleLocationSearch = (input) => {
    setLocationSearch(input);
    if (input === "") {
      setFilteredLocations(locationData);
      return;
    }
    const result = locationData.filter((loc) =>
      loc.locationName.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredLocations(result);
  };
  return (
    <div>
      {heading && <p style={styles.heading}>{t("rent_a_car")}</p>}

      <div
        className="d-md-flex justify-content-center pickupAndDropPicker flex-wrap position-relative "
        style={{ gap: "8px", paddingBottom: error ? "0px" : "24px" }}
      >
        {showLocations && (
          <div
            ref={showLocationsRef}
            className="position-absolute mobDisplayNone"
            style={{
              top: 70,
              ...(language === "ar" ? { right: 40 } : { left: 40 }),
              width: "70%",
            }}
          >
            <div
              style={{
                background: colors.white,
                boxShadow: "rgba(0, 0, 0, 0.75) 2px 2px 16px 1px",
                borderRadius: 10,
                padding: 20,
                paddingTop: 20,
                position: "relative",
                zIndex: 999,
                height: "70vh",
                overflow: "hidden",
              }}
              onClick={handleLocationClick}
            >
              <div className="fs-4 mb-4 fw-bold" style={{ paddingLeft: 16 }}>
                {showLocationHeading}
              </div>

              <div className="container-fluid">
                <div className="row" style={{ height: "100%" }}>
                  <div
                    className="col-md-6"
                    style={{
                      // overflowY: "auto",
                      height: "100%",
                    }}
                  >
                    <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div>

                    <div
                      style={{
                        overflowY: "auto",
                        height: "60vh",
                        paddingBottom: 50,
                      }}
                    >
                      {filteredLocations.map((item, index) => {
                        return (
                          <div
                            key={index}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              paddingBottom: 40,
                              cursor: "pointer",
                            }}
                            onClick={(e) => handleLocationClick(e, item)}
                            onMouseEnter={() => setHoveredItem(item)}
                            onMouseLeave={() => setHoveredItem("")}
                          >
                            <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                              {item.locationIcon}
                            </span>
                            <span className="mb-0">{item.locationName}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div
                    className="col-md-6"
                    style={
                      {
                        // height: "60vh", // Match the height of the first column
                        // overflowY: "hidden", // Disable scrolling
                        // paddingLeft: "20px", // Add some padding for spacing
                      }
                    }
                  >
                    {" "}
                    {hoveredItem ? (
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <div className="fs-2">{hoveredItem.locationIcon}</div>
                          <div>
                            <span className="pickupRetunSpanStyle me-2 mb-3">
                              <MdKey className="me-2" />
                              {t("24_hour_pickup")}
                            </span>
                            <span className="pickupRetunSpanStyle">
                              <TbArrowBack className="me-2" />
                              {t("24_hour_return")}
                            </span>
                          </div>
                        </div>
                        <p className="hoverAddressStyle">
                          {hoveredItem.locationName}
                        </p>
                        <p className="hoverDetailedAddressStyle">
                          {hoveredItem.address}
                        </p>
                      </div>
                    ) : (
                      <div className="text-muted"></div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="input-group customInputGroup mobDisplayNone">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="pickupLocation"
              value={pickupLocation}
              placeholder="Pickup Location"
              onClick={() => {
                handleInputClick("pickup", t("pick_up_locations"));
              }}
            />
            <label htmlFor="pickupLocation">{t("pick_up")}</label>
          </div>
        </div>
        <div className="input-group customInputGroup tabDisplayNone">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              value={pickupLocation}
              id="pickupLocation"
              placeholder="Pickup Location"
              onClick={() => {
                setPickupLocationModal(true);
                handleInputClick("pickup", t("pick_up_locations"));
              }}
            />
            <label htmlFor="pickupLocation">{t("pick_up")}</label>
          </div>
        </div>
        <div className="mb-0 input-group customInputGroup tabDisplayNone ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="returnLocation"
              value={returnLocation}
              placeholder="Drop Location"
              onClick={() => {
                setReturnLocationModal(true);
                handleInputClick("drop", t("return_locations"));
              }}
            />
            <label htmlFor="returnLocation">{t("return")}</label>
          </div>
        </div>

        <div className="mb-0 input-group customInputGroup mobDisplayNone ">
          <span className="input-group-text">
            <FaCar />
          </span>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              value={returnLocation}
              id="returnLocation"
              placeholder="Drop Location"
              onClick={() => handleInputClick("drop", t("return_locations"))}
            />
            <label htmlFor="returnLocation">{t("return")}</label>
          </div>
        </div>
        <CustomProvider locale={calendarLocales[language]}>
          <DateRangePicker
            format="d MMMM yyyy"
            ref={pickerRef}
            value={range}
            onChange={setRange}
            shouldDisableDate={(date) => date < new Date()}
            showMeridiem
            style={{ width: 0, background: "transparent" }}
            showShortcuts={false}
            renderFooter={() => null}
            showHeader={false}
            character="to"
          />
        </CustomProvider>
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
                    value={pickupDate || rentalDetails.pickupDate}
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("pick_up_date")}
                  </label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <MdOutlineAccessTimeFilled />
                </span>
                <div className="form-floating">
                  <input
                    value={pickupTime}
                    className="form-control"
                    placeholder="Pickup Date & Time"
                    onClick={handleShowPickupTimeModalMobile}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_date")}
                  </label>
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
                    value={returnDate || rentalDetails.returnDate}
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handlePickUpDateClick}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_date")}
                  </label>
                </div>
              </div>
              <div
                className="input-group customInputGroup"
                style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
              >
                <span className="input-group-text">
                  <MdOutlineAccessTimeFilled />
                </span>
                <div className="form-floating">
                  <input
                    value={returnTime}
                    className="form-control"
                    placeholder="Return Date"
                    onClick={handleShowReturnTimeModal}
                    readOnly
                  />
                  <label htmlFor="floatingInputGroup1">
                    {t("return_time")}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="datePickerGroup mobDisplayNone">
          <div className="d-flex">
            <div
              className="input-group customInputGroup pcInputFixedWidth"
              style={
                language === "ar"
                  ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                  : {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
              }
            >
              <span className="input-group-text">
                <FaCalendarAlt />
              </span>
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[0]) : ""}
                  value={pickupDate || rentalDetails.pickupDate}
                  className="form-control"
                  placeholder="Pickup Date & Time"
                  onClick={handlePickUpDateClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("pick_up_date")}</label>
              </div>
            </div>
            <div
              className="input-group customInputGroup pcTimeInputFixedWidth"
              style={
                language === "ar"
                  ? {
                      borderRight: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }
                  : {
                      borderLeft: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }
              }
            >
              {/* <span className="input-group-text">
                <FaCalendarAlt />
              </span> */}
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[0]) : ""}
                  value={pickupTime}
                  className="form-control"
                  placeholder="Pickup Date & Time"
                  onClick={handlePickUpTimeClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("pick_up_time")}</label>
              </div>
            </div>
          </div>

          <div className="d-flex">
            <div
              className="input-group customInputGroup pcInputFixedWidth"
              style={
                language === "ar"
                  ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                  : { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
              }
            >
              <span className="input-group-text">
                <FaCalendarAlt />
              </span>
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[1]) : ""}
                  value={returnDate || rentalDetails.returnDate}
                  className="form-control"
                  placeholder="Return Date"
                  onClick={handlePickUpDateClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("return_date")}</label>
              </div>
            </div>
            <div
              className="input-group customInputGroup pcTimeInputFixedWidth"
              style={
                language === "ar"
                  ? {
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderRight: 0,
                    }
                  : {
                      borderLeft: 0,
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                    }
              }
            >
              {/* <span className="input-group-text">
                <FaCalendarAlt />
              </span> */}
              <div className="form-floating">
                <input
                  // value={range[0] ? formatDate(range[1]) : ""}
                  value={returnTime}
                  className="form-control"
                  placeholder="Return Date"
                  onClick={handleReturnTimeClick}
                  readOnly
                />
                <label htmlFor="floatingInputGroup1">{t("return_time")}</label>
              </div>
            </div>
          </div>
        </div>
        <Link
          href="/cars"
          onClick={handleShowCarsClick}
          style={styles.showCarsBtn}
          className="tabDisplayNone"
        >
          {t("show_cars")}
        </Link>
        {showCarsButton && (
          <button
            // href="/cars"
            data-bs-dismiss="modal"
            onClick={handleShowCarsClick}
            style={styles.showCarsBtn}
          >
            {t("show_cars")}
          </button>
        )}
      </div>
      {error && (
        <p style={{ color: "red", marginLeft: 40, marginBottom: 0 }}>{error}</p>
      )}
      <Modal
        show={showDateModal}
        onHide={() => setShowDateModal(false)}
        fullscreen
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("choose_date")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomProvider locale={calendarLocales[language]}>
            <DateRangePicker
              showOneCalendar
              style={{ width: 0, background: "transparent" }}
              onOk={() => setShowDateModal(false)}
              onClose={() => setShowDateModal(false)}
              ref={pickerRef}
              shouldDisableDate={(date) => date < new Date()}
              value={range}
              onChange={setRange}
              format="d MMMM yyyy"
              defaultOpen
              showMeridiem
              character="to"
              locale={arEG}
            />
          </CustomProvider>
        </Modal.Body>
      </Modal>
      <Modal
        show={showPickupTimeModal}
        scrollable
        centered
        onHide={handleClose}
        backdrop
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("pick_up_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: pickupTime === time ? "black" : "#f9f9f9",
                  color: pickupTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setPickupTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            className="btn btn-secondary"
            onClick={() => setShowPickupTimeModal(false)}
          >
            Close
          </Button> */}
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowPickupTimeModal(false);
              setShowReturnTimeModal(true);
            }}
          >
            {t("select_return_date")}{" "}
            <FaArrowRightLong style={{ marginLeft: 15 }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPickupTimeModalMobile} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("pick_up_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: pickupTime === time ? "black" : "#f9f9f9",
                  color: pickupTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setPickupTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowPickupTimeModalMobile(false)}
          >
            {t("close")}
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowPickupTimeModalMobile(false);
              setShowReturnTimeModalMobile(true);
            }}
          >
            {t("select_return_date")}
            <FaArrowRightLong style={{ marginLeft: 15 }} />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showReturnTimeModal}
        scrollable
        centered
        onHide={handleClose}
        backdrop
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("return_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: returnTime === time ? "black" : "#f9f9f9",
                  color: returnTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setReturnTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowReturnTimeModal(false)}
          >
            {t("close")}
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowReturnTimeModal(false);
            }}
          >
            {t("save_changes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showReturnTimeModalMobile} fullscreen onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t("return_time")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {timeSlots.map((time, index) => (
              <div
                key={index}
                style={{
                  width: "calc(50% - 5px)",
                  padding: "10px 15px",
                  background: returnTime === time ? "black" : "#f9f9f9",
                  color: returnTime === time ? "white" : "black",
                  cursor: "pointer",
                  borderRadius: "15px",
                  textAlign: "center",
                }}
                onClick={() => {
                  setReturnTime(time);
                }}
              >
                {time}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => setShowReturnTimeModalMobile(false)}
          >
            {t("close")}
          </Button>
          <Button
            style={{
              background: colors.themeMain,
              color: colors.white,
              height: 45,
            }}
            onClick={() => {
              setShowReturnTimeModalMobile(false);
            }}
          >
            {t("save_changes")}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={pickupLocationModal}
        fullscreen
        onHide={handleClose}
        className="tabDisplayNone"
      >
        <Modal.Header>
          <Modal.Title>{t("pick_up_locations")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <div className="position-absolute"> */}
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <div className="input-box form-floating mt-0">
                  <input
                    className="form-control"
                    type="text"
                    value={locationSearch}
                    name="searchLocation"
                    onChange={(e) => handleLocationSearch(e.target.value)}
                    placeholder={t("search_location")}
                    id="searchLocation"
                  />
                  <label htmlFor="searchLocation" className="inputLabelBg">
                    {t("search_location")}
                  </label>
                </div>
                {filteredLocations.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: 12,
                        cursor: "pointer",
                        marginBottom: 20,
                        borderRadius: 30,
                        background:
                          activeInput === "pickup" &&
                          item.locationName === pickupLocation
                            ? "black"
                            : "#f9f9f9",
                        color:
                          activeInput === "pickup" &&
                          item.locationName === pickupLocation
                            ? "white"
                            : "black",
                      }}
                      onClick={(e) => {
                        handleLocationClick(e, item);
                      }}
                      onMouseEnter={() => setHoveredItem(item)}
                      onMouseLeave={() => setHoveredItem("")}
                    >
                      <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                        {item.locationIcon}
                      </span>
                      <span className="mb-0">{item.locationName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          {/* </div> */}
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setPickupLocationModal(false);
              setActiveInput(null);
            }}
          >
            {t("close")}
          </Button>
          <Button
            style={{ backgroundColor: colors.themeMain, color: colors.white }}
            onClick={() => {
              setPickupLocationModal(false);
              setReturnLocationModal(true);
              setActiveInput("drop");
            }}
          >
            {t("select_return_location")} <FaArrowRightLong className="ms-2" />
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={returnLocationModal}
        fullscreen
        onHide={handleClose}
        className="tabDisplayNone"
      >
        <Modal.Header>
          <Modal.Title>{t("return_locations")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="position-absolute">
            <div onClick={handleLocationClick}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    {/* <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div> */}
                    <div className="input-box form-floating mt-0">
                      <input
                        className="form-control"
                        type="text"
                        value={locationSearch}
                        name="searchLocation"
                        onChange={(e) => handleLocationSearch(e.target.value)}
                        placeholder={t("search_location")}
                        id="searchLocation"
                      />
                      <label htmlFor="searchLocation" className="inputLabelBg">
                        {t("search_location")}
                      </label>
                    </div>
                    {filteredLocations.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            padding: 12,
                            cursor: "pointer",
                            marginBottom: 20,
                            borderRadius: 30,
                            background:
                              activeInput === "drop" &&
                              item.locationName === returnLocation
                                ? "black"
                                : "#f9f9f9",
                            color:
                              activeInput === "drop" &&
                              item.locationName === returnLocation
                                ? "white"
                                : "black",
                          }}
                          onClick={(e) => {
                            handleLocationClick(e, item);
                          }}
                          onMouseEnter={() => setHoveredItem(item)}
                          onMouseLeave={() => setHoveredItem("")}
                        >
                          <span className="me-2 fs-4 d-flex justify-content-center align-items-center">
                            {item.locationIcon}
                          </span>
                          <span className="mb-0">{item.locationName}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="justify-content-between">
          <Button
            className="btn btn-secondary"
            onClick={() => {
              setReturnLocationModal(false);
              setActiveInput(null);
            }}
          >
            {t("close")}
          </Button>
          <Button
            style={{ backgroundColor: colors.themeMain, color: colors.white }}
            onClick={() => {
              setReturnLocationModal(false);
              setActiveInput(null);
            }}
          >
            {t("save_changes")}
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
