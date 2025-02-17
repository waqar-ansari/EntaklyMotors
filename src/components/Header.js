"use client";
import Image from "next/image";
import { colors } from "../../public/colors/colors";
import "../styles/globals.css";
import { fonts } from "../../public/fonts/fonts";
import LanguageModal from "./modals/LanguageModal";
import { useState } from "react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import PickupAndDropPicker from "./PickupAndDropPicker";
import PickerModal from "./modals/PickerModal";
import { FaUserCircle } from "react-icons/fa";

const Header = ({ headerPickupAndDrop }) => {
  const [showModal, setShowModal] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openPickerModal = () => setShowPickerModal(true);
  const closePickerModal = () => setShowPickerModal(false);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    closeModal();
  };
  const token = "abcd";
  return (
    <div>
      <PickerModal showModal={showPickerModal} closeModal={closePickerModal} />
      <div
        style={{ background: colors.themeMain, fontFamily: fonts.helvetica400 }}
      >
        <div className="container-xxl">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <Link className="navbar-brand" href="/">
                <Image
                  src="/icons/entaklyLogo.jpeg"
                  alt="Logo"
                  width={100}
                  height={81}
                  priority
                />
              </Link>
              {headerPickupAndDrop && (
                <div
                  data-bs-toggle="modal"
                  data-bs-target="#pickerModal"
                  className="pickupAndDropPickerInHeader"
                  style={styles.pickupAndDropPickerInHeader}
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
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarNav"
              >
                <ul className="navbar-nav">
                  <li className="nav-item d-flex align-items-center me-4">
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
                  <li className="nav-item d-flex align-items-center me-4">
                    <Image
                      src="/icons/globe.png"
                      alt="Logo"
                      width={24}
                      height={24}
                      priority
                    />
                    <a
                      data-bs-toggle="modal"
                      data-bs-target="#languageModal"
                      className="nav-link text-white text-decoration-none"
                    >
                      EN | د.إ
                    </a>
                  </li>

                  {token ? (
                    <li className="nav-item d-flex align-items-center">
                      <FaUserCircle style={{color:colors.white, fontSize:22}}/>

                      <Link
                        href="/auth/login&Signup"
                        className="nav-link text-white text-decoration-none"
                      >
                        Waqar
                      </Link>
                    </li>
                  ) : (
                    <li className="nav-item d-flex align-items-center">
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
