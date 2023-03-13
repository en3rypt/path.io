import React,{useRef} from 'react'
import Draggable from 'react-draggable'

function Stats(props) {
    const nodeRef = useRef(null);

  return (
    <Draggable  nodeRef={nodeRef}>
            <div  ref={nodeRef} className='z-50 px-5 py-5 w-fit bottom-0 right-0 md:bottom-5 md:right-5 bg-slate-300 bg-opacity-90 absolute cursor-move  rounded-md'>
                <table className="table-auto">
                    <thead>
                        <tr>
                        <th colSpan={2}>Stats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Total Nodes</td>
                            <td className='px-3'>{props.grid.rows*props.grid.cols}</td>
                        </tr>
                        <tr>
                            <td>Wall Nodes</td>
                            <td className='px-3'>{props.grid.wallNodes}</td>
                        </tr>
                        <tr>
                            <td>Visited Nodes</td>
                            <td className='px-3'>{props.grid.visitedNodes}</td>
                        </tr>
                        {/* <tr>
                            <td>Explored Nodes </td>
                            <td className='px-3'>0</td>
                        </tr> */}
                    </tbody>
                </table>
            </div>
        </Draggable>
  )
}

export default Stats