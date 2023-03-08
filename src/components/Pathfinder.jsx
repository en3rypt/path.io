import React,{useState,useEffect} from 'react'

//components
import Grid from './Grid'
function Pathfinder() {
    //grid
    const [grid, setGrid] = useState({
        nodes: [],
        startNode: 0,
        nodeWidth:25,
        nodeHeight:25,
        rows:0,
        cols:0
    })

    function populateGrid(row,col){
        var count =0
        const nodes = []
        for(let i=0;i<row;i++){

            const currentRow = []
            for(let j=0;j<col;j++){
                count++
               currentRow.push({
                    x:i,
                    y:j,
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
            const initialGrid = populateGrid(row,col)
            setGrid({
                ...grid,
                rows: row,
                cols: col,
                nodes: initialGrid
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
            rows={grid.rows} 
            cols={grid.cols} 
            nodeHeight= {grid.nodeHeight} 
            nodeWidth={grid.nodeWidth}
        />
    </div>
  )
}

export default Pathfinder