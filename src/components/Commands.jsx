import React, { useRef, useState, Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Graph, BFS, DFS, DLS, IDDFS, GBFS, ASTAR } from '../lib';

const algorithms = [
    { name: 'Breadth First Search',id:1 },
    { name: 'Depth First Search',id:2 },
    { name: 'Depth Limited Search',id:3 },
    { name: 'Iterative deepening depth-first search',id:4 },
    // { name: 'Bi-Directional Search',id:5 },
    { name: 'Greedy Best First Search',id:6 },
    { name: 'A* Search',id:7 },
]

function Commands(props) {
    const nodeRef = useRef(null);
    const [selected, setSelected] = useState(algorithms[0])
    const [isVisualize, setIsVisualize] = useState(false)
    const [limit, setLimit] = useState(100)
    const [showInstructions, setShowInstructions] = useState(true)

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
        let answer = [];
        if (selected.name === 'Breadth First Search') {
            // BFS
            answer = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode);
        } else if (selected.name === 'Depth First Search') {
            // DFS
            answer = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode);
        } else if (selected.name === 'Depth Limited Search') {
            // DLS
            answer = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit);
        } else if (selected.name === 'Iterative deepening depth-first search') {
            // IDDFS
            answer = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, limit);
            // } else if (selected.name === 'Bi-Directional Search') {
            //     // BDS (Requires special implementation - so better to remove)
            //     answer = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode);
            //     visited = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            //     stepWisePath = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
            //     console.log(stepWisePath, 'BDS')
        } else if (selected.name === 'Greedy Best First Search') {
            // GBFS
            answer = GBFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode);
            } else if (selected.name === 'A* Search') {
            // ASTAR
            answer = ASTAR(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode);
            }
        answer.stepWiseVisited.forEach(visitedStep => {

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

        answer.stepWisePath && answer.stepWisePath.forEach(pathStep => {
            const newGrid = props.grid.nodes.map((row, i) => {
                return row.map((node, j) => {
                    const nodeKey = `${node.x}-${node.y}`;
                    const isVisited = answer.visited.has(nodeKey);
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
        });
    }

    return (
        <div ref={nodeRef} className='min-[480px]:px-5  w-full mt-10'>
            <div className="flex flex-col md:flex-row  justify-between items-center">
                <div className='flex max-[480px]:flex-col justify-between items-center gap-4'>
                    <div>
                        <a href='https://github.com/en3rypt/path.io' target='_blank' className='font-bold font-mono text-4xl flex gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                            path.io
                        </a>
                    </div>
                    <div className='mt-3 flex flex-row gap-1 font-mono'>
                        <div>
                            - A
                        </div>
                        <div>
                            <a href='https://github.com/jassuwu' target='_blank' className='underline font-semibold'>
                                jass
                            </a>
                        </div>
                        <div>
                            &&
                        </div>
                        <div>
                            <a href='https://github.com/en3rypt' target='_blank' className='underline font-semibold'>
                                en3rypt
                            </a>
                        </div>
                        <div>
                            product.
                        </div>
                    </div>

                </div>
                <div className='flex flex-col sm:flex-row justify-center items-center z-50'>
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
                                    <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {algorithms.map((algorithm, algorithmIdx) => (
                                            <Listbox.Option
                                                key={algorithm.id}
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
                        <div className="mb-3 flex flex-col justify-center items-center">
                            <label htmlFor="depthLimit"> Depth limit</label>
                            <input className="w-16 lg:w-28 mx-3 rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-400 sm:text-sm" type="number" name="depth" value={limit} id="depthLimit" onChange={(e) => { setLimit(e.target.value) }} />
                        </div>
                        : null}
                    <button disabled={isVisualize} onClick={visualize} className={`z-40 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group border-[0px] ${isVisualize ? 'rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ' : ' bg-slate-600 border border-slate-700 bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200'} `}>
                        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                            Visualize
                        </span>
                    </button>
                    
                </div>
                <div className='flex max-[480px]:flex-col justify-center items-center'>
                    <div>
                        {/* <button
                        className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
                        type="button"
                        
                    >
                        Instructions
                    </button> */}
                        <button onClick={() => setShowInstructions(true)} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                ?
                            </span>
                        </button>
                        {/* <button disabled={isVisualize} onClick={visualize} className={` mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap ${isVisualize?'opacity-50 bg-slate-600 border border-slate-700 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ':'bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`} data-rounded="rounded-md" data-primary="green-600" data-primary-reset="{}">
                        Visualize
                    </button> */}
                    </div>
                    <div className='max-[480px]:mt-3'>
                        <button onClick={clearGrid} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Reset paths
                            </span>
                        </button>
                        <button onClick={clearWalls} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                                Clear walls
                            </span>
                        </button>
                    </div>

                </div>

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
                                    <h3 className="pl-2 text-2xl font-bold">
                                        High level guide for using the Pathfinding Visualizer
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
                                <div className="relative px-12 py-6 flex-auto flex flex-col items-center">
                                    <ul className="list-disc flex flex-col gap-5">
                                        <li>
                                            Each square on the grid is called a <span className="font-bold">"node"</span>. It can be{" "}
                                            <span className="text-green-500 font-semibold">green</span> (the start node),{" "}
                                            <span className="text-red-500 font-semibold">red</span> (the goal node),{" "}
                                            <span className="text-white ">white</span> (an empty node), or{" "}
                                            <span className="text-stone-500 font-semibold">stone</span> (a wall node).
                                        </li>
                                        <li>
                                            You can move the <span className="text-green-500 font-semibold">start node</span> or the{" "}
                                            <span className="text-red-500 font-semibold">goal node</span> by clicking and dragging them to
                                            any <span className="text-white">white node</span>. Just avoid the{" "}
                                            <span className="text-stone-500 font-semibold">stone nodes</span>!
                                        </li>
                                        <li>
                                            You can make <span className="text-stone-500 font-semibold">stone nodes</span> by clicking and
                                            dragging on any <span className="text-white">white node</span>. Stone nodes are black and they
                                            block your way.
                                        </li>
                                        <li>
                                            You can erase <span className="text-stone-500 font-semibold">stone nodes</span> by clicking and
                                            dragging on any black node. They will turn white again.
                                        </li>
                                    </ul>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                    <div>
                                        Report issues @ <a href="https://github.com/en3rypt/path.io/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc" target="_blank" rel="noreferrer" className='font-semibold underline'>Github</a>
                                    </div>
                                    <button
                                        className="hover:text-red-500 text-white bg-red-500 hover:bg-white border hover:border-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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