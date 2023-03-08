import React,{useState,useEffect} from 'react'

//components
import Grid from './Grid'
function Pathfinder() {
    //grid
    const [grid, setGrid] = useState({
        nodes: [],
        startNode: [0,0],
        endNode:[0,0],
        nodeWidth:25,
        nodeHeight:25,
        rows:0,
        cols:0
    })

    function randomXY(row,col){
        const x = Math.floor(Math.random()*row)
        const y = Math.floor(Math.random()*col)
        return [x,y]
    }
    function populateGrid(row,col,startX,startY,endX,endY){
        
        var count =0
        const nodes = []
        for(let i=0;i<row;i++){

            const currentRow = []
            for(let j=0;j<col;j++){
                count++
               currentRow.push({
                    x:i,
                    y:j,
                    isStartNode: i === startX && j === startY,
                    isEndNode: i === endX && j === endY,
                    isWall: false,
                    isVisited: false,
                    distance: Infinity,
                    previousNode: null,
                })
            }
            nodes.push(currentRow)
        }
        return nodes
    }


    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const row = Math.max(Math.floor(height/40)-3,3)
            const col = Math.max(Math.floor(width/40)-2,3)
            const [startX,startY] = randomXY(row,col)
            const [endX,endY] = randomXY(row,col)
            const initialGrid = populateGrid(row,col,startX,startY,endX,endY)
            // console.log(startX,startY,endX,endY)
            setGrid({
                ...grid,
                rows: row,
                cols: col,
                nodes: initialGrid,
                startNode: [startX,startY],
                endNode: [endX,endY],
            })
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
  return (
    <div>
        <Grid 
            grid={grid.nodes}
            setGrid={setGrid}
            rows={grid.rows} 
            cols={grid.cols} 
            nodeHeight= {grid.nodeHeight} 
            nodeWidth={grid.nodeWidth}
        />
    </div>
  )
}

export default Pathfinder