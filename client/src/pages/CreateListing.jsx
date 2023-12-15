import React from 'react'

export default function CreateListing() {
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
                <input className='p-3 border border-gray-300 rounded-lg w-full' type="file" id="images" accept='images/*' multiple/>
                <button className='p-3 text-green-700 border border-green-700 rounded-lg uppercase hover:shadow-lg disabled:opacity-70'>Upload</button>
            </div>
        <div className='p-3 bg-gray-800 text-white text-center rounded-lg uppercase hover:opacity-80 disabled:opacity-70'>
            Create Listing
        </div>
        </div>
        </form>
    </main>
  )
}
