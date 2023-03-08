import React,{useState} from 'react'

//components


function Grid(props) {
  const [mouseDown, setMouseDown] = useState(false)
  function handleMouseDown(node){
    node.isWall = !node.isWall
    setMouseDown(true)
  }
  function handleMouseUp(){
    setMouseDown(false)
  }
  function handleMouseMove(node){
    if(mouseDown){
      console.log('mouse move',node)
      node.isWall = !node.isWall
    }
  }

  return (
    <div>
      {
        props.grid.map((row, rowIndex) => {
          return (
            <div className='flex flex-row' key={`row-${rowIndex}`}>
              {
                row.map((node, colIndex) => {
                  return (
                    // <Node
                    //   node = {node}
                    //   onMouseMove={handleMouseMove}
                    //   onMouseDown={handleMouseDown}
                    //   onMouseUp={handleMouseUp}
                    //   key={`node-${rowIndex}-${colIndex}`}
                    //   nodeHeight={props.nodeHeight} 
                    //   nodeWidth={props.nodeWidth} 
                    //   x={rowIndex}
                    //   y={colIndex}
                    // />
                    <div 
                      key={`node-${rowIndex}-${colIndex}`}
                      className={`w-[40px] h-[40px] outline outline-1 ${node.isWall ? 'bg-orange-300' : 'bg-white'}`} 
                      onMouseDown={()=>{handleMouseDown(node)}} 
                      onMouseUp={handleMouseUp} 
                      onMouseMove={()=>{handleMouseMove(node)}} 
                    />
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  ) 
}

export default Grid