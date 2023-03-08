import React from 'react'


function Node(props) {

  return (
    <div 
      className={`w-[40px] h-[40px] outline outline-1 ${props.node.isWall ? 'bg-orange-300' : 'bg-white'}`} 
      onMouseDown={props.onMouseDown} 
      onMouseUp={props.onMouseUp} 
      onMouseMove={props.onMouseMove} 
    />
  )
}

export default Node