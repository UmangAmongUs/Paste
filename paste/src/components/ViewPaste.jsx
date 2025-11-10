import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { useEffect } from 'react'

const ViewPaste = () => {

  const {id}=useParams()
  const allPastes = useSelector((state)=>state.paste.pastes)

  const paste = allPastes.filter((p)=>p._id===id)[0]

  return (
    <div className='flex flex-col gap-7 justify-center'>
      <div className='flex gap-4 justify-center'>
        <input type="text" 
        disabled
      className='p-2 rounded-2xl mt-2 hover:border border border-gray-400 w-[65%] pl-4'
      placeholder='Enter title here'
      value={paste.title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      </div>
      <div className=' flex justify-center '>
        <textarea value={paste.content}
        disabled
        className='mt-4 rounded-2xl min-w-[65%] p-4 border border-gray-400'
        placeholder='Enter content hear'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste
