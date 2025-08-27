// import React,{ useEffect, useState } from 'react'
// import Camera from '../Images/Camera.png'
// import Clock from '../Images/Clock.png'
// import { NavLink, useParams } from 'react-router-dom'

// function StudentClasses() {
//     const { ID } = useParams();
//     const [data, setdata] = useState([]);

//     useEffect(() => {
//         const getData = async () => {
//           try {
//             const response = await fetch(`/api/course/classes/student/${ID}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
    
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
    
//             const user = await response.json();
//             setdata(user.data.classes[0].liveClasses);
//             console.log(user.data.classes[0].liveClasses);

//           } catch (error) {
//             setError(error.message)
//           }
//         };
//         getData();
//     },[ID]);

//   return (
//     <div className='ml-60 mt-20 text-white flex justify-between mr-60'>
//         <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

//         <div className='h-[17rem] w-[30rem] overflow-auto '>
//         {data.filter(clas => {
//           const classDate = new Date(clas.date.slice(0, 10));
//           const today = new Date();
//           const oneWeekFromNow = new Date(today);
//           oneWeekFromNow.setDate(today.getDate() + 7);

//           return classDate >= today && classDate <= oneWeekFromNow;
//         }).map((clas) => (
//         <div key={clas.timing} className='flex items-center mb-5'>
//         <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
//         <div className='ml-5 mr-10 font-bold'>
//             <p className=' text-lg'>{clas.coursename}
//                 <span className='text-black text-sm ml-3'>
//                     {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
//                 </span>
//             </p>
//             <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
//         </div>
//         <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
//     </div>
// ))}

//         </div>
        
//           <NavLink to={data[0]?.link} target='_blank'>
//             <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
//                 <div className='flex gap-3 items-center mb-5 mt-2'>
//                     <img src={Clock} alt="clock" width={50} />
//                     <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
//                     <span className='text-[#018280] text-2xl ml-2'>
//                         {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
//                     </span>
//                 </div>
//                 <div className='flex gap-12 items-center'>
//                     <div className='ml-3'>
//                         <p>Your next Class</p>
//                         <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename}</p>
//                         <p className=' text-light-blue-700'>{data[0]?.title.slice(0,25)} ...</p>
//                     </div>
//                     <img src={Camera} alt="Camera" width={70}/>
//                 </div>
//             </div>
//           </NavLink>
//     </div>
//   )
// }

// export default StudentClasses













// import React,{ useEffect, useState } from 'react'
// import Camera from '../Images/Camera.png'
// import Clock from '../Images/Clock.png'
// import { NavLink, useParams } from 'react-router-dom'

// function StudentClasses() {
//     const { ID } = useParams();
//     const [data, setdata] = useState([]);
//     const [error, setError] = useState(null); // Add this line to define setError

//     useEffect(() => {
//         const getData = async () => {
//           try {
//             const response = await fetch(`/api/course/classes/student/${ID}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             });
    
//             if (!response.ok) {
//               throw new Error('Failed to fetch data');
//             }
    
//             const user = await response.json();
//             setdata(user.data.classes[0].liveClasses);
//             console.log(user.data.classes[0].liveClasses);

//           } catch (error) {
//             setError(error.message) // This line will now work
//           }
//         };
//         getData();
//     },[ID]);

//   return (
//     <div className='ml-60 mt-20 text-white flex justify-between mr-60'>
//         <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

//         <div className='h-[17rem] w-[30rem] overflow-auto '>
//         {data.filter(clas => {
//           const classDate = new Date(clas.date.slice(0, 10));
//           const today = new Date();
//           const oneWeekFromNow = new Date(today);
//           oneWeekFromNow.setDate(today.getDate() + 7);

//           return classDate >= today && classDate <= oneWeekFromNow;
//         }).map((clas) => (
//         <div key={clas.timing} className='flex items-center mb-5'>
//         <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
//         <div className='ml-5 mr-10 font-bold'>
//             <p className=' text-lg'>{clas.coursename}
//                 <span className='text-black text-sm ml-3'>
//                     {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
//                 </span>
//             </p>
//             <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
//         </div>
//         <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
//     </div>
// ))}

//         </div>
        
//           <NavLink to={data[0]?.link} target='_blank'>
//             <div className='bg-white p-5 h-52 cursor-pointer rounded-lg text-black'>
//                 <div className='flex gap-3 items-center mb-5 mt-2'>
//                     <img src={Clock} alt="clock" width={50} />
//                     <span className='text-[#4E84C1] text-2xl font-semibold'>{typeof data[0]?.date === 'string' ? data[0]?.date.slice(0,10) : ''}</span> 
//                     <span className='text-[#018280] text-2xl ml-2'>
//                         {typeof data[0]?.timing === 'number' ? `${Math.floor(data[0]?.timing / 60)}:${data[0]?.timing % 60 === 0 ?"00":data[0]?.timing % 60}` :''}
//                     </span>
//                 </div>
//                 <div className='flex gap-12 items-center'>
//                     <div className='ml-3'>
//                         <p>Your next Class</p>
//                         <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename}</p>
//                         <p className=' text-light-blue-700'>{data[0]?.title.slice(0,25)} ...</p>
//                     </div>
//                     <img src={Camera} alt="Camera" width={70}/>
//                 </div>
//             </div>
//           </NavLink>
//     </div>
//   )
// }

// export default StudentClasses










// import React,{ useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import Popup from './Popup';
// import axios from 'axios';

// function StudentCourses() {
//   const { ID } = useParams();
//   const [data, setdata] = useState([]);
//   const [popup, setPopup] = useState(false);
//   const [subDetails, setsubDetails] = useState({});
//   const [subD, setsubD] = useState();
//   const [error, setError] = useState(null); // Add this line

//   useEffect(() => {
//       const getData = async () => {
//         try {
//           const response = await fetch(`/api/course/student/${ID}/enrolled`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include', // Ensure credentials are included
//           });
  
//           if (!response.ok) {
//             // Throw an error if response is not ok, so catch block can handle it
//             throw new Error('Failed to fetch data');
//           }
  
//           const user = await response.json();
//           setdata(user.data);
//           console.log(user.data);

//         } catch (error) {
//           setError(error.message) // This line will now work
//         }
//       };
//       getData();
//   },[ID]);

//   const openpopup = async(sub)=>{ 
//     setsubDetails(sub);
//     await axios.get(`/api/course/${sub.coursename}`)
//       .then(res => {setPopup(true);
//       setsubD(res.data.data)})
//   }

//   const price = {
//     math: 700,
//     physics: 800,
//     computer: 1000,
//     chemistry: 600,
//     biology: 500,
//   };

//   const daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

//   const Image = {
//     "physics" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/8e9bf690d23d886f63466a814cfbec78187f91d2",
//     "chemistry" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/3e546b344774eb0235acc6bf6dad7814a59d6e95",
//     "biology" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/28ac70002ae0a676d9cfb0f298f3e453d12b5555",
//     "math" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/61930117e428a1f0f7268f888a84145f93aa0664",
//     "computer" : "https://www.figma.com/file/6b4R8evBkii6mI53IA4vSS/image/a64c93efe984ab29f1dfb9e8d8accd9ba449f272",
//   }

//   return (
//     <>
//     {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Display error message */}
//     <div className='flex gap-10 pl-[12rem] mt-12 flex-wrap justify-center mb-2'>
//         {data.map(sub => (
//           <div key={sub._id} className="text-white rounded-md bg-[#042439] cursor-pointer text-center p-3 w-[15rem]" onClick={()=>openpopup(sub)}>
//             <div className='flex justify-center items-center'>
//               <img src={Image[sub.coursename]} alt={sub.coursename} width={60}/>
//               <p>{sub.coursename.toUpperCase()}</p>
//             </div>
//             <p className='mt-5 text-gray-300 text-sm text-center px-2 '>{sub.description}</p>

//             {sub.schedule && (
//               <div>
//                 <p className='mt-2 text-blue-700 font-bold'>Timing:</p>
//                 {'[ '}
//                 {sub.schedule.map(daytime => {
//                   return `${daysName[daytime.day]} ${Math.floor(daytime.starttime / 60)}:${daytime.starttime % 60 === 0 ? "00" : daytime.starttime % 60} - ${Math.floor(daytime.endtime/60)}:${daytime.endtime % 60 === 0 ? "00" : daytime.endtime % 60}`;
//                 }).join(', ')}
//                 {' ]'}
//               </div>
//             )}
        
//             {/* <p className='mt-5 text-gray-300 text-sm text-center px-2 '>Fees : Rs. {price[sub.coursename]}</p> */}
//           </div>
//         ))}
//     </div>
//     {popup && (
//       <Popup onClose={()=> setPopup(false)} subject={subDetails} allSubject={subD}/>
//     )}
//     </>
//   )
// }

// export default StudentCourses








import React,{ useEffect, useState } from 'react'
import Camera from '../Images/Camera.png'
import Clock from '../Images/Clock.png'
import { NavLink, useParams } from 'react-router-dom'

function StudentClasses() {
    const { ID } = useParams();
    const [data, setdata] = useState([]);

    useEffect(() => {
        const getData = async () => {
          try {
            const response = await fetch(`/api/course/classes/student/${ID}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            });
    
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
    
            const user = await response.json();
            setdata(user.data.classes[0].liveClasses);
            console.log(user.data.classes[0].liveClasses);

          } catch (error) {
            setError(error.message)
          }
        };
        getData();
    },[ID]);

  return (
    <div className='ml-60 mt-20 text-white flex justify-between mr-60'>
        <h1 className='absolute bottom-72 left-60 text-[#1671D8] text-2xl mt-4 mb-4 font-semibold'>Weekly Schedule</h1>

        <div className='h-[17rem] w-[30rem] overflow-auto '>
        {data.filter(clas => {
          const classDate = new Date(clas.date.slice(0, 10));
          const today = new Date();
          const oneWeekFromNow = new Date(today);
          oneWeekFromNow.setDate(today.getDate() + 7);

          return classDate >= today && classDate <= oneWeekFromNow;
        }).map((clas) => (
        <div key={clas.timing} className='flex items-center mb-5'>
        <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png" alt="profile_img" width={30} />
        <div className='ml-5 mr-10 font-bold'>
            <p className=' text-lg'>{clas.coursename}
                <span className='text-black text-sm ml-3'>
                    {clas.date.slice(0, 10)}  {Math.floor(clas.timing / 60)}:{clas.timing % 60 === 0 ? "00" : clas.timing % 60}
                </span>
            </p>
            <span className='text-blue-500 text-sm ml-3'>{clas.title.slice(0, 35)} ...</span>
        </div>
        <p className='text-sm bg-[#4E84C1] p-2 rounded-lg'>{clas.status}</p>
    </div>
))}

        </div>
        
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
                        <p className='text-[#018280] text-3xl font-semibold'>{data[0]?.coursename}</p>
                        <p className=' text-light-blue-700'>{data[0]?.title.slice(0,25)} ...</p>
                    </div>
                    <img src={Camera} alt="Camera" width={70}/>
                </div>
            </div>
          </NavLink>
    </div>
  )
}

export default StudentClasses