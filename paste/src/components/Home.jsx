import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import toast from 'react-hot-toast'

const Home = () => {

  const [title , setTitle] = useState('')
  const [value , setValue] = useState('')
  const [searchParams , setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId")
  const dispatch = useDispatch()
  const allPastes = useSelector((state)=>state.paste.pastes)

  function createPaste(){
    const paste = {
      title:title,
      content:value,
      _id:pasteId || Date.now().toString(36),
      created:new Date().toLocaleDateString("en-GB",{
        day:"2-digit",
        month:"short",
        year:"numeric"
      })
  
    }
    if(pasteId){
      dispatch(updateToPastes(paste))
    }
    else{
      dispatch(addToPastes(paste))
    }
    setTitle('')
    setValue('')
    setSearchParams({})
  }


  useEffect(()=>{
    if(pasteId){
      const paste = allPastes.find((p)=>p._id===pasteId)
      setTitle(paste.title)
      setValue(paste.content)
    }
  },[pasteId])

  const pastes =  useSelector((state)=>state.paste.pastes)
  console.log(pastes.content)

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-7  m-5 justify-between items-center w-[65vw]'>
        <input type="text" 
      className='p-2 rounded mt-2 border border-gray-400 hover:scale-102  w-[60vw] pl-4'
      placeholder='Enter title here'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
      <button className='p-1 rounded mt-2 bg-blue-600 text-white w-40 h-10 hover:scale-102' 
      onClick={createPaste}>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
      </div>
      <div className='flex flex-col gap-0 p-0 m-0'>
        <div className='h-10 border border-b-0 border-gray-400 mb-0  rounded-t-2xl flex justify-end items-center'>
          <button className='flex justify-center items-center border w-12 h-6 rounded-full m-3 hover:scale-102 '
          onClick={()=>{
                    navigator.clipboard.writeText(pastes?.content)
                    toast.success("Copied to clipboard")
          }}
          >
            <img className='h-5 w-5 ' src={assets.copy} alt="" />
          </button>
        </div>
        <textarea value={value}
        className=' rounded-2xl rounded-t-none min-w-250 p-5  border border-gray-400'
        placeholder='Write your content here...'
        onChange={(e)=>setValue(e.target.value)}
        rows={20}
        />
      </div>
    </div>
  )
}

export default Home
