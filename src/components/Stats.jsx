import React,{useState,useRef} from 'react'
import Draggable from 'react-draggable'

function Stats(props) {
    const nodeRef = useRef(null);
  return (
    <Draggable  nodeRef={nodeRef}>
            <div  ref={nodeRef} className='px-5 py-5 w-fit right-5 top-20 bg-slate-300 bg-opacity-90 absolute cursor-move  rounded-md'>
                <table className="table-auto">
                    <thead>
                        <tr>
                        <th colSpan={2}>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Nodes</td>
                            <td className='px-3'>0</td>
                        </tr>
                        <tr>
                            <td>Wall Nodes</td>
                            <td className='px-3'>0</td>
                        </tr>
                        <tr>
                            <td>Visited Nodes</td>
                            <td className='px-3'>0</td>
                        </tr>
                        <tr>
                            <td>Explored Nodes </td>
                            <td className='px-3'>0</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Draggable>
  )
}

export default Stats