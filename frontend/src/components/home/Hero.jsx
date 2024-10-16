import React from 'react'
import hero from '../../assete/hero/hero2.gif'


const Hero = () => {
  return (
    <div className="flex justify-center items-center p-4 ">
    <div className="w-full max-w-[1500px] aspect-[2080/1080] relative overflow-hidden rounded-3xl shadow-2xl">
      <img 
        src={hero} 
        alt="Hero"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  )
}

export default Hero

