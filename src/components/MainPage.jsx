import React, { useState, useEffect } from 'react';
import API_interface from "./API.js";
import {Button} from 'react-bootstrap';
import './MainPage.css';
import CreateStudentModal from './CreateStudentModal.jsx';
import ViewStudentModal from './ViewStudentModal.jsx';

const MainPage = () => {
    const [responseBody, setResponseBody] = useState(null);
    const [studentList, setStudentList] = useState(null);
    const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
    const [showViewStudentModal, setShowViewStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const closeCreateStudentModal = () => setShowCreateStudentModal(false);

    const closeViewStudentModal = () => setShowViewStudentModal(false);

    const deleteStudent = (id) => {
        setStudentList(old => old.filter(student => student.student_ID !== id));
    };
    
    useEffect(() => {
        const fetchResponse = async () => {
            const response = await API_interface.GET("https://api.rocketmanb5.com/api/v1/students");
            setResponseBody(response.data);
            setStudentList(response.data._embedded.studentDTOList);
            
        };
        fetchResponse();
        
    }, []);
    console.log(responseBody);

    if (!responseBody) return null;

    return (
        <React.StrictMode>
            
            <ul className="list-group list-group-flush">
                {studentList.map((student, index) => (
                    <React.Fragment key={index}>
                        <li
                            className="list-group-item"
                            onClick={
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
            
            <Button variant="primary" className='add-student-button' onClick={() => setShowCreateStudentModal(true)}>
                + Add Student
            </Button>
            {/*<CreateStudentModal
                show={showCreateStudentModal}
                close={closeCreateStudentModal}
                createStudent={createStudent}
            />*/}
            <CreateStudentModal
                open={showCreateStudentModal}
                close={closeCreateStudentModal}
                link={responseBody._links.create.href}
            />
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