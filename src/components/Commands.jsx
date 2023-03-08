import React,{useRef} from 'react'
import Draggable from 'react-draggable';

function Commands(props) {
    const nodeRef = useRef(null);
    function clearWalls(){
        props.setGrid({
            ...props.grid,
            nodes: props.grid.nodes.map((row,rowIndex)=>{
                    return row.map((col,colIndex)=>{
                    return {
                        ...col,
                        isWall: false
                    }
                })
            })
        })
    }

    function visualize(){
        console.log(props.grid)
    }

    return (
    <Draggable  nodeRef={nodeRef}>
        <div  ref={nodeRef} className='px-5 py-5 w-fit right-5 top-20 bg-slate-300 bg-opacity-90 absolute cursor-move  rounded-md'>
            <div className='flex justify-center items-center'>
                <button onClick={clearWalls}  className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                    Clear Walls
                </button>
                <button onClick={visualize}  className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" data-rounded="rounded-md" data-primary="green-600" data-primary-reset="{}">
                    Visualize
                </button>
            </div>
        </div>
    </Draggable>
    )
}

export default Commands