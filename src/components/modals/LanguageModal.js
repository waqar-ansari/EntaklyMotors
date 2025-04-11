import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MdOutlineCheck } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";
import { fonts } from "../../../public/fonts/fonts";
import { colors } from "../../../public/colors/colors";
import { LanguageContext } from "../../context/LanguageProvider";
import Image from "next/image";

const LanguageModal = ({ showModal, closeModal, selectLanguage }) => {
  const { t, changeLanguage, language } = useContext(LanguageContext);
  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      selectLanguage={selectLanguage}
      size="lg"
      aria-labelledby="languageModalLabel"
      centered
      backdrop="true"
      dir="ltr"
      className="language-modal"
    >
      <Modal.Header closeButton>
        <div className="bg-dark text-white px-3 py-2 rounded">
          <IoLanguageSharp
            style={{ marginRight: "8px", marginLeft: "0" }}
            className="mb-1"
          />
          <h5 className="mb-0 d-inline">{t("language")}</h5>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <div onClick={() => changeLanguage("en")} style={styles.button}>
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <p style={styles.languageName} className="me-2">
                      English
                    </p>
                    <Image
                      src="/icons/usaFlag.png"
                      alt="globe"
                      width={25}
                      height={15}
                    />
                  </div>
                  <p style={styles.languageCountry}>United States</p>
                </div>
                {language === "en" && <MdOutlineCheck size={30} />}
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={() => changeLanguage("ar")} style={styles.button}>
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <p style={styles.languageName} className="me-2">Arabic</p>
                    <Image
                        src="/icons/uaeFlag.png"
                        alt="globe"
                        width={25}
                        height={15}
                      />
                  </div>
                  <p style={styles.languageCountry}>United Arab Emirates</p>
                </div>
                {language === "ar" && <MdOutlineCheck size={30} />}
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={() => changeLanguage("ru")} style={styles.button}>
                <div>
                  <div className="d-flex align-items-center mb-2">
                    <p style={styles.languageName} className="me-2">Russian</p>
                    <Image
                        src="/icons/russiaFlag.png"
                        alt="globe"
                        width={25}
                        height={15}
                      />
                  </div>
                  <p style={styles.languageCountry}>Russia</p>
                </div>
                {language === "ru" && <MdOutlineCheck size={30} />}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const styles = {
  button: {
    border: "2px solid black",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "5px",
    cursor: "pointer",
    borderRadius: "10px",
    fontSize: "16px",
  },
  languageName: {
    fontFamily: fonts.helvetica400,
    color: colors.black,
    marginBottom: 0,
  },
  languageCountry: {
    fontFamily: fonts.helvetica400,
    color: colors.grey,
    marginBottom: 0,
  },
};

export default LanguageModal;
