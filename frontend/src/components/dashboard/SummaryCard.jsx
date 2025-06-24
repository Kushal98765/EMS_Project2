import React from 'react'

const SummaryCard = ({icon, text, number, color}) => {
  return (
    <div className='rounded flex bg-white'> 
      <div className={`text-3xl flex justify-center items-center ${color} text-white`} style={{padding: '0px 16px'}}>
        {icon}
      </div>
        <div style={{paddingLeft:'16px', padding:'4px 0px', marginLeft: '10px'}}>
            <p className='text-lg font-semibold'>{text}</p>
            <p className='text-xl font-bold'>{number}</p>
        </div>
    </div>
  )
}

export default SummaryCard
