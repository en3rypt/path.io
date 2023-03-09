import React, { useState, useEffect } from 'react'

//components
import Grid from './Grid'


// graph
import { Graph, BFS } from '../lib';


function Pathfinder() {
    //grid
    const [grid, setGrid] = useState({
        nodes: [],
        startNode: `${0}-${0}`,
        endNode: `${0}-${0}`,
        nodeWidth: 25,
        nodeHeight: 25,
        rows: 0,
        cols: 0,
    })

    const [gridIsSet, setGridIsSet] = useState(false);

    function randomXY(row, col) {
        const x = Math.floor(Math.random() * row)
        const y = Math.floor(Math.random() * col)
        return [x, y]
    }
    function populateGrid(row, col, startX, startY, endX, endY) {

        var count = 0
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
            const row = Math.max(Math.floor(height / 40) - 3, 3)
            const col = Math.max(Math.floor(width / 40) - 2, 3)
            const [startX, startY] = randomXY(row, col)
            const [endX, endY] = randomXY(row, col)
            const initialGrid = populateGrid(row, col, startX, startY, endX, endY)
            // console.log(startX,startY,endX,endY)
            setGrid({
                ...grid,
                rows: row,
                cols: col,
                nodes: initialGrid,
                startNode: `${startX}-${startY}`,
                endNode: `${endX}-${endY}`,
            })
            setGridIsSet(true);
        }
        handleResize()
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateAdjacencyList = (grid) => {
        const adjacencyList = {};
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const node = grid[i][j];
                const { x, y } = node;
                const key = `${x}-${y}`;
                const neighbors = [];
                if (i > 0) neighbors.push(`${x - 1}-${y}`);
                if (i < grid.length - 1) neighbors.push(`${x + 1}-${y}`);
                if (j > 0) neighbors.push(`${x}-${y - 1}`);
                if (j < grid[i].length - 1) neighbors.push(`${x}-${y + 1}`);
                adjacencyList[key] = neighbors;
            }
        }
        return adjacencyList;
    }

    const generateGraph = (grid) => {
        const adjacencyList = generateAdjacencyList(grid)
        const graph = new Graph()
        graph.adjacencyList = adjacencyList;
        return graph;
    }

    const getNodesToColorFromBFS = (addedToQueueBy, endNode) => {
        const nodesToColor = [];
        let currentNode = endNode;
        while (currentNode) {
            nodesToColor.unshift(currentNode);
            currentNode = addedToQueueBy[currentNode];
        }
        return nodesToColor;
    }


    if (gridIsSet) {
        const pathNodes = getNodesToColorFromBFS(
            BFS(generateGraph(grid.nodes).adjacencyList, grid.startNode, grid.endNode).addedToQueueBy, grid.endNode
        )

        const visitedNodes = BFS(generateGraph(grid.nodes).adjacencyList, grid.startNode, grid.endNode).visited

        const newGrid = grid.nodes.map((row, i) => {
            return row.map((node, j) => {
                const nodeKey = `${node.x}-${node.y}`;
                const isVisited = visitedNodes.has(nodeKey);
                const isPath = pathNodes.includes(nodeKey);
                return { ...node, isVisited, isPath };
            });
        });
        setGrid({ ...grid, nodes: newGrid })
        setGridIsSet(false);
    }



    return (
        <div>
            <Grid
                grid={grid.nodes}
                setGrid={setGrid}
                rows={grid.rows}
                cols={grid.cols}
                nodeHeight={grid.nodeHeight}
                nodeWidth={grid.nodeWidth}
            />
        </div>
    )
}

export default Pathfinder