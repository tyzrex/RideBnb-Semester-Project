import React from 'react'
import {AiFillCar} from 'react-icons/ai'
import {RiMotorbikeFill} from 'react-icons/ri'

const HeroCard = ({ onCarClick, onBikeClick }) => {

  return (
    <div className='flex justify-center h-auto items-center w-screen'>
        <div className='w-full flex flex-col justify-center items-center'>
            
            <div className='md:w-[70%] max-w-[1300px] w-[100%] relative'>
                <div className='bg-white md:w-[30%] w-[100%] rounded-t-md flex justify-around h-[50px] items-center absolute -translate-y-[50px]'>
                    <div >
                        <button onClick={onCarClick} className='flex justify-center items-center gap-1'>
                            <AiFillCar className='text-2xl'/>
                            <h1>Rent a car</h1>
                        </button>
                    </div>
                    <div>
                        <button onClick={onBikeClick} className='flex justify-center items-center gap-1'>
                            <RiMotorbikeFill className='text-2xl'/>
                            <h1>Rent a bike</h1>
                        </button>
                    </div>
                </div>


                <div className='bg-white p-20 rounded-b-md md:rounded-tr-md'>
                    Hero card
                </div>

                <div className='md:absolute md:right-[5%] flex items-center justify-center -translate-y-1/2'>
                    <button className='bg-black px-10 py-4 text-white rounded-md '>Find</button>
                </div>
            </div>        
        </div>
    </div>
  )
}

export default HeroCard