import React from "react";
import PickupAndDropPicker from "../PickupAndDropPicker";

const PickerModal = () => {
  return (
    <div
      className="modal fade"
      id="pickerModal"
      tabindex="-1"
      aria-labelledby="pickerModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-fullscreen" style={styles.modalHeight}>
        <div className="modal-content">
          <div className="modal-body" style={styles.modalbody}>
            <PickupAndDropPicker heading={false} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PickerModal;

const styles = {
  modalHeight: {
    height: 150,
  },
  modalbody: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
};
