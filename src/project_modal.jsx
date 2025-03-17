const Modal = ({ project, changeModal }) => {
    return (
        <div className="modal_overlay" onClick={changeModal}>
            <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                <button className="modal_close" onClick={changeModal}>
                    x
                </button>
                <h3>{project.title}</h3>
                    {project.detailedDescription.map((line, index) => (//goes through the list
                        <p key={index}>{line}</p>
                    ))}
                <img
                    src={project.image !== 'N/A' ? project.image : 'https://placehold.co/400x300'}
                    alt={project.title}
                />
            </div>
        </div>
    );
};

export default Modal;

