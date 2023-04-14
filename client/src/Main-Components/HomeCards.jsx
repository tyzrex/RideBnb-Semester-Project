import React from 'react'
import PopularCard from './Cards/PopularCard'

const HomeCards = () => {
  return (
    <div className='w-screen mx-auto mt-[240px] py-[100px] lg:mt-0 lg:py-[150px] h-auto bg-[#f8f8f8]'>
        <div className='w-full max-w-[95%] lg:max-w-[1300px] mx-auto flex flex-col justify-center items-center'>
        <div className='flex justify-center w-full items-center'>
            <div className='max-w-[95%] flex justify-between w-full lg:max-w-[1300px]'>
                <h1 className='text-3xl font-bold'>Popular Choices</h1>
                <h1 className='text-2xl font-bold'><u>Explore All</u></h1>
            </div>
        </div>  

        <div>
        <div className="grid mx-auto mt-10 justify-items-center w-screen max-w-[95%] lg:max-w-[1300px] content-center gap-7 xl:grid-cols-4 grid-cols-1 md:grid-cols-2">
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
            <PopularCard />
        </div>
        </div>
        </div>
    </div>
  )
}

export default HomeCards