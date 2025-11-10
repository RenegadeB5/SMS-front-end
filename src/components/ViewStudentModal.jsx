import React, { useState, useRef }from 'react';
import { Button, Form } from 'react-bootstrap';
import './ViewStudentModal.css';
import ConfirmationModal from './ConfirmationModal.jsx';
import ModalTemplate from './ModalTemplate.jsx';
import API_interface from './API.js';

// Modal for viewing student details
function ViewStudentModal({ open, close, link, removeStudent}) {
    
    // student being edited
    const [isEditing, setIsEditing] = useState(false);

    // show confirmation modal
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // form validated
    const [validated, setValidated] = useState(false);

    // student being viewed
    const [student, setStudent] = useState(null);

    // show error modal
    const [showErrorModal, setShowErrorModal] = useState(false);

    // error message
    const [errorMessage, setErrorMessage] = useState("");

    // close error modal
    const closeShowErrorModal = () => {
        setShowErrorModal(false);
        setShowConfirmModal(false);
        setIsEditing(false);
        removeStudent();
        close();
    }

    // fetch student by ID
    React.useEffect(() => {
        const fetchStudent = async () => {
            const response = await API_interface.GET(link);
            if (response.status === 200) {
                setStudent(response.data);
            }
            else {
                // show error modal if error
                setErrorMessage(`(${response.status}) ${response.data}`)
                setShowErrorModal(true);
            }
            
        };
        fetchStudent();
    }, [link]);

    // call put api method with student
    const editStudent = (event) => {
        const updatedStudent = {
            first_name: event.target.first_name.value,
            middle_name: event.target.middle_name.value,
            last_name: event.target.last_name.value,
            DOB: event.target.DOB.value
        };
        console.log("Editing student:", updatedStudent);
        API_interface.PUT(student._links.update.href, updatedStudent).then((response) => {
            if (response.status === 200) {
                close();
                setIsEditing(false);
            }
            else {
                // if error show error modal
                setErrorMessage(`(${response.status}) ${response.data}`)
                setShowErrorModal(true);
            }
        });
    };
       
 
    // call delete api method with student ID
    const deleteStudent = (id) => {
        API_interface.DELETE(student._links.delete.href, id).then((response) => {
            if (response.status === 204) {
                removeStudent();
                setShowConfirmModal(false);
                close();
            }
            else { 
                // show error
                setErrorMessage(`(${response.status}) ${response.data}`)
                setShowErrorModal(true);
            }
            

        });
    };
 
    // check validity of form
    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            // edit student if form is valid
            editStudent(event);
        }

        setValidated(true);
        
    };
 
    // confirm deletion button is pressed
    const confirmDelete = () => {
        console.log("Deleting student with ID:", student.id);
        deleteStudent(student.id);
    }
 
    // if student was successfully fetched
    if(student) {
        return (
            <> 
                {/* show edit view of modal */}
                {!isEditing ? (
                    <>
                        <ModalTemplate
                        
                            open={open}
                            close={close}
                            title={"Student Details"}
                            body={
                                <>
                                    <p><strong>Student ID:</strong> {student.id}</p>
                                    <p><strong>First Name:</strong> {student.first_name}</p>
                                    <p><strong>Middle Name:</strong> {student.middle_name}</p>
                                    <p><strong>Last Name:</strong> {student.last_name}</p>
                                    <p>
                                        <strong>Date of Birth:</strong> 
                                        {new Date(student.DOB).toLocaleDateString('en-US', {
                                            month: '2-digit',
                                            day: '2-digit',
                                            year: 'numeric'
                                        })}
                                    </p>

                                    
                                </>
                            }
                            footer={
                                <>
                                    <Button type = "button" variant="primary" onClick={() => setIsEditing(true)}>
                                        Edit
                                    </Button>
                                    <Button type = "button" variant="danger" onClick={() => {setShowConfirmModal(true); open = false;}}>
                                        Delete
                                    </Button>
                                </>
                            }
                            
                        />
                        
                        <ModalTemplate />
                        
                    </>
                ): 
                // show details view of student
                (
                    <ModalTemplate
                        open={open}
                        close={() => {setIsEditing(false); close();}}
                        title={"Edit Student"}
                        body={
                            <Form noValidate validated={validated} id='edit-student-form' onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label className = 'mt-3'>First Name: </Form.Label>
                                    <Form.Control type="text" className = 'input' id = 'first_name' name='first_name' placeholder="Enter first name" defaultValue={student.first_name} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a first name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className = 'mt-3'>Middle Name: </Form.Label>
                                    <Form.Control type="text" className = 'input' id = 'middle_name' name='middle_name' placeholder="Enter middle name" defaultValue={student.middle_name} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className = 'mt-3'>Last Name: </Form.Label>
                                    <Form.Control type="text" className = 'input' id = 'last_name' name='last_name' placeholder="Enter last name" defaultValue={student.last_name} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a last name.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group>    
                                    <Form.Label className = 'mt-3'>Date of Birth: </Form.Label>
                                    <Form.Control type="date" className = 'input' id = 'DOB' name='DOB' defaultValue={new Date(student.DOB).toISOString().split('T')[0]} required />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a date of birth.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        }
                        footer={
                            <>
                                <Button type="submit" variant="success" className = 'save-button' form='edit-student-form'>
                                    Save
                                </Button>
                                <Button type = "button" variant="danger" className = 'cancel-button' onClick={() => {setIsEditing(false);}}>
                                    Cancel
                                </Button>
                            </>
                        }
                    />

                )}
                {/* confirmation modal */}
                <ConfirmationModal
                    open={showConfirmModal}
                    close={() => setShowConfirmModal(false)}
                    confirm={confirmDelete}
                />

                
            </>
        );
        
    }
    // error modal
    else if (showErrorModal) {
        return (
            <ModalTemplate
                open = {showErrorModal}
                close = {closeShowErrorModal}
                title = {"Error"}
                body = {errorMessage}
                footer = {
                    <Button type = "button" variant="primary" className = 'ok-button' onClick={closeShowErrorModal}>
                            OK
                    </Button>
                }
            />
        )
    }
    else return null;
}   

export default ViewStudentModal;