import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import userMockData from '../data/mockUserData';
import mockPollData from '../data/mockPollsData';
import PollItem from '../components/PollItem';

const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();

  // Find the user by username
  const user = userMockData.find((user) => user.username === username);

  if (!user) {
    console.error('User not found');
    return <p className="text-center text-red-500">User not found.</p>;
  }

  // Debugging: Log user and poll data
  console.log('User:', user);
  console.log('Mock Poll Data:', mockPollData);

  // Retrieve the polls created and answered by the user
  const pollsCreated = user.pollsCreated.map(pollId => {
    const poll = mockPollData.find(poll => poll.id === pollId);
    console.log('Poll Created:', poll); // Debugging: Log each found poll
    return poll;
  }).filter(Boolean);  // Remove undefined values if any

  const pollsAnswered = user.pollsAnswered.map(pollId => {
    const poll = mockPollData.find(poll => poll.id === pollId);
    console.log('Poll Answered:', poll); // Debugging: Log each found poll
    return poll;
  }).filter(Boolean);  // Remove undefined values if any

  const handleDeletePoll = (pollId) => {
    console.log(`Poll ${pollId} deleted`);
    // Implement the actual deletion logic here, possibly involving state update
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-6">
        <img
          src={user.profileImage || 'https://i.pravatar.cc/150?img=68'}
          alt="Profile"
          className="w-32 h-32 rounded-full mb-4"
        />
        <h1 className="text-3xl font-semibold">{user.name}</h1>
        <p className="text-gray-600">@{user.username}</p>
        <p className="text-gray-600">{user.email}</p>
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-2xl font-semibold mb-4">Polls Created</h2>
          {pollsCreated.length > 0 ? (
            pollsCreated.map(poll => (
              poll && (
                <PollItem
                  key={poll.id}
                  poll={poll}
                  created={true}
                  onDelete={() => handleDeletePoll(poll.id)}
                />
              )
            ))
          ) : (
            <p className="text-gray-600">No polls created.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Polls Answered</h2>
          {pollsAnswered.length > 0 ? (
            pollsAnswered.map(poll => (
              poll && (
                <PollItem
                  key={poll.id}
                  poll={poll}
                  created={false}
                />
              )
            ))
          ) : (
            <p className="text-gray-600">No polls answered.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;



































































// import { useSelector } from "react-redux";
// import { useRef, useState, useEffect } from "react";
// import {
//   getDownloadURL,
//   getStorage,
//   ref,
//   uploadBytesResumable,
// } from "firebase/storage";
// import { app } from "../firebase.js";
// import {
//   updateUserStart,
//   updateUserSuccess,
//   updateUserFailure,
//   deleteUserFailure,
//   deleteUserSuccess,
//   deleteUserStart,
//   signOutUserStart,
//   signOutUserSuccess,
//   signOutUserFailure,
// } from "../redux/user/userSlice.js";
// import { useDispatch } from "react-redux";
// // firebase storage rules-
// //       allow read;
// //       allow write : if
// //       request.resource.size < 2*124*1024 &&
// //       request.resource.contentType.matches('image/.*')
// export default function Profile() {
//   const fileRef = useRef(null);
//   const { currentUser, loading, error } = useSelector((state) => state.user);
//   const [file, setFile] = useState(undefined);
//   const [filePerc, setFilePerc] = useState(0);
//   const [fileUploadError, setFileUploadError] = useState(false);
//   const [formData, setFormData] = useState({});
//   const [updateSuccess , setUpdateSuccess] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     if (file) {
//       handelFileUpload(file);
//     }
//   }, [file]);
//   const handelFileUpload = (file) => {
//     const storage = getStorage(app);
//     const fileName = new Date().getTime() + file.name;
//     const storageRef = ref(storage, fileName);
//     const uploadTask = uploadBytesResumable(storageRef, file);
//     uploadTask.on("state_changed", (snapshot) => {
//       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//       setFilePerc(Math.round(progress));
//     },
//     (error) => {
//       setFileUploadError(true);
//     },
//     () => {
//       getDownloadURL(uploadTask.snapshot.ref).then
//       ((downloadURL) => {
//         setFormData({ ...FormData, avatar: downloadURL });
//       });
//     }
//     )
//   };
//   const handleChange = (e) =>{
//     setFormData({...formData, [e.target.id]:e.target.value});
//   };

//   const handleSubmit = async (e) =>{
//     e.preventDefault();
//     try {
//       dispatch(updateUserStart());
//       const res = await fetch(`/api/user/update/${currentUser._id}` , {
//         method:"POST",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         body:JSON.stringify(formData),
//         });
//         const data = await res.json();

//         if(data.success ==  false){
//           dispatch(updateUserFailure(data.message));
//           return ;
//         }
//         dispatch(updateUserSuccess(data));
//         setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(updateUserFailure(error.message));
//     }

//   }
//   const handleDeleteUser = async ()=>{
//     try {
//       dispatch(deleteUserStart())
//       const res = await fetch(`/api/user/delete/${currentUser._id}` , {
//         method:"DELETE",
//         headers:{
//           "Content-Type":"application/json",
//         },
//         });
//         const data = await res.json();
//         if(data.success ==  false){
//           dispatch(deleteUserFailure(data.message));
//           return ;
//         }
//         dispatch(deleteUserSuccess(data));
//         setUpdateSuccess(true);
//     } catch (error) {
//       dispatch(deleteUserFailure(error.message));
//     }
//   }
//   const handleSignOut = async () => {
//     try {
//       dispatch(signOutUserStart())
//       const res = await fetch('/api/auth/signout');
//       const data = await res.json();
//       if(data.success == false) {
//         dispatch(signOutUserFailure(data.message));
//         return ;
//       }
//       dispatch(signOutUserSuccess(data));
//     } catch (error) {
//       dispatch(signOutUserFailure(data.message));
//     }
//   };
//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           onChange={(e) => setFile(e.target.files[0])}
//           type="file"
//           ref={fileRef}
//           hidden
//           accept="image/*"
//         />
//         <img
//           onClick={() => fileRef.current.click()}
//           src={formData.avatar || currentUser.avatar}
//           alt="Profile Avatar"
//           className="rounded
//         -full h-24 w-24 object-cover cursor-pointer self-center "
//         />
//         <p className="text-sm self-center">
//           {fileUploadError ? (
//             <span className="text-red-700">
//               Error while uploading file Image Must be less then 2MB
//             </span>
//           ) : filePerc > 0 && filePerc < 100 ? (
//             <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
//           ) : filePerc === 100 && !fileUploadError ? (
//             <span className="text-green-700">Image Uploaded Successfully</span>
//           ) : (
//             ""
//           )}
//         </p>
//         <input
//           type="text"
//           placeholder="username"
//           className="border
//           p-3 rounded-lg"
//           defaultValue={currentUser.username}
//           id="username"
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="email"
//           className="border
//           p-3 rounded-lg"
//           defaultValue={currentUser.email}
//           id="email"
//           onChange={handleChange}
//         />
//         <input
//           type="text"
//           placeholder="password"
//           className="border
//          p-3 rounded-lg"
//           id="password"
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white rounded-lg 
//          p-3 uppercase hover:opacity-95 disabled:opacity-85"
//         >
//           {loading ? "Loading..." : "Update"}
//         </button>
//       </form>
//       <div className="flex justify-between mt-4">
//         <span
//           onClick={handleDeleteUser}
//           className="text-red-700 cursor-pointer"
//         >
//           Delete Account
//         </span>
//         <span onClick={handleSignOut} className="text-red-700 cursor-pointer">
//           {" "}
//           Sign Out
//         </span>
//       </div>
//       <p className="text-red-700 mt-3">{error ? error : ""}</p>
//       <p className="text-green-700 mt-3">
//         {updateSuccess ? "User is Updated Successfully" : ""}
//       </p>
//     </div>
//   );
// }
