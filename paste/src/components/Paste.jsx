import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'
import { assets } from '../assets/assets'
const Paste = () => {

  const pastes = useSelector((state)=>state.paste.pastes)
  const [search,setSearch]=useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste)=>paste.title.toLowerCase().includes(search.toLowerCase()))

  const handleDelete = (pasteId)=>{
    dispatch(removeFromPastes(pasteId))
  }

  return (
    <div className='flex flex-col items-center'>
      <input type="search"
      className='p-2 rounded min-w-[1200px] mt-5 border border-gray-400 hover:scale-102'
      placeholder='Search here'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5 w-300 border border-gray-400 rounded'>
        <div className='border-b border-gray-400 h-15 flex items-center p-2 text-3xl font-semibold'>All Pastes</div>
        {
          filteredData.length>0 && 
          filteredData.map((paste)=>{
            return(
              <div className='border border-gray-400 rounded hover:scale-101 min-h-30 m-2 p-2 flex'>
                <div className='hover:scale-101 w-[84%] flex flex-col border-r mr-1'>
                  <h1>{paste.title}</h1>
                  {paste.content}
                </div>
                {/* <div className='bg-red-500'>
                  {paste.content}
                </div> */}
                <div className='flex flex-col gap-4 '>
                  <div className=' flex justify-between gap-8 h-10'>
                    <button>
                    <a href={`/?pasteId=${paste?._id}`}>
                    <img className='h-5 w-5' src={assets.edit} />
                    </a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>
                    <img className='h-5 w-5' src={assets.view} alt="" />
                    </a>
                  </button>
                  <button onClick={()=>handleDelete(paste?._id)}>
                    <img className='h-5 w-5' src={assets.delete1} alt="" />
                  </button>
                  <button onClick={()=>{
                    navigator.clipboard.writeText(paste?.content)
                    toast.success("Copied to clipboard")
                  }}>
                    <img className='h-5 w-5' src={assets.copy} alt="" />
                  </button>
                  <button>
                    <img className='h-5 w-5' src={assets.send} alt="" />
                  </button>
                  </div>

                 <div className='flex justify-center'>
                  {paste.created}
                </div>

                </div>

              </div>
            )
          })
        
        }
      </div>
    </div>
  )
}

export default Paste
