import React, {useState} from "react";
import {Modal} from 'react-bootstrap';

const ModalTemplate = ({ title, body, footer, open, close}) => {
    if (!open) return null;

    return (
        <Modal show={open} onHide={close} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        </Modal>
    );
}

export default ModalTemplate;
