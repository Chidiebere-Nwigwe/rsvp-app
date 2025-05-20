import React from 'react'


const Header = (props) => {
  return (
    <h1 className='heading' >{props.children}</h1>
  )
}

export default Header