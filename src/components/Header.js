"use client";
import Image from "next/image";
import { colors } from "../../public/colors/colors";
import "../styles/globals.css";
import { fonts } from "../../public/fonts/fonts";
import LanguageModal from "./modals/LanguageModal";
import { useState } from "react";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const selectLanguage = (language) => {
    setSelectedLanguage(language);
    closeModal();
  };
  return (
    <div
      style={{ background: colors.themeMain, fontFamily: fonts.helvetica400 }}
    >
      <div className="container-xxl">
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <Image
                src="/icons/entaklyLogo.jpeg"
                alt="Logo"
                width={100}
                height={81}
                priority
              />
            </a>
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
                    className="nav-link active text-white"
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
                  <a className="nav-link text-white" onClick={openModal}>
                    EN | د.إ
                  </a>
                </li>
                <li className="nav-item d-flex align-items-center">
                  <Image
                    src="/icons/user.png"
                    alt="Logo"
                    width={24}
                    height={24}
                    priority
                  />
                  <a className="nav-link text-white" href="#">
                    Login | Register
                  </a>
                </li>
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
  );
};
export default Header;
