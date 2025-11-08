import React, { useState, useRef }from 'react';
import { Button, Form } from 'react-bootstrap';
import './ViewStudentModal.css';
import ConfirmationModal from './ConfirmationModal.jsx';
import ModalTemplate from './ModalTemplate.jsx';
import API_interface from './API.js';

function ViewStudentModal({ open, close, link, removeStudent}) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const [validated, setValidated] = useState(false);

    const [student, setStudent] = useState(null);

    React.useEffect(() => {
        const fetchStudent = async () => {
            const studentData = await API_interface.GET(link);
            setStudent(studentData);
        };
        fetchStudent();
    }, [link]);

    const editStudent = (event) => {
        const updatedStudent = {
            first_name: event.target.first_name.value,
            middle_name: event.target.middle_name.value,
            last_name: event.target.last_name.value,
            DOB: event.target.DOB.value
        };
        console.log("Editing student:", updatedStudent);
        API_interface.PUT(student._links.update.href, updatedStudent).then(() => {
            close();
            setIsEditing(false);
    });
        
    };

    const deleteStudent = (id) => {
        API_interface.DELETE(student._links.delete.href, id).then(() => {
            removeStudent();
            setShowConfirmModal(false);
            close();

        });
    };

    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            editStudent(event);
        }

        setValidated(true);
        
    };

    const confirmDelete = () => {
        console.log("Deleting student with ID:", student.id);
        deleteStudent(student.id);
    }

    if(!student) return null;
    

    return (
        <>
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
                                <p><strong>Date of Birth:</strong> {new Date(student.DOB).toLocaleDateString('en-US', {
                                    month: '2-digit',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}</p>

                                
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
            ): (
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
            <ConfirmationModal
                open={showConfirmModal}
                close={() => setShowConfirmModal(false)}
                confirm={confirmDelete}
            />

            
        </>
        
    );
}   

export default ViewStudentModal;