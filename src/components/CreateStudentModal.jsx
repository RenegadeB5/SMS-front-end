import {useState} from "react";
import {Button, Form} from 'react-bootstrap';
import ModalTemplate from "./ModalTemplate";
import API_interface from "./API";

const CreateStudentModal = ({ open, close, link}) => {
    if (!open) return null;

    // form validated
    const [validated, setValidated] = useState(false);

    // show error modal
    const [showErrorModal, setShowErrorModal] = useState(false);

    // error message if any
    const [errorMessage, setErrorMessage] = useState("");

    // close error modal
    const closeShowErrorModal = () => {
        setShowErrorModal(false);
        close();
    }

    // create student and POST to api
    const createStudent = (e) => {
        const student = {
            first_name: e.target.first_name.value,
            middle_name: e.target.middle_name.value,
            last_name: e.target.last_name.value,
            DOB: e.target.DOB.value
        };
        console.log("Creating student:", student);
        API_interface.POST(link, student).then((response) => {
            if (response.status === 200) {
                close();
            }
            else {
                // show error modal
                setErrorMessage(`(${response.CODE}) ${response.data}`)
                setShowErrorModal(true);
            }

            
        });
    };

    // validate form
    const handleSubmit = (event) => {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            createStudent(event);
        }
        setValidated(true);

        
    };

    return (
        <>
            {/* create student modal */}
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
            {/* error modal */}
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
        </>
    );
}

export default CreateStudentModal;


