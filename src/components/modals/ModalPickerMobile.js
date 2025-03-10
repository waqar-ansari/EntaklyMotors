import { Modal, Button } from "react-bootstrap";
import Link from "next/link";
import PickupAndDropPicker from "../PickupAndDropPicker";
import "./modalPickerMobile.css";
import { colors } from "../../../public/colors/colors";
import { setRentalDetailDataSlice } from "@/redux/slices/rentalDetailSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";


const ModalPickerMobile = ({ show, onHide, showCarsButton = true }) => {

  const [isShowCarsTriggered, setIsShowCarsTriggered] = useState(false);
  const handleShowCarsClick = () => {
    setIsShowCarsTriggered(true);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      className="mobileCalendarStyles"
    >
      <Modal.Body scrollable>
        <PickupAndDropPicker showCarsButton={false} onShowCarsClick={handleShowCarsClick}  />
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        {showCarsButton && (
          <Link href="/cars" style={styles.showCarsBtn}
          onClick={()=>handleShowCarsClick()}
          >
            Show cars
          </Link>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPickerMobile;

const styles = {
  showCarsBtn: {
    textDecoration: "none",
    background: colors.themeMain,
    color: "#fff",
    padding: "8px 12px",
    borderRadius: "4px",
  },
};
