import React, { useState } from 'react';

function ListItem({student, setStudents}) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = (student) => {
        setShowModal(true);
    };


    return (
        <>
            <li
                className="list-group-item"
                onClick={() => handleShow(student)}
            >
                {student.id} {student.first_name} {student.last_name}
            </li>
            <StudentModal
                show={showModal}
                handleClose={handleClose}
                student={student}
                setStudents={setStudents}
            />
        </>
    );
}

export default ListItem;