// import React, { useState } from 'react'
// import '../Landing/Landing.css'
// import Footer from '../../Footer/Footer'
// import Header from '../Header/Header'

// function Courses() {
//   const [facList, setFacList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const teachersList = async(sub)=>{
//     setLoading(true);

//     const response = await fetch(`/api/course/${sub}`, {
//       method: 'GET',
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       }
//     });

//     const data = await response.json();
//     setFacList(data.data);
//     console.log(data.data);
//     setLoading(false);
//   }

//   return (
//     <>
//     <Header/>
//     <div className="courses">
//       <p>Faculty List</p>
//       <hr className="underLine"/>
//       <div className="subjects">
//         <div className="subject" onClick={()=>teachersList("physics")}>
//           <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
//           <p>Physics</p>
//         </div>
//         <div className="subject" onClick={()=>teachersList("chemistry")}>
//           <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
//           <p>Chemistry</p>
//         </div>
//         <div className="subject" onClick={()=>teachersList("biology")}>
//           <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
//           <p>Biology</p>
//         </div>
//         <div className="subject" onClick={()=>teachersList("math")}>
//           <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
//           <p>Math</p>
//         </div>
//         <div className="subject" onClick={()=>teachersList("computer")}>
//           <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
//           <p>Computer</p>
//         </div>
        
//       </div>

//       <div className="flex items-center justify-center gap-10">
//         {!loading && facList && (
//           facList.map(fac => (
//           <div key={fac._id} className="bg-[#99afbc] p-5 rounded-md ">
//             <div className="flex gap-3 items-center mb-2 ">
//             <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
//             <div className="flex flex-col justify-center items-start pl-3">
//             <p>{fac.enrolledteacher.Firstname} {fac.enrolledteacher.Lastname}</p>
//             <h4 className="text-blue-900">{fac.enrolledteacher.Email}</h4>
//             </div>
//             </div>
//             { fac.enrolledteacher.Email === "urttsg@gmail.com" ?
//               <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Calcutta University</h4> 
//               : 
//               <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Sister Nivedita university</h4>
//             }
//             { fac.enrolledteacher.Email === "urttsg@gmail.com" ? <h4>1 years of teaching experience</h4> : <h4>2 years of teaching experience</h4>}
//           </div>
//         )))}
//       </div>

//       </div>
//     <Footer/>
//     </>
//   )
// }

// export default Courses














// import React, { useState, useEffect } from 'react';
// import '../Landing/Landing.css';
// import Footer from '../../Footer/Footer';
// import Header from '../Header/Header';
// import axios from 'axios';

// function Courses() {
//     const [facList, setFacList] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const teachersList = async (sub = null) => {
//         setLoading(true);
//         try {
//             let response;
//             if (sub) {
//                 // Fetch teachers for a specific subject
//                 response = await axios.get(`/api/course/${sub}`);
//             } else {
//                 // Fetch all approved courses
//                 response = await axios.get(`/api/course/all`);
//             }
//             setFacList(response.data.data);
//             console.log(response.data.data);
//         } catch (error) {
//             console.error('Error fetching course requests:', error);
//         } finally {
//             setLoading(false);
//         }
//     };
    
//     // Use useEffect to fetch all courses on component mount
//     useEffect(() => {
//         teachersList();
//     }, []);

//     return (
//         <>
//             <Header />
//             <div className="courses">
//                 <p>Faculty List</p>
//                 <hr className="underLine" />
//                 <div className="subjects">
//                     <div className="subject" onClick={() => teachersList("physics")}>
//                         <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
//                         <p>Physics</p>
//                     </div>
//                     <div className="subject" onClick={() => teachersList("chemistry")}>
//                         <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
//                         <p>Chemistry</p>
//                     </div>
//                     <div className="subject" onClick={() => teachersList("biology")}>
//                         <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
//                         <p>Biology</p>
//                     </div>
//                     <div className="subject" onClick={() => teachersList("math")}>
//                         <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
//                         <p>Math</p>
//                     </div>
//                     <div className="subject" onClick={() => teachersList("computer")}>
//                         <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
//                         <p>Computer</p>
//                     </div>
//                 </div>

//                 <div className="flex items-center justify-center gap-10">
//                     {!loading && facList.length > 0 ? (
//                         facList.map(fac => (
//                             <div key={fac._id} className="bg-[#99afbc] p-5 rounded-md ">
//                                 <div className="flex gap-3 items-center mb-2 ">
//                                     <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={50} />
//                                     <div className="flex flex-col justify-center items-start pl-3">
//                                         <p>{fac.enrolledteacher.Firstname} {fac.enrolledteacher.Lastname}</p>
//                                         <h4 className="text-blue-900">{fac.enrolledteacher.Email}</h4>
//                                     </div>
//                                 </div>
//                                 {fac.enrolledteacher.Email === "urttsg@gmail.com" ?
//                                     <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Calcutta University</h4>
//                                     :
//                                     <h4><span className="font-bold text-brown-800">Education :</span> Post graduate from Sister Nivedita university</h4>
//                                 }
//                                 {fac.enrolledteacher.Email === "urttsg@gmail.com" ? <h4>1 years of teaching experience</h4> : <h4>2 years of teaching experience</h4>}
//                             </div>
//                         ))
//                     ) : (
//                         !loading && <p className="text-white text-center">No courses found. Check back later!</p>
//                     )}
//                 </div>
//             </div>
//             <Footer />
//         </>
//     );
// }

// export default Courses;










import React, { useState, useEffect } from 'react';
import '../Landing/Landing.css';
import Footer from '../../Footer/Footer';
import Header from '../Header/Header';
import axios from 'axios';

function Courses() {
    const [facList, setFacList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchTeachersAndCourses = async (sub = null) => {
        setLoading(true);
        console.log("fetchTeachersAndCourses called with subject:", sub); // DEBUG LOG
        try {
            let response;
            if (sub) {
                response = await axios.get(`/api/course/${sub}`, { withCredentials: true }); // Ensure credentials
            } else {
                response = await axios.get(`/api/course/all`, { withCredentials: true }); // Ensure credentials
            }
            
            if (response.data.statusCode === 200) {
                setFacList(response.data.data);
                setError(null);
                console.log("API response data for faculty/courses:", response.data.data); // DEBUG LOG
            } else {
                setFacList([]);
                setError(response.data.message || "Failed to fetch courses.");
            }
        } catch (error) {
            console.error('Error fetching course requests:', error); // DEBUG LOG
            setError("An error occurred while fetching courses.");
            setFacList([]);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        console.log("Courses.jsx useEffect triggered. Fetching all courses."); // DEBUG LOG
        fetchTeachersAndCourses();
    }, []);

    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const price = { // Define price object here for use in handleEnrollAndPay
        math: 700,
        physics: 800,
        computer: 1000,
        chemistry: 600,
        biology: 500,
    };

    // NEW FUNCTION: Handle payment initiation
    const handleEnrollAndPay = async (courseId, courseName) => {
        const fees = price[courseName.toLowerCase()]; 

        if (!fees) {
            alert('Course fees not defined. Cannot proceed with payment.');
            return;
        }

        try {
            const response = await axios.post(
                `/api/payment/payu/course/${courseId}/${courseName}`,
                { fees, courseName },
                { withCredentials: true }
            );

            if (response.data.statusCode === 200 && response.data.data.action && response.data.data.params) {
                const { action, params } = response.data.data;

                const form = document.createElement('form');
                form.method = 'POST';
                form.action = action;
                form.target = '_self'; 

                for (const key in params) {
                    if (params.hasOwnProperty(key)) {
                        const hiddenField = document.createElement('input');
                        hiddenField.type = 'hidden';
                        hiddenField.name = key;
                        hiddenField.value = params[key];
                        form.appendChild(hiddenField);
                    }
                }
                document.body.appendChild(form);
                form.submit();
            } else {
                alert(response.data.message || 'Failed to initiate payment.');
            }
        } catch (err) {
            console.error("Error initiating payment:", err);
            alert('An error occurred during payment initiation. Please try again.');
        }
    };


    return (
        <>
            <Header />
            <div className="courses">
                <p>Available Courses & Faculty</p>
                <hr className="underLine" />
                <div className="subjects">
                    <div className="subject" onClick={() => fetchTeachersAndCourses("physics")}>
                        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2" alt="Physics" />
                        <p>Physics</p>
                    </div>
                    <div className="subject" onClick={() => fetchTeachersAndCourses("chemistry")}>
                        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95" alt="Chemistry" />
                        <p>Chemistry</p>
                    </div>
                    <div className="subject" onClick={() => fetchTeachersAndCourses("biology")}>
                        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555" alt="Zoology" />
                        <p>Biology</p>
                    </div>
                    <div className="subject" onClick={() => fetchTeachersAndCourses("math")}>
                        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664" alt="Math" />
                        <p>Math</p>
                    </div>
                    <div className="subject" onClick={() => fetchTeachersAndCourses("computer")}>
                        <img src="https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272" alt="Computer" />
                        <p>Computer</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-10 p-5">
                    {loading ? (
                        <p className="text-white text-xl">Loading courses...</p>
                    ) : error ? (
                        <p className="text-red-500 text-xl">{error}</p>
                    ) : facList.length > 0 ? (
                        facList.map(courseItem => (
                            <div key={courseItem._id} className="bg-[#0E3A59] p-5 rounded-lg shadow-lg text-white w-80">
                                <h3 className="text-2xl font-bold text-[#4E84C1] mb-2">{courseItem.coursename.toUpperCase()}</h3>
                                <p className="text-gray-300 mb-3">{courseItem.description}</p>
                                
                                {courseItem.enrolledteacher && (
                                    <div className="mb-3">
                                        <p className="font-bold text-lg">Teacher:</p>
                                        <div className="flex items-center gap-2">
                                            <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} className="rounded-full" />
                                            <p>{courseItem.enrolledteacher.Firstname} {courseItem.enrolledteacher.Lastname}</p>
                                        </div>
                                        <p className="text-sm text-gray-400">{courseItem.enrolledteacher.Email}</p>
                                    </div>
                                )}

                                {courseItem.schedule && courseItem.schedule.length > 0 && (
                                    <div className="mb-3">
                                        <p className="font-bold text-lg">Schedule:</p>
                                        {courseItem.schedule.map((daytime, idx) => (
                                            <p key={idx} className="text-sm text-gray-400">
                                                {daysName[daytime.day]} {Math.floor(daytime.starttime / 60)}:{daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - {Math.floor(daytime.endtime / 60)}:{daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}
                                            </p>
                                        ))}
                                    </div>
                                )}
                                <p className="text-sm text-gray-300">Enrolled Students: {courseItem.enrolledStudent.length}/20</p>
                                <button 
                                    onClick={() => handleEnrollAndPay(courseItem._id, courseItem.coursename)} 
                                    className="mt-4 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold py-2 px-4 rounded-md w-full"
                                >
                                    Enroll Now
                                </button>
                            </div>
                        ))
                    ) : (
                        !loading && <p className="text-white text-xl text-center">No courses found. Try selecting a subject above or check back later!</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Courses;
