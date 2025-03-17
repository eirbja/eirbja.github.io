import React from 'react';
import Popup from './project_modal.jsx';
import { useState } from 'react';

const Projects = ({ project }) => {
    const [Modal, setModal] = useState(false);

    const changeModal = () => {
        setModal(!Modal);
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
            {Modal && <Popup project={project} changeModal={changeModal} />}
        </>
    );
};

export default Projects;