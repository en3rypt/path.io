import React, { useState, useEffect } from 'react'

//components
import Grid from './Grid'
import Stats from './Stats'

// graph

import Commands from './Commands'
import Footer from './Footer'

function Pathfinder() {
    //grid
    const [grid, setGrid] = useState({
        nodes: [],
        startNode: { x: 0, y: 0 },
        endNode: { x: 0, y: 0 },
        nodeWidth: 25,
        nodeHeight: 25,
        rows: 0,
        cols: 0,
        wallNodes: 0,
        visitedNodes: 0,
        exploredNodes: 0,
        pathNodes:0,
        timeTaken:null
    })


    function randomXY(row, col, x1 = -1, y1 = -1) {
        const x = Math.floor(Math.random() * row)
        const y = Math.floor(Math.random() * col)
        return (x == x1 || y == y1) ? randomXY(row, col, x1, y1) : [x, y]
    }
    function populateGrid(row, col, startX, startY, endX, endY) {
        let count = 0
        const nodes = []
        for (let i = 0; i < row; i++) {
            const currentRow = []
            for (let j = 0; j < col; j++) {
                count++
                currentRow.push({
                    x: i,
                    y: j,
                    isStartNode: i === startX && j === startY,
                    isEndNode: i === endX && j === endY,
                    isWall: false,
                    isVisited: false,
                    isPath: false,
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
            const row = Math.max(Math.floor(height / 40) - 5, 3)
            const col = Math.max(Math.floor(width / 40) - 1, 3)
            const [startX, startY] = randomXY(row, col)
            const [endX, endY] = randomXY(row, col, startX, startY)
            const initialGrid = populateGrid(row, col, startX, startY, endX, endY)
            setGrid({
                ...grid,
                nodes: initialGrid,
                startNode: { x: startX, y: startY },
                endNode: { x: endX, y: endY },
                nodeWidth: 40,
                nodeHeight: 40,
                rows: row,
                cols: col
            })

        }

        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    return (
        <div className=''>
            <Stats grid={grid} />
            <Commands
                grid={grid}
                setGrid={setGrid}
            />
            <Grid
                grid={grid}
                setGrid={setGrid}
            />
            <Footer/>
        </div>
    )
}

export default Pathfinder