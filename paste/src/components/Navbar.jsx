import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-center gap-40 bg-blue-950 h-12'>
      <NavLink to={'/'}>
        <span className='text-2xl text-white p-5'>Home</span>
      </NavLink>
      <NavLink to={'/pastes'}>
        <span className='text-2xl text-white p-5'>Paste</span>
      </NavLink>
    </div>
  )
}

export default Navbar
