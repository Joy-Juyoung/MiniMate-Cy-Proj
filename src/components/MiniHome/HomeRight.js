import React from 'react';
import { Link } from 'react-router-dom';
// import Miniroom from '../../assets/shop3.gif';
import Miniroom from '../../assets/miniroom(2).gif';
import Minime from '../../assets/shop1.gif';
import { managePosts } from '../../redux/tempData';

const update = [
  'New Post1',
  'New Post1',
  'New Post1',
  'New Post1',
  'New Post1',
];

const comments = [
  {
    name: 'Jhon Bob',
    nickname: 'Best',
    content: 'Hi dsflksjdfklsjf',
  },
  {
    name: 'Jhon Bob',
    nickname: 'Best',
    content: 'Hi dsflksjdfklsjf',
  },
  {
    name: 'Jhon Bob',
    nickname: 'Best',
    content: 'Hi dsflksjdfklsjf',
  },
  {
    name: 'Jhon Bob',
    nickname: 'Best',
    content: 'Hi dsflksjdfklsjf',
  },
  {
    name: 'Jhon Bob',
    nickname: 'Best',
    content: 'Hi dsflksjdfklsjf',
  },
];

// console.log(user.minime);

const HomeRight = ({ me }) => {
  return (
    <div>
      <div className='grid grid-cols-2 gap-4 items-center'>
        <div>
          <div className='text-[#38b6d8] text-[0.7rem] font-semibold'>
            Update news
          </div>
          <hr className='border-[#ccc]' />
          <div>
            {update.slice(0, 4).map((update, index) => {
              return (
                <ul key={index} className='text-[0.8rem] list-disc ml-4 '>
                  <li className='mt-1'>{update}</li>
                </ul>
              );
            })}
          </div>
        </div>
        <div className='grid grid-cols-2 gap-[0.1rem] mt-4 items-center'>
          {managePosts.map((post, index) => {
            return (
              <div
                key={index}
                className='text-[0.7rem] bg-[#e0e0e0] h-full flex justify-between items-center px-2 py-1 rounded-sm'
              >
                <div>{post.name}</div>
                <div className='text-[#2c509a]'>
                  {post.new}/{post.total}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='text-[#38b6d8] text-[0.7rem] font-semibold mt-4'>
        Miniroom
      </div>
      <hr className='border-[#ccc]' />
      <div className='relative'>
        <img src={Miniroom} alt='' className='w-full object-cover my-2 ' />
        <img
          src={me.minime}
          alt=''
          className='object-cover my-2 absolute top-1/2 left-1/2 w-[70px]'
        />
      </div>
      <div className='text-[#38b6d8] text-[0.7rem] font-semibold '>
        Comments
      </div>
      <hr className='border-[#ccc]  mb-1' />

      <div className='w-full bg-[#ddd] p-2 flex items-center rounded-md'>
        <div className='basis-1/6 text-[#38b6d8] text-[0.6rem] font-semibold text-center'>
          Mates say
        </div>
        <input
          type='text'
          placeholder='Enter comments to your mate!'
          className='w-full text-sm px-2 py-1 mx-2 bg-white text-[0.8rem] '
        />
        <button className='basis-1/6 text-[0.8rem] border border-white text-[#bbb] hover:text-[#666] rounded-md py-1'>
          Enter
        </button>
      </div>

      {comments.map((comment, index) => {
        return (
          <div key={index} className='text-[0.8rem] mx-2 '>
            <div className='flex items-center my-1'>
              <div>
                {comment.content} ({comment.nickname}
                <Link className='text-[#2c509a] ml-2'>{comment.name}</Link>)
              </div>
              <div className='text-[0.6rem] text-[#959595] ml-2'>
                2024.03.28
              </div>
            </div>
            <hr className='border-[#ddd]' />
          </div>
        );
      })}
    </div>
  );
};

export default HomeRight;
