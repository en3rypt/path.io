import React, { useRef,useState,Fragment } from 'react'
import Draggable from 'react-draggable';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Graph, BFS, DFS, DLS, IDDFS, BDS } from '../lib';

const algorithms = [
  { name: 'Breadth First Search' },
  { name: 'Depth First Search' },
  { name: 'Depth Limited Search' },
  { name: 'Iterative deepening depth-first search' },
  { name: 'Bi-Directional Search' },
]

function Commands(props) {
    const nodeRef = useRef(null);
    const [selected, setSelected] = useState(algorithms[0])
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
    function clearGrid(){
        props.setGrid({
            ...props.grid,
            nodes: props.grid.nodes.map((row, rowIndex) => {
                return row.map((col, colIndex) => {
                    return {
                        ...col,
                        isWall: false,
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
        let stepWiseVisited = [];
        let visited = [];
        let stepWisePath = [];
        const DEPTH_LIMIT = 100;
        if (selected.name === 'Breadth First Search') {

          // BFS
           stepWiseVisited = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
           visited = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
           stepWisePath = BFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        }else if(selected.name === 'Depth First Search'){
          // DFS
          stepWiseVisited = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
          visited = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
          stepWisePath = DFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        }else if(selected.name === 'Depth Limited Search'){
          // DLS
            stepWiseVisited = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).stepWiseVisited;
            visited = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).visited;
            stepWisePath = DLS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).stepWisePath;
        }else if(selected.name === 'Iterative deepening depth-first search'){
          // IDDFS
          stepWiseVisited = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).stepWiseVisited;
          visited = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).visited;
          stepWisePath = IDDFS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode, DEPTH_LIMIT).stepWisePath;
        }else if(selected.name === 'Bi-Directional Search'){
            // BDS (Requires special implementation - so better to remove)
          stepWiseVisited = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
          visited = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
          stepWisePath = BDS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        }else if(selected.name === 'Uniform Cost Search'){    
            // UCS (Yet to be implemented)
            // const stepWiseVisited = UCS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWiseVisited;
            // const visited = UCS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).visited;
            // const stepWisePath = UCS(generateGraphFromGridNodes(props.grid.nodes).adjacencyList, props.grid.startNode, props.grid.endNode).stepWisePath;
        }
          stepWiseVisited.forEach(visitedStep => {
              const newGrid = props.grid.nodes.map((row, i) => {
                  setTimeout(() => {
                      props.setGrid({ ...props.grid, nodes: newGrid })
                  }, 1);
                  return row.map((node, j) => {
                      const nodeKey = `${node.x}-${node.y}`;
                      const isVisited = visitedStep.includes(nodeKey);
                      return { ...node, isVisited };
                  });
              });
          });
    
          let newGrid = props.grid.nodes;
          stepWisePath.forEach(pathStep => {
              newGrid = props.grid.nodes.map((row, i) => {
                  return row.map((node, j) => {
                      const nodeKey = `${node.x}-${node.y}`;
                      const isVisited = visited.has(nodeKey);
                      const isPath = pathStep.includes(nodeKey);
                      setTimeout(() => {
                          props.setGrid({ ...props.grid, nodes: newGrid })
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

    return (
            <div ref={nodeRef} className='px-5 py-5 w-fit   rounded-md'>
                <div className="flex  justify-center items-center">
                    <div className='my-3 flex justify-center items-center'>
                    <button onClick={visualize}  className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" data-rounded="rounded-md" data-primary="green-600" data-primary-reset="{}">
                            Visualize
                        </button>
                        <button onClick={clearGrid} className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                            Reset Grid
                        </button>
                        <button onClick={clearWalls} className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" data-rounded="rounded-md" data-primary="red-600" data-primary-reset="{}">
                            Clear Walls
                        </button>
                        
                    </div>
                    <div className=" w-30 sm:w-80 ">
                        <Listbox value={selected} onChange={setSelected}>
                            <div className="relative mt-1">
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
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                        active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={algorithm}
                                    >
                                    {({ selected }) => (
                                        <>
                                        <span
                                            className={`block truncate ${
                                            selected ? 'font-medium' : 'font-normal'
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
                </div>
            </div>
    )
}

export default Commands