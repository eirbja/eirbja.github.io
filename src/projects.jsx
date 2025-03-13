import React from 'react';

const Projects = ({project}) => {
    return (
        <div className='project' style={{gridRowEnd:`span ${Math.ceil(project.imageH/100)}`}}>
            <img src={project.image !== 'N/A' ? project.image : 'https://placehold.co/400x300'} alt={project.title} />
            <div>
                <h3>{project.title}</h3>
                <span>{project.description}</span>
            </div>
        </div>
    );
};

export default Projects;