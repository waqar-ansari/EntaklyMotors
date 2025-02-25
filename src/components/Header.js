"use client";
import Image from "next/image";
import { colors } from "../../public/colors/colors";
// import "../styles/globals.css";
import { fonts } from "../../public/fonts/fonts";
import LanguageModal from "./modals/LanguageModal";
import { useState } from "react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import PickupAndDropPicker from "./PickupAndDropPicker";
import PickerModal from "./modals/PickerModal";
import { FaUserCircle } from "react-icons/fa";
import FloatingWhatsapp from "./FloatingWhatsapp";
import { Modal, Button } from "react-bootstrap";

const Header = ({ headerPickupAndDrop }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);

  const openPickerModal = () => setShowPickerModal(true);
  const closePickerModal = () => setShowPickerModal(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    closeModal();
  };
  const token = "abcd";
  return (
    <div>
      <FloatingWhatsapp />
      <PickerModal showModal={showPickerModal} closeModal={closePickerModal} />
      <div
        style={{ background: colors.themeMain, fontFamily: fonts.helvetica400 }}
      >
        <div className="container-xxl">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid headerGapInCarsPageMobile">
              <Link className="navbar-brand py-0" href="/">
                <Image
                  src="/icons/entaklyLogo.svg"
                  alt="Logo"
                  width={200}
                  height={53}
                  priority
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
                      New York LGA Airport - New York LGA Airport
                    </p>
                    <p className="mb-0" style={styles.dateAndTime}>
                      13. Apr | 8:00 AM - 15. Apr | 8:30 AM
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
                      href="#"
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
                  {token ? (
                    <li className="nav-item d-flex align-items-center mb-0">
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
                    <li className="nav-item d-flex align-items-center mb-0">
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
                      href="#"
                    >
                      Manage Booking
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
                  {token ? (
                    <li className="nav-item d-flex align-items-center mb-0">
                      <FaUserCircle
                        style={{ color: colors.white, fontSize: 22 }}
                      />

                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        Waqar
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
                        Login | Register
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
                data-bs-toggle="modal"
                data-bs-target="#pickerModal"
                style={styles.pickupAndDropPickerInHeader}
                className="pickupAndDropPickerInHeader tabDisplayNone mt-3"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div style={{ marginRight: 30 }}>
                    <p className="mb-0" style={styles.location}>
                      New York LGA Airport - New York LGA Airport
                    </p>
                    <p className="mb-0" style={styles.dateAndTime}>
                      13. Apr | 8:00 AM - 15. Apr | 8:30 AM
                    </p>
                  </div>
                  <FaPen />
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
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
