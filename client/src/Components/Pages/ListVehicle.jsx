import React, {useState} from 'react'
import Navbar from '../../Main-Components/Navbar'

const ListVehicle = () => {
    const [data, setData] = useState({
        vehicleName: "",
        vehicleBrand: "",
        vehicleColor: "",
        pricePerDay: "",
        vehicleMakeYear: "",
        vehicleType: "",
        vehicleDescription: "",
        vehicleImage: "",
    });
    
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };


  return (
    <div>
        <Navbar />
        <div className='flex justify-center items-center mt-10'>
            <h1 className='text-3xl font-bold'>List Your Vehicle</h1>
        </div>

        <div>
        <section class="w-screen max-w-[95%] lg:max-w-[1300px] p-6 mx-auto text-black rounded-md shadow-md dark:bg-gray-800 mt-5">
    <h1 class="text-xl font-bold text-white capitalize dark:text-white">Account settings</h1>
    <form>
        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
                <label class="" for="username">Vehicle Name</label>
                <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="" for="emailAddress">Vehicle Brand</label>
                <input id="emailAddress" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="" for="password">Vehicle Color</label>
                <input id="password" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="" for="price">Price Per Day</label>
                <input id="price" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="" for="makeyear">Vehicle Make Year</label>
                <input id="makeyear" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" />
            </div>

            <div>
                <label class="" for="type">Vehicle Type</label>
                <select class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md">
                    <option>Car</option>
                    <option>Bike</option>
                </select>
            </div>

            <div>
                <label class="" for="description">Vehicle description</label>
                <textarea id="textarea" type="textarea" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md" ></textarea>
            </div>
            <div>
                <label class="block text-sm font-medium">
                Image
              </label>
              <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div class="space-y-1 text-center">
                  <svg class="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <div class="flex text-sm text-gray-600 justify-center items-center">
                    <label for="file-upload" class="relative cursor-pointer bg-black rounded-md font-medium text-white p-2">
                      <span class="">Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                    </label>
                    <p class="pl-1">or drag and drop</p>
                  </div>
                  <p class="text-xs">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
        </div>

        <div class="flex justify-end mt-6">
            <button class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-black rounded-md hover:bg-pink-700 focus:outline-none focus:bg-gray-600">Save</button>
        </div>
    </form>
</section>
        </div>
    </div>
  )
}

export default ListVehicle