import React, { useState } from 'react'

//components
function Grid(props) {
  const [mouseDown, setMouseDown] = useState(false)
  const [wallSelected, setWallSelected] = useState(false)
  const [endNodeMove, setendNodeMove] = useState(false)
  const [startNodeMove, setstartNodeMove] = useState(false)

  function handleMouseDown(node) {
    if (node.isEndNode) {
      setendNodeMove(true)
      return
    } else if (node.isStartNode) {
      setstartNodeMove(true)
      return
    }
    if (node.isWall) {
      setWallSelected(true)
      props.setGrid({
        ...props.grid,
        wallNodes:props.grid.wallNodes-1,
      })
      node.isWall = false
    }else{
      props.setGrid({
        ...props.grid,
        wallNodes:props.grid.wallNodes+1
      })
      node.isWall = true
    }
    
    setMouseDown(true)
  }
  function handleMouseUp(node) {
    setMouseDown(false)
    if (startNodeMove) {
      props.setGrid({
        ...props.grid,
        startNode: { x: node.x, y: node.y }
      })
      setstartNodeMove(false)
    }
    if (endNodeMove) {
      props.setGrid({
        ...props.grid,
        endNode: { x: node.x, y: node.y }
      })
      setendNodeMove(false)
    }
    if(wallSelected){
      setWallSelected(false)
    }
  }
  function handleMouseOver(node) {
    if (endNodeMove) {
      if (!node.isWall && !node.isStartNode) {
        props.setGrid({
          ...props.grid,
          nodes: props.grid.nodes.map((row, rowIndex) => {
            return row.map((col, colIndex) => {

              if (rowIndex == node.x && colIndex == node.y) {
                return {
                  ...col,
                  isEndNode: true,
                  
                }
              } else {
                return {
                  ...col,
                  isEndNode: false
                }
              }
            })
          })
        })

      }
      return
    }
    if (startNodeMove) {
      if (!node.isWall && !node.isEndNode) {
        props.setGrid({
          ...props.grid,
          nodes: props.grid.nodes.map((row, rowIndex) => {
            return row.map((col, colIndex) => {
              if (rowIndex == node.x && colIndex == node.y) {
                return {
                  ...col,
                  isStartNode: true
                }
              } else {
                return {
                  ...col,
                  isStartNode: false
                }
              }
            })
          })
        })

      }
      return
    }
    if (wallSelected && mouseDown){
      if (!node.isWall) return;
      props.setGrid({
        ...props.grid,
        wallNodes:props.grid.wallNodes-1,
        nodes: props.grid.nodes.map((row, rowIndex) => {
          return row.map((col, colIndex) => {

            if (rowIndex === node.x && colIndex === node.y && !node.isStartNode && !node.isEndNode) {
              return {
                ...col,
                isWall: false
              }
            }
            return col
          })
        })
      })
      return
    }

    if (!mouseDown) return;
    props.setGrid({
      ...props.grid,
      wallNodes:props.grid.wallNodes+1,
      nodes: props.grid.nodes.map((row, rowIndex) => {
        return row.map((col, colIndex) => {

          if (rowIndex === node.x && colIndex === node.y && node.isWall === false && !node.isStartNode && !node.isEndNode) {
            return {
              ...col,
              isWall: !col.isWall,
            }
          }
          return col
        })
      })
    })

  }
  function getClassName(node) {
    let classname = `w-[${props.grid.nodeWidth}px] h-[${props.grid.nodeHeight}px] outline outline-1 outline-slate-900 `
    if (node.isStartNode) {
      classname += " bg-green-500 animate-wallAnimation"
    }
    else if (node.isEndNode) {
      classname += " bg-red-500 animate-wallAnimation"
    }
    else if (node.isWall) {
      classname += " bg-stone-500 animate-wallAnimation"
    }
    else if (node.isPath) {
      classname += " bg-cyan-400 animate-pathAnimation"
    }
    else if (node.isVisited) {
      classname += " bg-blue-500 animate-wallAnimation"
    }
    
    return classname
  }

  return (
    <div className='py-2 flex flex-col justify-center items-center'>
      {
        props.grid.nodes.map((row, rowIndex) => {
          return (
            <div className='flex flex-row' key={`row-${rowIndex}`}>
              {
                row.map((node, colIndex) => {
                  return (
                    <div
                      key={`node-${node.x}-${node.y}`}
                      className={getClassName(node)}
                      onMouseDown={() => { handleMouseDown(node) }}
                      onMouseUp={() => { handleMouseUp(node) }}
                      onMouseOver={() => { handleMouseOver(node) }}
                    // onTouchStart={()=>{handleMouseDown(node)}}
                    // onTouchMove={()=>{handleMouseOver(node)}}
                    // onTouchEnd={handleMouseUp}
                    />
                  );
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