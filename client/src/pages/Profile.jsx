import { useSelector } from "react-redux"

export default function Profile() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className='text-3xl text-center font-bold my-9'>Profile</h1>
      <form  className='flex flex-col gap-5'>
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 object-cover hover:cursor-pointer self-center mt-2" />
        <input
          type='text'
          placeholder='username'
          className='border p-3 rounded-lg'
          id='username'
        />
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
        />
        <button className="bg-gray-800 text-white p-3 rounded-lg uppercase hover:opacity-85 disabled:opacity-70">Update</button>
        </form>
        <div className="flex justify-between mt-5">
          <span className="text-red-700 cursor-pointer">Delete Account</span>
          <span className="text-red-700 cursor-pointer">Sign Out</span>
        </div>
    </div>
    
  )
}
