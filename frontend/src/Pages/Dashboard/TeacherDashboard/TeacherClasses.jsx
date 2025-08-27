// import React, { useEffect, useState } from 'react';
// import Camera from '../Images/Camera.png';
// import Clock from '../Images/Clock.png';
// import AddClass from './AddClass';
// import { NavLink, useParams } from 'react-router-dom';

// function TeacherClasses() {
//     const [showPopup, setShowPopup] = useState(false);
//     const { ID } = useParams();
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await fetch(`https://learning-plat-36hz.vercel.app/course/classes/teacher/${ID}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const user = await response.json();
//                 setData(user.data.classes[0]?.liveClasses || []);
//                 console.log(user.data);

//             } catch (error) {
//                 setError(error.message);
//             }
//         };
//         getData();

//     }, [showPopup, ID]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className='ml-60 mt-20 text-white flex justify-between mr-80'>
//             <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

//             <div className='h-[17rem] w-[30rem] overflow-auto '>
//             {data.filter(clas => {
//             const classDate = new Date(clas.date.slice(0, 10));
//             const today = new Date();
//             const oneWeekFromNow = new Date();
//             oneWeekFromNow.setDate(today.getDate() + 7);

//             return classDate >= today && classDate <= oneWeekFromNow;
//             }).map(clas => (
//                 <div key={clas.timing} className='flex items-center mb-5'>
//                     <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
//                     <div className='ml-5 mr-10 font-bold'>
//                         <p className=' text-lg'>
//                             {clas.coursename}
//                             <span className='text-black text-sm ml-3'>
//                                 {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
//                             </span>
//                         </p>
//                         <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
//                     </div>
//                     <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
//                 </div>
//             ))}

//             </div>

//             {data.length > 0 && (
//                 <NavLink to={data[0]?.link} target='_blank'>
//                     <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
//                         <div className='flex gap-3 items-center mb-5 mt-2'>
//                             <img src={Clock} alt="clock" width={50} />
//                             <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
//                             <span className='text-[#018280] text-2xl ml-2'>
//                                 {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
//                             </span>
//                         </div>
//                         <div className='flex gap-12 items-center'>
//                             <div className='ml-3'>
//                                 <p>Your next Class</p>
//                                 <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename.toUpperCase()}</p>
//                                 <p className=' text-light-blue-700'>{data[0]?.title.slice(0, 25)} ...</p>
//                             </div>
//                             <img src={Camera} alt="Camera" width={70} />
//                         </div>
//                     </div>
//                 </NavLink>
//             )}

//             <div onClick={() => setShowPopup(true)} className='absolute right-10 bg-blue-900 p-2 rounded-sm cursor-pointer'>
//                 + ADD CLASS
//             </div>
//             {showPopup && (
//                 <AddClass onClose={() => setShowPopup(false)} />
//             )}
//         </div>
//     );
// }

// export default TeacherClasses;













// import React, { useEffect, useState } from 'react';
// import Camera from '../Images/Camera.png';
// import Clock from '../Images/Clock.png';
// import AddClass from './AddClass';
// import { NavLink, useParams } from 'react-router-dom';

// function TeacherClasses() {
//     const [showPopup, setShowPopup] = useState(false);
//     const { ID } = useParams();
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await fetch(`https://learning-plat-36hz.vercel.app/course/classes/teacher/${ID}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const user = await response.json();
//                 setData(user.data.classes[0]?.liveClasses || []);
//                 console.log(user.data);

//             } catch (error) {
//                 setError(error.message);
//             }
//         };
//         getData();

//     }, [showPopup, ID]);

//     // NEW FUNCTION: Handle class deletion
//     const handleDeleteClass = async (courseId, classDate, classTiming) => {
//         if (!window.confirm("Are you sure you want to delete this class?")) {
//             return; // User cancelled
//         }

//         try {
//             const response = await fetch(`https://learning-plat-36hz.vercel.app/course/${courseId}/teacher/${ID}/delete-class`, {
//                 method: 'DELETE', // Using DELETE method for deletion
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ date: classDate, timing: classTiming }) // Send date and timing to identify class
//             });

//             const res = await response.json();

//             if (!response.ok) {
//                 throw new Error(res.message || 'Failed to delete class');
//             }

//             alert(res.message);
//             // Refresh classes after successful deletion
//             setData(prevData => prevData.filter(clas => !(clas.date === classDate && clas.timing === classTiming)));

//         } catch (error) {
//             console.error("Error deleting class:", error);
//             setError(error.message);
//             alert(`Error: ${error.message}`);
//         }
//     };


//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div className='ml-60 mt-20 text-white flex justify-between mr-80'>
//             <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

//             <div className='h-[17rem] w-[30rem] overflow-auto '>
//             {data.filter(clas => {
//             const classDate = new Date(clas.date.slice(0, 10));
//             const today = new Date();
//             const oneWeekFromNow = new Date();
//             oneWeekFromNow.setDate(today.getDate() + 7);

//             return classDate >= today && classDate <= oneWeekFromNow;
//             }).map(clas => (
//                 <div key={clas.timing} className='flex items-center mb-5'>
//                     <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
//                     <div className='ml-5 mr-10 font-bold'>
//                         <p className=' text-lg'>
//                             {clas.coursename}
//                             <span className='text-black text-sm ml-3'>
//                                 {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
//                             </span>
//                         </p>
//                         <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
//                     </div>
//                     <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
//                     {/* NEW: Delete Button */}
//                     <button 
//                         onClick={() => handleDeleteClass(clas.courseId, clas.date, clas.timing)} 
//                         className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-auto'
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}

//             </div>

//             {data.length > 0 && (
//                 <NavLink to={data[0]?.link} target='_blank'>
//                     <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
//                         <div className='flex gap-3 items-center mb-5 mt-2'>
//                             <img src={Clock} alt="clock" width={50} />
//                             <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
//                             <span className='text-[#018280] text-2xl ml-2'>
//                                 {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
//                             </span>
//                         </div>
//                         <div className='flex gap-12 items-center'>
//                             <div className='ml-3'>
//                                 <p>Your next Class</p>
//                                 <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename.toUpperCase()}</p>
//                                 <p className=' text-light-blue-700'>{data[0]?.title.slice(0, 25)} ...</p>
//                             </div>
//                             <img src={Camera} alt="Camera" width={70} />
//                         </div>
//                     </div>
//                 </NavLink>
//             )}

//             {/* The "+ ADD CLASS" button and its associated popup logic (if you commented it out previously) */}
//             {/*
//             <div onClick={() => setShowPopup(true)} className='absolute right-10 bg-blue-900 p-2 rounded-sm cursor-pointer'>
//                 + ADD CLASS
//             </div>
//             {showPopup && (
//                 <AddClass onClose={() => setShowPopup(false)} />
//             )}
//             */}
//         </div>
//     );
// }

// export default TeacherClasses;















// import React, { useEffect, useState } from 'react';
// import Camera from '../Images/Camera.png';
// import Clock from '../Images/Clock.png';
// import AddClass from './AddClass';
// import { NavLink, useParams } from 'react-router-dom';

// function TeacherClasses() {
//     const [showPopup, setShowPopup] = useState(false);
//     const { ID } = useParams();
//     const [data, setData] = useState([]);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const getData = async () => {
//             try {
//                 const response = await fetch(`https://learning-plat-36hz.vercel.app/course/classes/teacher/${ID}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include',
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch data');
//                 }

//                 const user = await response.json();
//                 setData(user.data.classes[0]?.liveClasses || []);
//                 console.log("Fetched teacher classes data:", user.data); // Debug log
//             } catch (error) {
//                 console.error("Error fetching teacher classes:", error); // Debug log
//                 setError(error.message);
//             }
//         };
//         getData();

//     }, [showPopup, ID]);

//     const handleDeleteClass = async (courseId, classDate, classTiming) => {
//         console.log("Attempting to delete class:", { courseId, classDate, classTiming }); // Debug log
//         if (!window.confirm("Are you sure you want to delete this class?")) {
//             return; // User cancelled
//         }

//         try {
//             const response = await fetch(`https://learning-plat-36hz.vercel.app/class/${courseId}/teacher/${ID}/delete-class`, { // Corrected API path to https://learning-plat-36hz.vercel.app/class
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ date: classDate, timing: classTiming })
//             });

//             const res = await response.json();

//             if (!response.ok) {
//                 throw new Error(res.message || 'Failed to delete class');
//             }

//             alert(res.message);
//             // Update the state to remove the deleted class from the UI
//             setData(prevData => prevData.filter(clas => !(clas.courseId === courseId && clas.date === classDate && clas.timing === classTiming)));

//         } catch (error) {
//             console.error("Error deleting class:", error); // Debug log
//             setError(error.message);
//             alert(`Error: ${error.message}`);
//         }
//     };


//     if (error) {
//         return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
//     }

//     return (
//         <div className='ml-60 mt-20 text-white flex justify-between mr-80'>
//             <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

//             <div className='h-[17rem] w-[30rem] overflow-auto '>
//             {data.filter(clas => {
//             const classDate = new Date(clas.date.slice(0, 10));
//             const today = new Date();
//             const oneWeekFromNow = new Date();
//             oneWeekFromNow.setDate(today.getDate() + 7);

//             return classDate >= today && classDate <= oneWeekFromNow;
//             }).map(clas => (
//                 <div key={clas.timing + clas.date} className='flex items-center mb-5'> {/* Added clas.date to key for uniqueness */}
//                     <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
//                     <div className='ml-5 mr-10 font-bold'>
//                         <p className=' text-lg'>
//                             {clas.coursename}
//                             <span className='text-black text-sm ml-3'>
//                                 {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
//                             </span>
//                         </p>
//                         <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
//                     </div>
//                     <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
//                     <button 
//                         onClick={() => handleDeleteClass(clas.courseId, clas.date, clas.timing)} // Pass clas.courseId
//                         className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-auto'
//                     >
//                         Delete
//                     </button>
//                 </div>
//             ))}

//             </div>

//             {data.length > 0 && (
//                 <NavLink to={data[0]?.link} target='_blank'>
//                     <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
//                         <div className='flex gap-3 items-center mb-5 mt-2'>
//                             <img src={Clock} alt="clock" width={50} />
//                             <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
//                             <span className='text-[#018280] text-2xl ml-2'>
//                                 {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
//                             </span>
//                         </div>
//                         <div className='flex gap-12 items-center'>
//                             <div className='ml-3'>
//                                 <p>Your next Class</p>
//                                 <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename.toUpperCase()}</p>
//                                 <p className=' text-light-blue-700'>{data[0]?.title.slice(0, 25)} ...</p>
//                             </div>
//                             <img src={Camera} alt="Camera" width={70} />
//                         </div>
//                     </div>
//                 </NavLink>
//             )}

//             <div onClick={() => setShowPopup(true)} className='absolute right-10 bg-blue-900 p-2 rounded-sm cursor-pointer'>
//                 + ADD CLASS
//             </div>
//             {showPopup && (
//                 <AddClass onClose={() => setShowPopup(false)} />
//             )}
//         </div>
//     );
// }

// export default TeacherClasses;
import React, { useEffect, useState } from 'react';
import Camera from '../Images/Camera.png';
import Clock from '../Images/Clock.png';
import AddClass from './AddClass';
import { NavLink, useParams } from 'react-router-dom';

function TeacherClasses() {
    const [showPopup, setShowPopup] = useState(false);
    const { ID } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`https://learning-plat-36hz.vercel.app/course/classes/teacher/${ID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const user = await response.json();
                console.log("TeacherClasses.jsx: Raw API response for classes:", user); // DEBUG LOG: See full response
                setData(user.data.classes[0]?.liveClasses || []);
                console.log("TeacherClasses.jsx: State 'data' after setting:", user.data.classes[0]?.liveClasses || []); // DEBUG LOG: See what goes into state

            } catch (error) {
                console.error("TeacherClasses.jsx: Error fetching teacher classes:", error); // DEBUG LOG
                setError(error.message);
            }
        };
        getData();

    }, [showPopup, ID]);

    const handleDeleteClass = async (courseId, classDate, classTiming) => {
        console.log("handleDeleteClass called with:", { courseId, classDate, classTiming }); // DEBUG LOG: Check incoming params
        if (!window.confirm("Are you sure you want to delete this class?")) {
            return;
        }

        try {
            // Ensure the correct API path is used for the DELETE request
            const response = await fetch(`https://learning-plat-36hz.vercel.app/class/${courseId}/teacher/${ID}/delete-class`, { 
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ date: classDate, timing: classTiming })
            });

            const res = await response.json();

            if (!response.ok) {
                throw new Error(res.message || 'Failed to delete class');
            }

            alert(res.message);
            setData(prevData => prevData.filter(clas => !(clas.courseId === courseId && clas.date === classDate && clas.timing === classTiming)));

        } catch (error) {
            console.error("TeacherClasses.jsx: Error deleting class:", error); // DEBUG LOG
            setError(error.message);
            alert(`Error: ${error.message}`);
        }
    };


    if (error) {
        return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
    }

    return (
        <div className='ml-60 mt-20 text-white flex justify-between mr-80'>
            <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

            <div className='h-[17rem] w-[30rem] overflow-auto '>
            {data.filter(clas => {
            const classDate = new Date(clas.date.slice(0, 10));
            const today = new Date();
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(today.getDate() + 7);

            return classDate >= today && classDate <= oneWeekFromNow;
            }).map(clas => {
                console.log("TeacherClasses.jsx: Rendering class object:", clas); // DEBUG LOG: Inspect each class before rendering
                return (
                    <div key={clas.timing + clas.date + clas.courseId} className='flex items-center mb-5'> {/* Added clas.courseId to key for uniqueness */}
                        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
                        <div className='ml-5 mr-10 font-bold'>
                            <p className=' text-lg'>
                                {clas.coursename}
                                <span className='text-black text-sm ml-3'>
                                    {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
                                </span>
                            </p>
                            <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
                        </div>
                        <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
                        <button 
                            onClick={() => handleDeleteClass(clas.courseId, clas.date, clas.timing)} 
                            className='bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md ml-auto'
                        >
                            Delete
                        </button>
                    </div>
                );
            })}

            </div>

            {data.length > 0 && (
                <NavLink to={data[0]?.link} target='_blank'>
                    <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
                        <div className='flex gap-3 items-center mb-5 mt-2'>
                            <img src={Clock} alt="clock" width={50} />
                            <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
                            <span className='text-[#018280] text-2xl ml-2'>
                                {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
                            </span>
                        </div>
                        <div className='flex gap-12 items-center'>
                            <div className='ml-3'>
                                <p>Your next Class</p>
                                <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename.toUpperCase()}</p>
                                <p className=' text-light-blue-700'>{data[0]?.title.slice(0, 25)} ...</p>
                            </div>
                            <img src={Camera} alt="Camera" width={70} />
                        </div>
                    </div>
                </NavLink>
            )}

            <div onClick={() => setShowPopup(true)} className='absolute right-10 bg-blue-900 p-2 rounded-sm cursor-pointer'>
                + ADD CLASS
            </div>
            {showPopup && (
                <AddClass onClose={() => setShowPopup(false)} />
            )}
        </div>
    );
}

export default TeacherClasses;
