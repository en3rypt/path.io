import React, { useState } from 'react'

//components


function Grid(props) {
  const [mouseDown, setMouseDown] = useState(false)
  function handleMouseDown(node) {
    if (node.isStartNode || node.isEndNode) return;
    node.isWall = !node.isWall
    setMouseDown(true)
  }
  function handleMouseUp() {
    setMouseDown(false)
  }
  function handleMouseOver(node) {
    if (!mouseDown) return;
    props.setGrid({
      ...props.grid,
      nodes: props.grid.map((row, rowIndex) => {
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
      classname += "bg-stone-500  animate-wallAnimation"
    }
    if (node.isPath) {
      classname += "bg-cyan-400 animate-wallAnimation"
    }

    if (node.isVisited) {
      classname += "bg-cyan-500 animate-wallAnimation"
    }

    return classname
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
                    <div
                      key={`node-${rowIndex}-${colIndex}`}
                      className={getClassName(node)}
                      onMouseDown={() => { handleMouseDown(node) }}
                      onMouseUp={handleMouseUp}
                      onMouseOver={() => { handleMouseOver(node) }}
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