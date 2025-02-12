// "use client"
// import React, { useState, useEffect } from "react";
// import { fonts } from "../../../public/fonts/fonts";
// import { colors } from "../../../public/colors/colors";
// import { MdOutlineCheck } from "react-icons/md";
// import { IoLanguageSharp } from "react-icons/io5";

// const LanguageModal = ({ showModal, closeModal, selectLanguage }) => {
//   const [windowWidth, setWindowWidth] = useState(window.innerWidth);

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowWidth(window.innerWidth);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       const modal = document.getElementById("languageModal");
//       if (modal && !modal.contains(event.target)) {
//         closeModal();
//       }
//     };

//     if (showModal) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [showModal, closeModal]);

//   if (!showModal) return null;

//   const modalWidth = windowWidth < 1200 ? "90%" : "50%";

//   return (
//     <div style={styles.overlay}>
//       <div id="languageModal" style={{ ...styles.modal, width: modalWidth }}>
//         <button onClick={closeModal} style={styles.closeButton}>
//           X
//         </button>
//         <div className="d-flex align-items-center">
//           <div className="bg-dark text-white px-3 py-2 rounded">
//             <IoLanguageSharp className="me-2 mb-1" />
//             <h5 className="mb-0 d-inline">Language</h5>
//           </div>
//         </div>

//         <div className="container mt-5">
//           <div className="row">
//             <div className="col-md-6">
//               <div
//                 onClick={() => selectLanguage("English")}
//                 style={styles.button}
//               >
//                 <div>
//                   <p style={styles.languageName}>English</p>
//                   <p style={styles.languageCountry}>United States</p>
//                 </div>
//                 <MdOutlineCheck size={30} />
//               </div>
//             </div>
//             <div className="col-md-6">
//               <div
//                 onClick={() => selectLanguage("Arabic")}
//                 style={styles.button}
//               >
//                 <div>
//                   <p style={styles.languageName}>Arabic</p>
//                   <p style={styles.languageCountry}>United Arab Emirates</p>
//                 </div>
//                 <MdOutlineCheck size={30} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   overlay: {
//     position: "fixed",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   modal: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "8px",
//     position: "relative",
//   },
//   closeButton: {
//     position: "absolute",
//     top: "10px",
//     right: "10px",
//     backgroundColor: "transparent",
//     border: "none",
//     fontSize: "20px",
//     cursor: "pointer",
//   },

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

import React, { useState, useEffect } from "react";
import { fonts } from "../../../public/fonts/fonts";
import { colors } from "../../../public/colors/colors";
import { MdOutlineCheck } from "react-icons/md";
import { IoLanguageSharp } from "react-icons/io5";

const LanguageModal = ({ showModal, closeModal, selectLanguage }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  // Use effect to handle window width only on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Only run this on the client
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const modal = document.getElementById("languageModal");
      if (modal && !modal.contains(event.target)) {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, closeModal]);

  if (!showModal) return null;

  const modalWidth = windowWidth < 1200 ? "90%" : "50%";

  return (
    <div style={styles.overlay}>
      <div id="languageModal" style={{ ...styles.modal, width: modalWidth }}>
        <button onClick={closeModal} style={styles.closeButton}>
          X
        </button>
        <div className="d-flex align-items-center">
          <div className="bg-dark text-white px-3 py-2 rounded">
            <IoLanguageSharp className="me-2 mb-1" />
            <h5 className="mb-0 d-inline">Language</h5>
          </div>
        </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6">
              <div
                onClick={() => selectLanguage("English")}
                style={styles.button}
              >
                <div>
                  <p style={styles.languageName}>English</p>
                  <p style={styles.languageCountry}>United States</p>
                </div>
                <MdOutlineCheck size={30} />
              </div>
            </div>
            <div className="col-md-6">
              <div
                onClick={() => selectLanguage("Arabic")}
                style={styles.button}
              >
                <div>
                  <p style={styles.languageName}>Arabic</p>
                  <p style={styles.languageCountry}>United Arab Emirates</p>
                </div>
                <MdOutlineCheck size={30} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex:1,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  },

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
