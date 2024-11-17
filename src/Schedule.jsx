import "./Schedule.css";

function Schedule({courses, credits, removing, conflicts}) {
    return (
    <>        
        <div className="selected-courses">
            {courses.map((course) => (
                <ul id="course-ul">
                    <li className={removing.includes(course.code) ? "pop-out" : conflicts.includes(course.code) ? "conflict" : "pop-in"}>
                        <div id="sched-info">
                            {course.code} 
                            <br></br>
                            {course.time}
                        </div>

                        <div id="sched-error">
                            {conflicts.includes(course.code) && (<img className="conflict-icon" src="/icon-error.svg"></img>)}
                        </div>

                    </li>
                </ul>
            )
        )}
        </div>

        <div className="credit-hours">
            {conflicts.length > 0 && (<div id="conflict-notice"> <p>Looks like some of your courses have a scheduling conflict.</p> </div>)}
            {credits >= 4 && credits < 5.5 && (<p id="suggested-limit-error">Suggested credit limit reached.</p>)}
            {credits >= 5.5 && (<p id="total-limit-error">Credit limit exceeded.</p>)}
        </div>

    </>
    )
}

export default Schedule;