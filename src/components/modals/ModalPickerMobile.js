import { Modal, Button } from "react-bootstrap";
import Link from "next/link";
import PickupAndDropPicker from "../PickupAndDropPicker";
import "./modalPickerMobile.css";
import { colors } from "../../../public/colors/colors";


const ModalPickerMobile = ({ show, onHide, showCarsButton = true }) => {

  return (
    <Modal
      show={show}
      onHide={onHide}
      fullscreen
      className="mobileCalendarStyles"
    >
      <Modal.Body scrollable>
        <PickupAndDropPicker showCarsButton={false} />
      </Modal.Body>
       <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
       {/* {showCarsButton && (
          <Link href="/cars" style={styles.showCarsBtn}
          >
            Show cars
          </Link>
        )} */}
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
