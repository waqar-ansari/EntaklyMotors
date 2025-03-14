// import React, { useState, useEffect } from "react";
// import { fonts } from "../../../public/fonts/fonts";
// import { colors } from "../../../public/colors/colors";
// import { MdOutlineCheck } from "react-icons/md";
// import { IoLanguageSharp } from "react-icons/io5";

// const LanguageModal = ({ selectLanguage }) => {
//   return (
//     <div
//       className="modal fade"
//       id="languageModal"
//       tabindex="-1"
//       aria-labelledby="languageModalLabel"
//       aria-hidden="true"
//       style={{zIndex:999999,}}
//     >
//       <div className="modal-dialog modal-lg modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header border-0">
//             <div className="bg-dark text-white px-3 py-2 rounded">
//               <IoLanguageSharp className="me-2 mb-1" />
//               <h5 className="mb-0 d-inline">Language</h5>
//             </div>
//             <button
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="modal-body">
//             <div className="container my-5">
//               <div className="row">
//                 <div className="col-md-6">
//                   <div
//                     onClick={() => selectLanguage("English")}
//                     style={styles.button}
//                   >
//                     <div>
//                       <p style={styles.languageName}>English</p>
//                       <p style={styles.languageCountry}>United States</p>
//                     </div>
//                     <MdOutlineCheck size={30} />
//                   </div>
//                 </div>
//                 <div className="col-md-6">
//                   <div
//                     onClick={() => selectLanguage("Arabic")}
//                     style={styles.button}
//                   >
//                     <div>
//                       <p style={styles.languageName}>Arabic</p>
//                       <p style={styles.languageCountry}>United Arab Emirates</p>
//                     </div>
//                     <MdOutlineCheck size={30} />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   button: {
//     border: "2px solid black",
//     padding: "10px",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     margin: "5px",
//     cursor: "pointer",
//     borderRadius: "10px",
//     fontSize: "16px",
//   },
//   languageName: {
//     fontFamily: fonts.helvetica400,
//     color: colors.black,
//     marginBottom: 5,
//   },
//   languageCountry: {
//     fontFamily: fonts.helvetica400,
//     color: colors.grey,
//     marginBottom: 0,
//   },
// };

// export default LanguageModal;
import React, { useContext, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { MdOutlineCheck } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";
import { fonts } from "../../../public/fonts/fonts";
import { colors } from "../../../public/colors/colors";
import { LanguageContext } from "../../context/LanguageProvider";

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
      <Modal.Header closeButton >
        <div className="bg-dark text-white px-3 py-2 rounded">
        <IoLanguageSharp style={{ marginRight: "8px", marginLeft: "0" }} className="mb-1" />
          <h5 className="mb-0 d-inline">{t("language")}</h5>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div className="container my-5">
          <div className="row">
            <div className="col-md-4">
              <div onClick={() => changeLanguage("en")} style={styles.button}>
                <div>
                  <p style={styles.languageName}>English</p>
                  <p style={styles.languageCountry}>United States</p>
                </div>
                {language==="en" && <MdOutlineCheck size={30} />}
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={() => changeLanguage("ar")} style={styles.button}>
                <div>
                  <p style={styles.languageName}>Arabic</p>
                  <p style={styles.languageCountry}>United Arab Emirates</p>
                </div>
                {language==="ar" &&<MdOutlineCheck size={30} />}
              </div>
            </div>
            <div className="col-md-4">
              <div onClick={() => changeLanguage("ru")} style={styles.button}>
                <div>
                  <p style={styles.languageName}>Russian</p>
                  <p style={styles.languageCountry}>Russia</p>
                </div>
                {language==="ru" &&<MdOutlineCheck size={30} />}
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
    marginBottom: 5,
  },
  languageCountry: {
    fontFamily: fonts.helvetica400,
    color: colors.grey,
    marginBottom: 0,
  },
};

export default LanguageModal;
