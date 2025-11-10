import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ConfirmationModal.css';

// confirm delete modal
const ConfirmationModal = ({ open, close, confirm }) => {

    // don't render until opened
    if (!open) return null;

    return (
        // confirm delete modal
        <Modal show={open} onHide={close} centered >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Modal.Body>
            <Modal.Footer>
                <Button type = "button" className = 'confirm-button' variant="danger" onClick={confirm}>
                    Confirm
                </Button>
                <Button className = 'cancel-button' variant="secondary" onClick={close}>
                    cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;