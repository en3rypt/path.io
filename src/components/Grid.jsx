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
    } else {
      setWallSelected(false)
    }

    node.isWall = !node.isWall
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
                  isEndNode: true
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

    if (!mouseDown) return;
    props.setGrid({
      ...props.grid,
      nodes: props.grid.nodes.map((row, rowIndex) => {
        return row.map((col, colIndex) => {

          if (rowIndex === node.x && colIndex === node.y && node.isWall === false && !node.isStartNode && !node.isEndNode) {
            return {
              ...col,
              isWall: !col.isWall
            }
          }
          return col
        })
      })
    })

  }
  function getClassName(node) {
    var classname = "w-[40px] h-[40px] outline outline-1 outline-slate-900 "
    if (node.isStartNode) {
      classname += "bg-green-500 animate-wallAnimation"
    }
    if (node.isEndNode) {
      classname += "bg-red-500 animate-wallAnimation"
    }
    if (node.isWall) {
      classname += "bg-stone-500 animate-wallAnimation"
    }
    if (node.isVisited) {
      classname += "bg-blue-500 animate-wallAnimation"
    }
    if (node.isPath) {
      classname += "bg-cyan-400 animate-wallAnimation"
    }
    return classname
  }

  return (
    <div className='py-5'>
      {
        props.grid.nodes.map((row, rowIndex) => {
          return (
            <div className='flex flex-row' key={`row-${rowIndex}`}>
              {
                row.map((node, colIndex) => {
                  return (
                    <div
                      key={`node-${rowIndex}-${colIndex}`}
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