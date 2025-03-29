import React from "react";
import PickupAndDropPicker from "../PickupAndDropPicker";

const PickerModal = () => {
  const closeModal = () => {
    const modalElement = document.getElementById("pickerModal");
    if (modalElement) {
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      if (modalInstance) {
        modalInstance.hide();
      }
    }
  };
  
  return (
    <div
      className="modal fade"
      id="pickerModal"
      tabIndex="-1"
      aria-labelledby="pickerModalLabel"
      aria-hidden="true"
    >
      <div
        style={styles.modalHeight}
        className="modal-dialog modal-fullscreen pickerModalHeight"
      >
        <div className="modal-content">
          <div
            style={styles.modalbody}
            className="modal-body pickerModalBodyFlex"
          >
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
  },
};
