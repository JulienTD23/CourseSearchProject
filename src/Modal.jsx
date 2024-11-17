import "./Modal.css";

function Modal({isOpen, onClose, course}) {
    if (!isOpen) return null;

    return (
        <div className="Modal" onClick={onClose}>
            <div className="modal-content" onClick={(hi) => hi.stopPropagation()}>
                <br></br>
                <h2>{course.name} ({course.code})</h2>
                <p>{course.time} @ {course.location}</p>
                <p><b>Professor: </b>{course.prof}</p>
                <p><b>Credits: </b>{course.credits}</p>
                <p><b>Difficulty: </b>{course.painLevel}</p>
                <p id="description"><b>Course Description: </b><br></br> {course.desc}</p>

                <img src="/x.svg" className="close-modal-button" onClick={onClose}></img>
            </div>
        </div>
    );
}

export default Modal;