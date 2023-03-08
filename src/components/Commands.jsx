import React,{useRef} from 'react'
import Draggable from 'react-draggable';
function Commands() {
    const nodeRef = useRef(null);
  return (
    <Draggable  nodeRef={nodeRef}>
        <div  ref={nodeRef} className='w-40 h-40 right-5 top-20 bg-slate-300 bg-opacity-90 absolute cursor-move  rounded-md'>
            <div>
                hello world
            </div>
        </div>
    </Draggable>
  )
}

export default Commands