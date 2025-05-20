import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Button.css'

const Button = () => {
    const navigate = useNavigate();
  return (
    <button className='backBtn' onClick={()=> navigate('/')}>Back to RSVP</button>
)
}

export default Button