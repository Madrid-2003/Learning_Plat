// import React, { useState } from 'react'
// import Search from '../../Components/Searchbtn/Search'

// function SearchTeacher() {
//   const [popup, SetPopup] = useState(false);
//   return (
//     <div className='ml-56'>
//         <Search/>
//         {popup && (
//           <div className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center'>
//             <div className='bg-[#5be0de] w-[70vw] px-14 py-10 rounded-sm'>
//               {/* <div className=' absolute w-9 h-9 bg-white rounded-xl cursor-pointer flex items-center justify-center m-2' onClick={onClose}>✖️</div> */}

//               <p className='text-3xl'>Student Feedback Form</p>
//               <p className=' border-b-2 py-2'>Please help us improve our courses by filling out this student feedback form. We highly appreciate your involvement. Thank you!</p>

//               <div className='flex flex-col gap-3 my-5 pb-5 border-b-2'>
//                 <label>Teacher / Instructor</label>
//                 <input type="text" className='p-2'  placeholder='Teacher / Instructor Name'/>
//                 <label>Course Name</label>
//                 <input type="text" className='p-2'  placeholder='Course Name'/>
//                 <label>What you like about this course?</label>
//                 <input type="text" className='p-2'  placeholder=''/>
//               </div>

//               <p className='font-bold'>Please rate each following statement : </p>
              
//               <div className='my-3'>
//                 <div className='flex gap-1'>
//                   <p className='mr-[1.65rem]'>Level of effort invested in course</p>
//                   <input name="group" type="radio" id='one'/> <label className='mr-3' htmlFor='one'>Very Good</label>
//                   <input name="group" type="radio" id='two'/> <label className='mr-3' htmlFor='two'>Good</label>
//                   <input name="group" type="radio" id='three'/> <label className='mr-3' htmlFor='three'>Fair</label>
//                   <input name="group" type="radio" id='four'/> <label className='mr-3' htmlFor='four'>Poor</label>
//                   <input name="group" type="radio" id='five'/> <label className='mr-3' htmlFor='five'>Very Poor</label>
//                 </div>
//                 <div className='flex gap-1 mt-1'>
//                   <p className='mr-4'>Level of knowledge on the Subject</p>
//                   <input name="group-0" type="radio" id='onec'/> <label className='mr-3' htmlFor='onec'>Very Good</label>
//                   <input name="group-0" type="radio" id='twoc'/> <label className='mr-3' htmlFor='twoc'>Good</label>
//                   <input name="group-0" type="radio" id='threec'/> <label className='mr-3' htmlFor='threec'>Fair</label>
//                   <input name="group-0" type="radio" id='fourc'/> <label className='mr-3' htmlFor='fourc'>Poor</label>
//                   <input name="group-0" type="radio" id='fivec'/> <label className='mr-3' htmlFor='fivec'>Very Poor</label>
//                 </div>
//                 <div className='flex gap-1 mt-1'>
//                   <p className='mr-[5.48rem]'>Level of communication</p>
//                   <input name="group-1" type="radio" id='oned'/> <label className='mr-3' htmlFor='oned'>Very Good</label>
//                   <input name="group-1" type="radio" id='twod'/> <label className='mr-3' htmlFor='twod'>Good</label>
//                   <input name="group-1" type="radio" id='threed'/> <label className='mr-3' htmlFor='threed'>Fair</label>
//                   <input name="group-1" type="radio" id='fourd'/> <label className='mr-3' htmlFor='fourd'>Poor</label>
//                   <input name="group-1" type="radio" id='fived'/> <label className='mr-3' htmlFor='fived'>Very Poor</label>
//                 </div>

//               </div>

//               <div className='py-3'>
//                 <p className='pb-3'>Would you recommend this course to other students?</p>
//                 <input name="radio-group" type="radio" id='one'/> <label htmlFor='one'>Yes</label>
//                 <input name="radio-group" type="radio" id='two' className='ml-5'/> <label htmlFor='two'>No</label>
//               </div>

//               <div className='flex justify-center'>
//                 <button className='w-[10rem]'>Submit Form</button>
//               </div>
              
//             </div>
//           </div>
//         )}
//     </div> 
//   )
// }

// export default SearchTeacher



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function SearchTeacher() {
    const { ID } = useParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    // This object should be defined once, perhaps in a utility file
    const price = {
        math: 700,
        physics: 800,
        computer: 1000,
        chemistry: 600,
        biology: 500,
    };
    
    const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const fetchCourses = async (query = '') => {
        try {
            const endpoint = query ? `/api/course/${query.toLowerCase()}` : '/api/course/all';
            const response = await axios.get(endpoint, { withCredentials: true });
            
            if (response.data.statusCode === 200) {
                setCourses(response.data.data);
                setError(null);
            } else {
                setCourses([]);
                setError(response.data.message || 'Failed to fetch courses.');
            }
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('An error occurred while fetching courses.');
            setCourses([]);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleSearch = () => {
        fetchCourses(searchQuery);
    };

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
            console.error('Error initiating payment:', err);
            alert('An error occurred during payment initiation. Please try again.');
        }
    };

    return (
        <div className='p-4 md:ml-56'>
            {/* Search component with improved responsiveness */}
            <div className='flex flex-col md:flex-row items-center gap-2 p-4 md:mt-20'>
                <div className="flex w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Ex: Math..."
                        className="flex-grow p-2 rounded-l-md border border-gray-300 text-black"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button
                        onClick={handleSearch}
                        className="p-2 bg-blue-500 text-white rounded-r-md"
                    >
                        Find Teacher
                    </button>
                </div>
            </div>

            {/* Display search results with better responsiveness */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 p-4 md:p-8">
                {error && <p className="text-red-500 text-center w-full">{error}</p>}
                {courses.length > 0 ? (
                    courses.map((courseItem) => (
                        <div key={courseItem._id} className="relative bg-gray-800 p-4 rounded-lg shadow-lg text-white w-full md:w-80 flex flex-col gap-2">
                            <h3 className="text-2xl font-bold text-blue-400">{courseItem.coursename.toUpperCase()}</h3>
                            <p className="text-gray-300 flex-grow">
                                <span className="font-semibold text-gray-400">Desc:</span> {courseItem.description}
                            </p>
                            {courseItem.enrolledteacher && (
                                <p className="text-gray-300">
                                    <span className="font-semibold text-gray-400">Teacher:</span> {courseItem.enrolledteacher.Firstname} {courseItem.enrolledteacher.Lastname}
                                </p>
                            )}
                            <p className="text-sm text-gray-300">
                                <span className="font-semibold text-gray-400">Seats:</span> {courseItem.enrolledStudent.length}/20
                            </p>
                            {courseItem.schedule && courseItem.schedule.length > 0 && (
                                <div className="text-sm text-gray-300">
                                    <span className="font-semibold text-gray-400">Timing:</span>
                                    {' ['} {courseItem.schedule.map(daytime => 
                                        `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime / 60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`
                                    ).join(', ')} {' ]'}
                                </div>
                            )}
                            <button
                                onClick={() => handleEnrollAndPay(courseItem._id, courseItem.coursename)}
                                className="mt-4 w-full bg-blue-900 text-white py-2 px-4 rounded-md"
                            >
                                Enroll Now
                            </button>
                        </div>
                    ))
                ) : (
                    !error && <p className="text-white text-center w-full">No courses found. Try searching for a subject or check back later!</p>
                )}
            </div>
        </div>
    );
}

export default SearchTeacher;