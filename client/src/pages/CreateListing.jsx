import React, { useState } from 'react'
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

export default function CreateListing() {
    const [files,setFiles]=useState([]);
    const [formData,setFormData]=useState({
        imageUrls:[],
    })
    const [imageUploadError,setImageUploadError]=useState(false)
    const [uploading,setUploading]=useState(false)
    const handleImageSubmit=(e)=>{
        if (files.length > 0 && files.length + formData.imageUrls.length <7){
            setUploading(true)
            setImageUploadError(false)
            const promises = [];
            for (let i=0; i < files.length; i++){
                promises.push(
                    storeImage(files[i])
                );
            }
            Promise.all(promises).then((urls)=>{
                setFormData({
                    ...formData,imageUrls: formData.imageUrls.concat(urls)
                });
                setImageUploadError(false)
                setUploading(false)
                
            }).catch((error)=>{
                setImageUploadError('Image upload failed! (2 mb max per image')
                setUploading(false)
            })
        }else{
            setImageUploadError('You can only upload maximum of 6 images per listing!')
            setUploading(false)
        }
    };

    const storeImage = async(file)=>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file)

            uploadTask.on(
                "state_changed",
                (snapshot)=>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    console.log(`Upload is ${progress}% done`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL=>{
                        resolve(downloadURL);
                    }
                    )
                }
            )
        })
    }

    const handleRemoveImage=(index)=>{
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_,i)=>i!==index),
        })
    }
  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl text-center font-bold my-9'>
            Create a listing
        </h1>
        <form className='flex flex-col sm:flex-row gap-5'>
        <div className='flex flex-col gap-5 flex-1'>
            <input
          type='text'
          placeholder='Name'
          className='border p-3 rounded-lg'
          id='name'
          maxLength='100' minLength='5' required
        />
        <textarea
          type='text'
          placeholder='Description'
          className='border p-3 rounded-lg'
          id='description' required
        />
        <input
          type='password'
          placeholder='Address'
          className='border p-3 rounded-lg'
          id='address' required
        />
        <div className='flex gap-7 flex-wrap'>
            <div className='flex gap-2'>
                <input type="checkbox" id='sale' className='w-5 '/>
                <span className='font-semibold'>Sell</span>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" id='rent' className='w-5'/>
                <span className='font-semibold'>Rent</span>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" id='parkingSpot' className='w-5'/>
                <span className='font-semibold'>Parking Spot</span>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" id='furnished' className='w-5'/>
                <span className='font-semibold' >Furnished</span>
            </div>
            <div className='flex gap-2'>
                <input type="checkbox" id='offer' className='w-5'/>
                <span className='font-semibold'>Offer</span>
            </div>
        </div>
        <div className='flex flex-wrap gap-7'>
            <div className='flex items-center gap-2'>
                <input type="number" id='bedrooms' min='1' max='15' required className='p-3 border border-gray-300 rounded-lg'/>
                <p className='font-semibold'>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type="number" id='bathrooms' min='1' max='8' required className='p-3 border border-gray-300 rounded-lg'/>
                <p className='font-semibold'>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type="number" id='regularPrice' min='1' max='8' required className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                <p className='font-semibold'>Regular Price</p>
                <span className='text-sm'>($ / month)</span>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <input type="number" id='discountedPrice' min='1' max='15' required className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                <p className='font-semibold'>Discounted Price</p>
                <span className='text-sm'>($ / month)</span>
                </div>
            </div>
        </div>
        </div>
        <div className='flex flex-col flex-1 gap-5'>
            <p className='font-semibold'>Images:
            <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6 images)</span>
            </p>
            <div className='flex gap-5'>
                <input onChange={(e)=>setFiles(e.target.files)} className='p-3 border border-gray-300 rounded-lg w-full' type="file" id="images" accept='images/*' multiple/>
                <button disabled={uploading} type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-70'>{uploading ? 'Uploading.....' : 'Upload'}</button>
            </div>
            <p className='text-red-700 font-semibold text-sm'>{imageUploadError && imageUploadError}</p>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
                    <div key={url} className='flex justify-between p-3 border items-center'>
                        <img src={url} alt="listing image" className='w-20 h-20 object-contain rounded-lg' />
                        <button type='button' onClick={()=>handleRemoveImage(index)} className='p-3 text-red-700 rounded-lg font-semibold uppercase hover:opacity-75'>Delete</button>
                    </div>
                ))
            }
        <button className='p-3 bg-gray-800 text-white text-center rounded-lg uppercase hover:opacity-80 disabled:opacity-70'>
            Create Listing
        </button>

        </div>
        </form>
    </main>
  )
}