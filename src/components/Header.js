"use client";
import Image from "next/image";
import { colors } from "../../public/colors/colors";
// import "../styles/globals.css";
import { fonts } from "../../public/fonts/fonts";
import LanguageModal from "./modals/LanguageModal";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import PickupAndDropPicker from "./PickupAndDropPicker";
import PickerModal from "./modals/PickerModal";
import { FaUserCircle } from "react-icons/fa";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ModalPickerMobile from "./modals/ModalPickerMobile";
import { useTranslation } from "@/context/LanguageProvider";
import { clearSelectedAddons } from "@/redux/slices/selectedAddonSlice";
import { clearSelectedPackage } from "@/redux/slices/selectedPackageSlice";
import { useRouter } from "next/router";

const Header = ({ headerPickupAndDrop }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  // const closePickerModal = () => {
  //   // This will close the Bootstrap modal
  //   const modal = document.getElementById('pickerModal');
  //   if (modal) {
  //     const bootstrapModal = bootstrap.Modal.getInstance(modal);
  //     if (bootstrapModal) {
  //       bootstrapModal.hide();
  //     } else {
  //       // If no instance exists, create one and hide it
  //       new bootstrap.Modal(modal).hide();
  //     }
  //   }
  // };
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const { user } = useSelector((state) => state.auth);
  const profile = useSelector((state) => state.profile);
  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    closeModal();
  };
  const { t, language } = useTranslation();
  const rentalDetail = useSelector((state) => state.rentalDetail);
    const [localUserId, setLocalUserId] = useState(null);

  console.log(profile, "profile from header");
    useEffect(() => {
      setLocalUserId(localStorage.getItem("userId"));
    }, []);
  return (
    <div>
      <PickerModal/>
      <div
        style={{ background: colors.themeMain, fontFamily: fonts.helvetica400 }}
      >
        <div className="container-xxl">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid headerGapInCarsPageMobile">
              <Link className="navbar-brand py-0 mx-0" href="/">
                <Image
                  src="/icons/entaklyLogo.svg"
                  alt="Logo"
                  width={200}
                  height={53}
                  priority
                  className="headerLogo"
                />
              </Link>
              {headerPickupAndDrop && (
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#pickerModal"
                  style={styles.pickupAndDropPickerInHeader}
                  className="pickupAndDropPickerInHeader mobDisplayNone"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div style={{ marginRight: 30 }}>
                      <p className="mb-0" style={styles.location}>
                        {rentalDetail.pickupLocation
                          ? rentalDetail.pickupLocation
                          : "Select Pickup Location"}{" "}
                        -{" "}
                        {rentalDetail.returnLocation
                          ? rentalDetail.returnLocation
                          : "Select Return Location"}
                      </p>
                      <p className="mb-0" style={styles.dateAndTime}>
                        {rentalDetail.pickupDate}{" "}
                        {rentalDetail.pickupTime
                          ? `| ${rentalDetail.pickupTime}`
                          : ""}{" "}
                        - {rentalDetail.returnDate}{" "}
                        {rentalDetail.returnTime
                          ? `| ${rentalDetail.returnTime}`
                          : ""}
                      </p>
                    </div>
                    <FaPen />
                  </div>
                </div>
              )}
              <div className="mobileHeaderIcons">
                <ul className="navbar-nav mt-0 flex-row">
                  <li className="nav-item d-flex align-items-center me-sm-4 me-2 mb-0">
                    <a
                      className="nav-link active text-white text-decoration-none"
                      aria-current="page"
                      href="/auth/login&Signup"
                    >
                      <Image
                        src="/icons/car.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        priority
                      />
                    </a>
                  </li>
                  <li className="nav-item d-flex align-items-center me-sm-4 me-2 mb-0">
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#languageModal"
                      className="nav-link text-white text-decoration-none"
                      onClick={openModal}
                    >
                      <Image
                        src="/icons/globe.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        priority
                      />
                    </a>
                  </li>
                  {localUserId ? (
                    <li className="nav-item d-flex align-items-center ms-2 mb-0">
                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        <FaUserCircle
                          style={{ color: colors.white, fontSize: 22 }}
                        />
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item d-flex align-items-center ms-2 mb-0">
                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        <Image
                          src="/icons/user.png"
                          alt="Logo"
                          width={24}
                          height={24}
                          priority
                        />
                      </Link>
                    </li>
                  )}
                </ul>
              </div>

              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav mt-0">
                  <li className="nav-item d-flex align-items-center me-sm-4 me-2 mb-0">
                    <Image
                      src="/icons/car.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      priority
                    />
                    <a
                      className="nav-link active text-white text-decoration-none"
                      aria-current="page"
                      href={`/auth/login&Signup`}
                    >
                      {t("manage_booking")}
                    </a>
                  </li>
                  <li className="nav-item d-flex align-items-center me-sm-4 me-2 mb-0">
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#languageModal"
                      className="nav-link text-white text-decoration-none"
                      onClick={openModal}
                    >
                      <Image
                        src="/icons/globe.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        style={{ marginRight: 10 }}
                        priority
                      />
                      EN | د.إ
                    </a>
                  </li>
                  {localUserId ? (
                    <li
                      className={`nav-item d-flex align-items-center mb-0 ${
                        language === "ar" ? "me-sm-4 me-2" : ""
                      }`}
                    >
                      <FaUserCircle
                        style={{ color: colors.white, fontSize: 22 }}
                      />

                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        {/* {user.fullName} */}
                        
                        {/* {user ? user?.user?.fullname : "Guest"} */}
                        {
                          localUserId? profile.fullname : "Guest"
                        }
                        
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item d-flex align-items-center mb-0">
                      <Image
                        src="/icons/user.png"
                        alt="Logo"
                        width={24}
                        height={24}
                        priority
                      />

                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        {t("login_register")}
                      </Link>
                    </li>
                  )}
                </ul>

                <LanguageModal
                  showModal={showModal}
                  closeModal={closeModal}
                  selectLanguage={selectLanguage}
                />
              </div>
            </div>
            {headerPickupAndDrop && (
              <div
                // data-bs-toggle="modal"
                // data-bs-target="#pickerModal"
                style={styles.pickupAndDropPickerInHeader}
                className="pickupAndDropPickerInHeader tabDisplayNone mt-3"
                onClick={() => setShow(true)}
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ marginRight: 30 }}>
                    <p className="mb-0" style={styles.location}>
                      {/* {rentalDetail.pickupLocation} - {rentalDetail.returnLocation} */}

                      {rentalDetail.pickupLocation
                          ? rentalDetail.pickupLocation
                          : "Select Pickup Location"}{" "}
                        -{" "}
                        {rentalDetail.returnLocation
                          ? rentalDetail.returnLocation
                          : "Select Return Location"}
                    </p>
                    <p className="mb-0" style={styles.dateAndTime}>
                    {rentalDetail.pickupDate}{" "}
                        {rentalDetail.pickupTime
                          ? `| ${rentalDetail.pickupTime}`
                          : ""}{" "}
                        - {rentalDetail.returnDate}{" "}
                        {rentalDetail.returnTime
                          ? `| ${rentalDetail.returnTime}`
                          : ""}
                    </p>
                  </div>
                  <FaPen />
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
      <ModalPickerMobile show={show} onHide={() => setShow(false)} />
    </div>
  );
};
export default Header;
const styles = {
  pickupAndDropPickerInHeader: {
    color: "white",
    background: "#3e3a85",
    padding: "6px 20px",
    borderRadius: 50,
    marginLeft: 50,
  },
  dateAndTime: {
    fontFamily: fonts.helvetica400,
    fontSize: 12,
    fontWight: 300,
  },
  location: {
    fontFamily: fonts.helvetica400,
    fontSize: 12,
  },
};
