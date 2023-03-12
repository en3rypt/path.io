import React, { useRef, useState, Fragment } from 'react'
import Draggable from 'react-draggable';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Graph, BFS, DFS, DLS, IDDFS, BDS, GBFS } from '../lib';

const algorithms = [
    { name: 'Breadth First Search' },
    { name: 'Depth First Search' },
    { name: 'Depth Limited Search' },
    { name: 'Iterative deepening depth-first search' },
    { name: 'Bi-Directional Search' },
    { name: 'Greedy Best First Search' },
    { name: 'A* Search' },
]

function Commands(props) {
    const nodeRef = useRef(null);
    const [selected, setSelected] = useState(algorithms[0])
    const [isVisualize, setIsVisualize] = useState(false)
    const [limit, setLimit] = useState(100)
    const [showInstructions, setShowInstructions] = useState(false)

    function clearWalls() {
        props.setGrid({
            ...props.grid,
            nodes: props.grid.nodes.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    return {
                        ...col,
                        isWall: false
                    }
                })
            })
        })
    }
    function clearGrid() {
        setIsVisualize(false)
        props.setGrid({
            ...props.grid,
            nodes: props.grid.nodes.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    return {
                        ...col,
                        isVisited: false,
                        isPath: false,
                        distance: Infinity,
                        previousNode: null,
                    }
                })
            })
        })
    }

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
        setIsVisualize(true)
        let stepWiseVisited = [];
        let visited = [];
        let stepWisePath = [];
        if (selected.name === 'Breadth First Search') {

            // BFS
            stepWiseVisited = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            visited = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            stepWisePath = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        } else if (selected.name === 'Depth First Search') {
            // DFS
            stepWiseVisited = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            visited = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            stepWisePath = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        } else if (selected.name === 'Depth Limited Search') {
            // DLS
            stepWiseVisited = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).stepWiseVisited;
            visited = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).visited;
            stepWisePath = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).stepWisePath;
        } else if (selected.name === 'Iterative deepening depth-first search') {
            // IDDFS
            stepWiseVisited = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).stepWiseVisited;
            visited = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).visited;
            stepWisePath = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit).stepWisePath;
        } else if (selected.name === 'Bi-Directional Search') {
            // BDS (Requires special implementation - so better to remove)
            stepWiseVisited = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            visited = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            stepWisePath = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        } else if (selected.name === 'Greedy Best First Search') {
            // GBFS
            stepWiseVisited = GBFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            visited = GBFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            stepWisePath = GBFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        } else if (selected.name === 'A* Search') {
            // ASTAR
            stepWiseVisited = ASTAR(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            visited = ASTAR(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            stepWisePath = ASTAR(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        }
        stepWiseVisited.forEach(visitedStep => {

            const newGrid = props.grid.nodes.map((row, i) => {
                props.setGrid({ ...props.grid, visitedNodes: props.grid.visitedNodes + 1 })
                // console.log(props.grid.visitedNodes)
                setTimeout(() =>
                    props.setGrid({ ...props.grid, nodes: newGrid })
                    , 1);
                return row.map((node, j) => {
                    const nodeKey = `${node.x}-${node.y}`;
                    const isVisited = visitedStep.includes(nodeKey);
                    return { ...node, isVisited };
                });
            });
        });

        stepWisePath && stepWisePath.forEach(pathStep => {
            const newGrid = props.grid.nodes.map((row, i) => {
                return row.map((node, j) => {
                    const nodeKey = `${node.x}-${node.y}`;
                    const isVisited = visited.has(nodeKey);
                    const isPath = pathStep.includes(nodeKey);
                    if (isPath) {
                        return { ...node, isPath, isVisited: false };
                    } else if (isVisited) {
                        return { ...node, isVisited, isPath: false };
                    }
                    return { ...node, isVisited, isPath };
                });
            });
            setTimeout(() =>
                props.setGrid({ ...props.grid, nodes: newGrid })
                , 1);
            // props.setGrid({ ...props.grid, nodes: newGrid });
        });
    }

    return (
        <div ref={nodeRef} className='min-[480px]:px-5  w-full'>
            <div className="flex flex-col md:flex-row  justify-center items-center">
                <div className='my-3 flex max-[480px]:flex-col justify-center items-center'>
                    <div>
                        {/* <button
                        className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
                        type="button"
                        
                    >
                        Instructions
                    </button> */}
                        <button onClick={() => setShowInstructions(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Instructions
                            </span>
                        </button>
                        {/* <button disabled={isVisualize} onClick={visualize} className={` mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap ${isVisualize?'opacity-50 bg-slate-600 border border-slate-700 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ':'bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`} data-rounded="rounded-md" data-primary="green-600" data-primary-reset="{}">
                        Visualize
                    </button> */}
                        <button disabled={isVisualize} onClick={visualize} className={`relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group border-[0px] ${isVisualize ? 'rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ' : ' bg-slate-600 border border-slate-700 bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200'} `}>
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Visualize
                            </span>
                        </button>
                    </div>
                    <div className='max-[480px]:mt-3'>
                        <button onClick={clearGrid} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Reset Grid
                            </span>
                        </button>
                        <button onClick={clearWalls} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Clear Walls
                            </span>
                        </button>
                    </div>

                </div>
                <div className="mb-3 md:mb-0 w-30 lg:w-80 mx-3">
                    <Listbox value={selected} onChange={setSelected}>
                        <div className="relative">
                            <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                <span className="block truncate">{selected.name}</span>
                                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                    <ChevronUpDownIcon
                                        className="h-5 w-5 text-gray-400"
                                        aria-hidden="true"
                                    />
                                </span>
                            </Listbox.Button>
                            <Transition
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                    {algorithms.map((algorithm, algorithmIdx) => (
                                        <Listbox.Option
                                            key={algorithmIdx}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                }`
                                            }
                                            value={algorithm}
                                        >
                                            {({ selected }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {algorithm.name}
                                                    </span>
                                                    {selected ? (
                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Listbox.Option>
                                    ))}
                                </Listbox.Options>
                            </Transition>
                        </div>
                    </Listbox>
                </div>
                {selected.name == "Depth Limited Search" ?
                    <div className="flex flex-col justify-center items-center">
                        <label htmlFor="depthLimit"> Depth Limit</label>
                        <input className="w-16 lg:w-28 mx-3 rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-400 sm:text-sm" type="number" name="depth" value={limit} id="depthLimit" onChange={(e) => { setLimit(e.target.value) }} />
                    </div>
                    : null}
            </div>
            {showInstructions ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        High-End Explanations
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowInstructions(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <ul class="list-disc">
                                        <li> A square tile known as a "node" can be green (for the start node), red (for the stop node), white (for the empty tile), or black (wall tile)</li>
                                        <li>Click and drag a start node or end node to any empty tile on the grid to move it. As long as they are not on a wall tile, stop tile, or start tile, you are free to put them wherever you like.</li>
                                        <li>Click and drag on any white tile in the grid to make a wall tile. A black tile that block your path is a wall tile. Drag your mouse over several white tiles to create multiple wall tiles.</li>
                                        <li>Click and drag on any black tile to remove any walls from the grid. The tile will turn white. By dragging over many tiles at once, you can remove multiple walls.</li>
                                    </ul>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowInstructions(false)}
                                    >
                                        Close
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>

    )
}

export default Commands