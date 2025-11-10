import React, { useState, useEffect } from 'react';
import API_interface from "./API.js";
import {Button} from 'react-bootstrap';
import './MainPage.css';
import CreateStudentModal from './CreateStudentModal.jsx';
import ViewStudentModal from './ViewStudentModal.jsx';

const MainPage = () => {

    // response from API
    const [responseBody, setResponseBody] = useState(null);
    // student list
    const [studentList, setStudentList] = useState(null);
    // show create student modal
    const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
    // show view student modal
    const [showViewStudentModal, setShowViewStudentModal] = useState(false);
    // selected student
    const [selectedStudent, setSelectedStudent] = useState(null);

    // close create student modal function
    const closeCreateStudentModal = () => setShowCreateStudentModal(false);

    // close view student modal function
    const closeViewStudentModal = () => setShowViewStudentModal(false);

    // delete student from student list
    const deleteStudent = (id) => {
        setStudentList(old => old.filter(student => student.student_ID !== id));
    };
     
    // fetch all students from API
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await API_interface.GET("https://api.rocketmanb5.com/api/v1/students");
            setResponseBody(response.data);
            setStudentList(response.data._embedded.studentDTOList);
            
        };
        fetchResponse();
        
    }, []);
    console.log(responseBody);

    // don't render until students are fetched
    if (!responseBody) return null;

    return (
        <React.StrictMode>
            <ul className="list-group list-group-flush">
                {/* create list element for each student */}
                {studentList.map((student, index) => (
                    <React.Fragment key={index}>
                        <li
                            className="list-group-item"
                            onClick={
                                // show student view on click
                                () => {
                                    setShowViewStudentModal(true);
                                    setSelectedStudent(student);
                                }
                            }
                        >
                            {student.id} {student.first_name} {student.last_name}
                        </li>
                    </React.Fragment>


                        
                ))}
            </ul>
            
            {/* add student button */}
            <Button variant="primary" className='add-student-button' onClick={() => setShowCreateStudentModal(true)}>
                + Add Student
            </Button>
            {/* create student Modal */}
            <CreateStudentModal
                open={showCreateStudentModal}
                close={closeCreateStudentModal}
                link={responseBody._links.create.href}
            />
            {/* render view student modal once student is selected */}
            {selectedStudent ? (
                <>
                    <ViewStudentModal
                        open={showViewStudentModal}
                        close={closeViewStudentModal}
                        link={selectedStudent._links.self.href}
                        removeStudent={() => {deleteStudent(selectedStudent.student_ID)}}
                    />
                </>
            ): null}
            

        </React.StrictMode>
        
    );

}

export default MainPage;