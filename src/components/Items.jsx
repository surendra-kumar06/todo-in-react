import React, { useState } from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

const Items = ({task,deleteTass,update}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newtask, setNewTask] = useState(task.task);

  return (
    <div className="w-full flex justify-between items-center gap-3 p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
    <input 
      type="text" 
      className={`outline-none rounded-lg bg-gradient-to-r from-fuchsia-600 to-purple-600 p-2 w-full text-white placeholder-gray-400 ${isEdit ? 'border-2 border-pink-300' : 'border-none'} transition-all duration-100`} 
      value={newtask} 
      readOnly={!isEdit} 
      onChange={(e) => setNewTask(e.target.value)}
      placeholder="Enter task..."
    />
    <FaRegTrashCan 
      className="text-xl text-red-500 cursor-pointer hover:text-red-700 transition-all duration-300" 
      onClick={() => deleteTass(task.id)} 
    />
    
    {!isEdit ? (
      <FaEdit 
        className="text-xl text-yellow-500 cursor-pointer hover:text-yellow-700 transition-all duration-300" 
        onClick={() => setIsEdit(true)} 
      />
    ) : (
      <FaRegSave 
        className="text-xl text-green-500 cursor-pointer hover:text-green-700 transition-all duration-300" 
        onClick={() => { setIsEdit(false); update(newtask, task.id); }} 
      />
    )}
  </div>
  
  )
}

export default Items