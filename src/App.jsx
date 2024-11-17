import { useState, useEffect } from 'react'
import './App.css';
import Course from './Course';
import Schedule from './Schedule';
import Modal from './Modal';
import IntroCard from './IntroCard';
import { motion } from "motion/react"

const courses = [
  { id: 1, name: "Introduction to Computer Science", code: "CPSC 201", credits: 1, prof: "Stephen Slade", time: "MWF 10:30am-11:20am", painLevel: "Moderate", location: "Davies Auditorium", desc: "Introduction to the concepts, techniques, and applications of computer science. Topics include computer systems (the design of computers and their languages); theoretical foundations of computing (computability, complexity, algorithm design); and artificial intelligence (the organization of knowledge and its representation for efficient search). Examples stress the importance of different problem-solving methods."},
  { id: 2, name: "Data Structures and Programming Techniques", code: "CPSC 223", credits: 1, prof: "James Glenn, Ozan Erat", time: "TTh 2:30pm-3:45pm", painLevel: "Moderate",},
  { id: 3, name: "Mathematical Tools for Computer Science", code: "CPSC 202", credits: 1, prof: "Charalampos Papamanthou", time: "TTh 1:00pm-2:15pm"},
  { id: 4, name: "Introduction to Systems Programming and Computer Organization", code: "CPSC 323", credits: 1, prof: "Jay Lim • Lin Zhong", time: "MW 1:00pm-2:15pm"},
  { id: 5, name: "Artificial Intelligence", code: "CPSC 470", credits: 1, prof: "Stephen Slade", time: "MW 2:30pm-3:45pm"},
  { id: 6, name: "Algorithms", code: "CPSC 365", credits: 1, prof: "Dylan McKay", time: "TTh 2:30pm-3:45pm"},
  { id: 7, name: "Full Stack Web Programming", code: "CPSC 419", credits: 1, prof: "Alan Weide", time: "TTh 4:00pm-5:15pm"},
  { id: 8, name: "Advanced Software Engineering", code: "CPSC 445", credits: 1, prof: "Timos Antonopoulos", time: "TTh 11:35am-12:50pm"},
  { id: 9, name: "Spectral Graph Theory", code: "CPSC 462", credits: 1, prof: "Dan Spielman", time: "MW 2:30pm-3:45pm"},
  { id: 10, name: "Digital Systems", code: "CPSC 338", credits: 1, prof: "TBA", time: "MW 2:30pm-3:45pm"},
  /* { id: , name: "", code: "", credits: , prof: "", time: ""}, */
];


function App() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCredits, setTotalCredits] = useState(0);
  const [courseToFilter, setCourseToFilter] = useState("");
  const [removing, setRemoving] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [modalState, setModalState] = useState(false);
  const [modalCourse, setModalCourse] = useState(null);
/*   const [introView, setIntroView] = useState(true); */

/*   const closeIntro = () => {
    setIntroView(false);
  } */

  const openModal = (course) => {
    setModalCourse(course);
    setModalState(true);
  }

  const closeModal = () => {
    setModalState(false);
    setModalCourse(null);
  }

  function hasDayOverlap(days1, days2) {
    for (const day of days1) {
      if (days2.includes(day)) {
        return true;
      }
    }
    return false;
  }

  function parseTime(time) {
    const [hour, minPart] = time.match(/(\d+):(\d+)/i).slice(1);
    let [minutes, minutes2] = minPart.slice(-2);
    let parsedTime = (parseInt(hour, 10) * 100) + (parseInt(minutes, 10) * 10) + (parseInt(minutes2, 10));

    const period = time.match(/[ap]m/i)[0];
    if (period.toLowerCase() === "pm" && hour !== "12") parsedTime += 1200;
    if (period.toLowerCase() === "am" && hour === "12") parsedTime -= 1200;

    return parsedTime;
  }

  function hasTimeConflict(course1, course2) {
    const [days1, time1] = course1.time.split(" ");
    const [days2, time2] = course2.time.split(" ");

    const [start1, end1] = time1.split("-").map(parseTime);
    const [start2, end2] = time2.split("-").map(parseTime);

    if (!hasDayOverlap(days1, days2)) {
      return false;
    }
    return ((start1 === start2) || (end1 === end2));
  }

  function addCourse(course) {
    const newConflicts = [...conflicts];

    selectedCourses.forEach((selectedCourse) => {
      if (hasTimeConflict(selectedCourse, course)) {
        if (!newConflicts.includes(course.code)) newConflicts.push(course.code);
        if (!newConflicts.includes(selectedCourse.code)) newConflicts.push(selectedCourse.code);
      }
    })

    setConflicts(newConflicts);

    if (selectedCourses.length >= 6) {
      return;
    }

    if (!selectedCourses.some((selected) => selected.code === course.code)) {
      setSelectedCourses((prevCourses) => 
        [...prevCourses, {code: course.code, time: course.time}]);

      setTotalCredits((prevCredits) => 
        prevCredits + course.credits);
    }
  }
  
  function removeCourse(course) {
    const updatedCourses = selectedCourses.filter(
      (selected) => selected.code !== course.code);

    const updatedConflicts = [];
    updatedCourses.forEach((course1, index) => {
      updatedCourses.slice(index + 1).forEach((course2) => {
        if (hasTimeConflict(course1, course2)) {
          if (!updatedConflicts.includes(course1.code)) updatedConflicts.push(course1.code);
          if (!updatedConflicts.includes(course2.code)) updatedConflicts.push(course2.code);
      }
      })
    })

    setConflicts(updatedConflicts)

    if (selectedCourses.some((selected) => selected.code === course.code)) {
      setRemoving((prev) => [...prev, course.code]);
      setTimeout(() => {
        setSelectedCourses((prevCourses) =>
          prevCourses.filter((selected) => selected.code !== course.code)
        );
        setTotalCredits((prevCredits) => Math.max(0, prevCredits - course.credits));
        setRemoving((prev) => prev.filter((code) => code !== course.code));
      }, 300); 
    }
  }
  

  function handleFilterChange(event) {
    setCourseToFilter(event.target.value);
  }

  const filteredCourses = courses.filter((course) =>
    course.code.toLowerCase().includes(courseToFilter.toLowerCase()) 
||  course.name.toLowerCase().includes(courseToFilter.toLowerCase())
||  course.prof.toLowerCase().includes(courseToFilter.toLowerCase())
  );

  const handleLogoClick = () => {
    window.open("https://www.yale.edu/");
  };

  return (
    <div className="App">
      <div className="searchbar">
        <div id="yale-container" onClick={handleLogoClick}><img src="/61stPs8fNrL.jpg"></img></div>
        <div id="logo-container"><img src="/courseLogo.png"></img></div>
        <form>
          <input 
          id="user-search" 
          type="text" 
          name="user-search" 
          value={courseToFilter}
          onChange={handleFilterChange}
          placeholder="Filter courses by name"></input>
        </form>

        <div id="credit-counter">
          <p>Current Credits:</p>
          <h4>{totalCredits}</h4>
        </div>

      </div>
      
      <div className="course-list">
        {filteredCourses.length === 0 ? (
        <h1 id="none-error">.No courses found</h1>
          ) : (
        filteredCourses.map((course) => (
          <Course
            className="course-option"
            key={course.id}
            name={course.name}
            code={course.code}
            credits={course.credits}
            prof={course.prof}
            time={course.time}
            add={() => addCourse(course)}
            rem={() => removeCourse(course)}
            maxSelected = {selectedCourses.length >= 6}
            onClick={() => openModal(course)}
          />
        ))
      )}
      </div>
      
      <div className="schedule">
      {selectedCourses.length === 0 ? (<h2 id="none-error-2">Get started by adding some courses!</h2>) 
      : (<Schedule 
          courses={selectedCourses}
          credits={totalCredits}
          removing={removing}
          conflicts={conflicts}
        /> )}
      </div>

      <Modal isOpen={modalState} onClose={closeModal} course={modalCourse}/> 
{/*       <IntroCard isOpen={introView} onClose={closeIntro}/> */}
      
    </div>
  );
}

export default App;
