import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./commonModal.css";

const CommonModal = ({ show, handleClose, content }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={styles.modalContainer}
      centered
    >
      <Modal.Header closeButton style={styles.modalHeader}></Modal.Header>
      <Modal.Body>
        {content}
        {/* <div dangerouslySetInnerHTML={{ __html: content }} /> */}
      </Modal.Body>
    </Modal>
  );
};

export default CommonModal;
const styles = {
  modalContainer: {
    padding: 48,
  },
  modalHeader: {
    borderBottom: 0,
    padding: 0,
  },
};
