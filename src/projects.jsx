import React from 'react';
import Modal from './project_modal.jsx';
import { useState } from 'react';

const Projects = ({ project }) => {
    const [showModal, setShowModal] = useState(false);

    const changeModal = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <div
                className='project'
                style={{ gridRowEnd: `span ${Math.ceil(project.imageH / 100)}` }}
                onClick={changeModal}
            >
                <img
                    src={project.image !== 'N/A' ? project.image : 'https://placehold.co/400x300'}
                    alt={project.title}
                />
                <div>
                    <h3>{project.title}</h3>
                    <span>{project.briefDescription}</span>
                </div>
            </div>
            {showModal && <Modal project={project} changeModal={changeModal} /> //shows popup when Modal is true.
            }
        </>
    );
};

export default Projects;