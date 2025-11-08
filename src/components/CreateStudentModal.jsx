import {useState} from "react";
import {Button, Form} from 'react-bootstrap';
import ModalTemplate from "./ModalTemplate";
import API_interface from "./API";

const CreateStudentModal = ({ open, close, link}) => {
    if (!open) return null;

    const [validated, setValidated] = useState(false);

    const createStudent = (e) => {
        const student = {
            first_name: e.target.first_name.value,
            middle_name: e.target.middle_name.value,
            last_name: e.target.last_name.value,
            DOB: e.target.DOB.value
        };
        console.log("Creating student:", student);
        API_interface.POST(link, student).then(() => {
            close();
        });
    };


    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        else {
            createStudent(event);
        }
        setValidated(true);

        
    };

    return (
        
            <ModalTemplate
                title={"Create Student"}
                body={
                    <Form noValidate validated={validated} id='create-student-form' onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label className = 'mt-3'>First Name: </Form.Label>
                            <Form.Control type="text" className = 'input' id = 'first_name' name='first_name' required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a first name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                        
                            <Form.Label className = 'mt-3'>Middle Name: </Form.Label>
                            <Form.Control type="text" className = 'input' id = 'middle_name' name='middle_name' />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className = 'mt-3'>Last Name: </Form.Label>
                            <Form.Control type="text" className = 'input' id = 'last_name' name='last_name' required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a last name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className = 'mt-3'>Date of Birth: </Form.Label>
                            <Form.Control type="date" className = 'input' id = 'DOB' name='DOB' required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a date of birth.
                            </Form.Control.Feedback>
                        </Form.Group>
                     </Form>
                }
                footer={
                    <>
                        <Button type="submit" variant="success" className = 'save-button' form = 'create-student-form'>
                            Save
                        </Button>
                        <Button variant="danger" className = 'cancel-button' onClick={close}>
                            Cancel
                        </Button>
                    </>
                }
                open={open}
                close={close}
            />
    );
}

export default CreateStudentModal;

{/*
    <Form id = 'create-student-form' onSubmit = {action}>
            <ModalTemplate
                title={"Create Student"}
                body={
                    <>
                        <div>
                            <span className = 'field-descriptor'>First Name:</span> <span className = 'field-value'><input type="text" className = 'input' id = 'first_name' required /></span>
                        </div>
                        <div>
                            <span className = 'field-descriptor'>Middle Name:</span> <span className = 'field-value'><input type="text" className = 'input' id = 'middle_name' /></span>
                        </div>
                        <div>
                            <span className = 'field-descriptor'>Last Name:</span> <span className = 'field-value'><input type="text" className = 'input' id = 'last_name' required /></span>
                        </div>
                        <div>
                            <span className = 'field-descriptor'>Date of Birth:</span> <span className = 'field-value'><input type="date" className = 'input' id = 'DOB' required /></span>
                        </div>
                    </>
                }
                footer={
                    <>
                        <Button type="submit" variant="primary" className = 'save-button' form = 'create-student-form'>
                            Save
                        </Button>
                        <Button variant="secondary" className = 'cancel-button' onClick={close}>
                            Cancel
                        </Button>
                    </>
                }
                open={open}
                close={close}
            />
        </Form>
        */}
