import "./Course.css";
import {useState} from 'react'

function Course({name, code, credits, prof, time, add, rem, maxSelected, onClick}) {

    const [selected, setSelected] = useState(true);

    const buttonAdd = () => {
        if (!maxSelected) {
            add();
            setSelected(false);
        }
    };

    const buttonRemove = () => {
        rem();
        setSelected(true);
    };

    return (
    <div className="whole-option">
        <div className="course-option" onClick={onClick}>
            <p id="code">{code}</p>
            <p id="cname">{name}</p>
            <p id="prof">{prof}</p>
            <p id="time">{time}</p>
            <p id="credit">{credits}</p>
        </div>

        {selected ? 
        (<img className={`add-button ${maxSelected ? "disabled" : ""}`} src="/add.svg" onClick={buttonAdd}></img>) 
        : 
        (<img className="remove-button" src="/remove.svg" onClick={buttonRemove}></img>)}

    </div>
    )
}

export default Course;