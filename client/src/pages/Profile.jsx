import { useSelector } from "react-redux"
import { useRef, useState , useEffect} from "react"
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import { app } from "../firebase";
import { updateUserStart,updateUserSuccess,updateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signOutStart,signOutSuccess,signOutFailure } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

export default function Profile() {
  const fileRef = useRef(null);
  const {currentUser,loading,error} = useSelector(state => state.user)
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0);
  const [fileUploadError,setFileUploadError]=useState(false);
  const [formData,setFormData]=useState({})
  const [updateSuccess,setUpdateSuccess]=useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    if(file){
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload=(file)=>{
    const storage = getStorage(app);
    const fileName =new Date().getTime() + file.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,file)

    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
    (error) => {
      setFileUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
        setFormData({...formData,avatar:downloadURL})
      })
    }
    );
  };
  

  const handleChange = (e) => {
    setFormData({...formData , [e.target.id] :e.target.value});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch (`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false){
        dispatch(updateUserFailure(data.message))
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);

    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const handleDelete=async()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const handleSignOut = async () =>{
    try {
      dispatch(signOutStart())
      const res = await fetch('api/auth/signout')
      const data = await res.json()
      if (data.success===false){
        dispatch(signOutFailure(data.message))
        return;
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(error.message))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-bold my-9'>Profile</h1>
      <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*"/>
      <form onSubmit={handleSubmit}  className='flex flex-col gap-5'>
        <img onClick={()=>fileRef.current.click()} src={formData.avatar || currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2" />
        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-800 font-semibold">Error in uploading image!! (Image must be less then 2mb)</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-800 font-semibold">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-800 font-semibold">Image uploaded successfully!!</span>
          ) : ( 
            ''
            )
          }
        </p>
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-gray-800 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70">{loading ? 'Loading.....' : 'Update'}</button>

        <Link className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-85" to={'/create-listing'}>
          Create Listing
        </Link>
        </form>
        <div className="flex justify-between mt-5">
          <span onClick={handleDelete} className="text-red-700 font-semibold cursor-pointer">Delete Account</span>
          <span onClick={handleSignOut} className="text-red-700 font-semibold cursor-pointer">Sign Out</span>
        </div>

        <p className="text-red-700 font-semibold mt-5">{error ? error : ''}</p>
        <p className="text-green-700 font-semibold mt-5">{updateSuccess ? 'User is updated successfully!' : ''}</p>
        
    </div>
    
  )
}
