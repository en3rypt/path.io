import React, { useState, useEffect } from 'react'

//components
import Grid from './Grid'


// graph
import { Graph, BFS, DFS, DLS } from '../lib';

import Commands from './Commands'
import Stats from './Stats'

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
    })

    const [gridIsSet, setGridIsSet] = useState(false)

    function randomXY(row, col, x1 = -1, y1 = -1) {
        const x = Math.floor(Math.random() * row)
        const y = Math.floor(Math.random() * col)
        return (x == x1 || y == y1) ? randomXY(row, col, x1, y1) : [x, y]
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
            // const [row, col] = [5, 5];
            const row = Math.max(Math.floor(height / 40) - 3, 3)
            const col = Math.max(Math.floor(width / 40) - 2, 3)
            const [startX, startY] = randomXY(row, col)
            const [endX, endY] = randomXY(row, col, startX, startY)
            const initialGrid = populateGrid(row, col, startX, startY, endX, endY)
            setGrid({
                nodes: initialGrid,
                startNode: { x: startX, y: startY },
                endNode: { x: endX, y: endY },
                nodeWidth: 40,
                nodeHeight: 40,
                rows: row,
                cols: col
            })
            // setGridIsSet(true);

        }

        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const generateGraphFromGridNodes = (gridNodes) => {
        const graph = new Graph();
        for (let i = 0; i < gridNodes.length; i++) {
            for (let j = 0; j < gridNodes[i].length; j++) {
                const node = gridNodes[i][j];
                if (node.isWall) continue;
                const { x, y } = node;
                const key = `${x}-${y}`;
                const neighbors = [];
                if (i > 0 && !gridNodes[i - 1][j].isWall) neighbors.push(`${x - 1}-${y}`);
                if (i < gridNodes.length - 1 && !gridNodes[i + 1][j].isWall) neighbors.push(`${x + 1}-${y}`);
                if (j > 0 && !gridNodes[i][j - 1].isWall) neighbors.push(`${x}-${y - 1}`);
                if (j < gridNodes[i].length - 1 && !gridNodes[i][j + 1].isWall) neighbors.push(`${x}-${y + 1}`);
                graph.adjacencyList[key] = neighbors;
            }
        }
        return graph;
    }

    function visualize() {
        // BFS
        const stepWiseVisited = BFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).stepWiseVisited;
        const visited = BFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).visited;
        const stepWisePath = BFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).stepWisePath;

        // DFS
        // const stepWiseVisited = DFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).stepWiseVisited;
        // const visited = DFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).visited;
        // const stepWisePath = DFS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode).stepWisePath;

        // DLS
        // const DEPTH_LIMIT = 100;
        // const stepWiseVisited = DLS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode, DEPTH_LIMIT).stepWiseVisited;
        // const visited = DLS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode, DEPTH_LIMIT).visited;
        // const stepWisePath = DLS(generateGraphFromGridNodes(grid.nodes).adjacencyList, grid.startNode, grid.endNode, DEPTH_LIMIT).stepWisePath;

        stepWiseVisited.forEach(visitedStep => {
            const newGrid = grid.nodes.map((row, i) => {
                setTimeout(() => {
                    setGrid({ ...grid, nodes: newGrid })
                }, 1);
                return row.map((node, j) => {
                    const nodeKey = `${node.x}-${node.y}`;
                    const isVisited = visitedStep.includes(nodeKey);
                    return { ...node, isVisited };
                });
            });
        });

        let newGrid = grid.nodes;
        stepWisePath.forEach(pathStep => {
            newGrid = grid.nodes.map((row, i) => {
                return row.map((node, j) => {
                    const nodeKey = `${node.x}-${node.y}`;
                    const isVisited = visited.has(nodeKey);
                    const isPath = pathStep.includes(nodeKey);
                    setTimeout(() => {
                        setGrid({ ...grid, nodes: newGrid })
                    }, 10);
                    if (isPath) {
                        return { ...node, isPath, isVisited: false };
                    } else if (isVisited) {
                        return { ...node, isVisited, isPath: false };
                    }
                    return { ...node, isVisited, isPath };
                });
            });
        });
    }

    console.log(grid)
    return (
        <div>
            <Stats grid={grid} />
            <Commands
                grid={grid}
                setGrid={setGrid}
                visualize={visualize}
            />
            <Grid
                grid={grid}
                setGrid={setGrid}
            />
        </div>
    )
}

export default Pathfinder