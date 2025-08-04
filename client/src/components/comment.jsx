import React from 'react';
import CustomImage from './customImage.jsx';
import {
  FaCheckCircle,
  FaEye,
  FaSmile,
  FaPlus,
  FaRetweet,
  FaRegComment
} from 'react-icons/fa';

const Comment = ({ 
  username, 
  avatar, 
  createdAt, 
  text
}) => {

  return (
    <div className="flex flex-col border-2 border-zinc-100 rounded-xl">
      <div className="flex items-center justify-between h-20 px-2">
        <h4 className="text-black text-sm flex gap-2 items-center">
          <CustomImage src={avatar || "bitcoin.png"} h={28} w={28} />
          {username}
          <FaCheckCircle className="text-blue-500 w-4 h-4 ml-1" />
          <span className="text-zinc-500 text-sm">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </h4>
        <button className="active:scale-106 rounded-xl h-fit flex flex-row items-center gap-2 bg-blue-600 text-white font-semibold text-xs px-2 py-1">
          <span className="font-light">+</span> Follow
        </button>
      </div>
      
      <p className="text-zinc-600 px-2 py-2 text-sm">{text}</p>
    
      <div className="flex gap-6 pl-2 px-2 items-center mt-2 pb-2 text-sm text-gray-700">
        <FaEye className="active:scale-106 cursor-pointer" />
        <FaRegComment className="active:scale-106 cursor-pointer" />
        <FaRetweet className="active:scale-106 cursor-pointer" />
        <div className="relative inline-block cursor-pointer">
          <FaSmile className="text-yellow-500 active:scale-106 text-lg" />
          <FaPlus className="absolute bottom-0 active:scale-106 right-0 text-[10px] text-green-600 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Comment;