import React from "react";
import { Modal } from "react-bootstrap";
import "./Modal.scss";

function CustomModal({ title, isModalOpen, handleClose, children }) {
  return (
    <>
      <Modal
        show={isModalOpen}
        onHide={handleClose}
        backdrop={true}
        keyboard={false}
      >
        {title && (
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
        )}

        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModal;
