import React from 'react'

const Banner = () => {
  return (
    <img className='rsvpBanner' src={process.env.PUBLIC_URL + '/images/floralBackground1.webp'} alt='Banner' />
  )
}

export default Banner