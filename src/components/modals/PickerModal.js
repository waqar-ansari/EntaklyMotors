import React from "react";
import PickupAndDropPicker from "../PickupAndDropPicker";

const PickerModal = ({closePickerModal}) => {
  console.log(closePickerModal,"close picker modal");
  
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
            <PickupAndDropPicker heading={false} closePickerModal={closePickerModal} />
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
