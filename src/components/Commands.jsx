import React, { useRef, useState, Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Graph, BFS, DFS, BDS, DLS, IDDFS, GBFS, ASTAR } from "../lib";
import executionTime from "../lib/Timer";
import Instructions from "./Instructions";
import Graphs from "./Graphs";
const algorithms = [
  { name: "Breadth First Search", id: 1 },
  { name: "Depth First Search", id: 2 },
  { name: "Depth Limited Search", id: 3 },
  { name: "Iterative deepening depth-first search", id: 4 },
  { name: "Bi-Directional Search", id: 5 },
  { name: "Greedy Best First Search", id: 6 },
  { name: "A* Search", id: 7 },
];

function Commands(props) {
  const nodeRef = useRef(null);
  const [selected, setSelected] = useState(algorithms[0]);
  const [isVisualize, setIsVisualize] = useState(false);
  const [limit, setLimit] = useState(100);
  const [showInstructions, setShowInstructions] = useState(true);
  const [timeTaken, setTimeTaken] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [showTime, setshowTime] = useState(false);
  const [pause, setPause] = useState(false);
  const [showGraphs, setShowGraphs] = useState(false);
  const [graphResult, setGraphResult] = useState(null);
  useEffect(() => {
    // console.log('rendered')
    if (answer) {
      let index = 0;
      const interval = setInterval(() => {
        if (index >= answer.stepWiseVisited.length) {
          clearInterval(interval);
          if (!answer.pathExists) return;
          let index1 = 0;
          const interval1 = setInterval(() => {
            if (index1 >= answer.stepWisePath.length) {
              clearInterval(interval1);
              setshowTime(true);

              return;
            }
            const pathStep = answer.stepWisePath[index1];
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

            props.setGrid({
              ...props.grid,
              nodes: newGrid,
              pathNodes: props.grid.pathNodes++,
            });
            index1++;
          }, 30);
          return;
        }
        const visitedStep = answer.stepWiseVisited[index];
        const newGrid = props.grid.nodes.map((row, i) => {
          return row.map((node, j) => {
            const nodeKey = `${node.x}-${node.y}`;
            const isVisited = visitedStep.includes(nodeKey);
            return { ...node, isVisited };
          });
        });
        props.setGrid({
          ...props.grid,
          nodes: newGrid,
          visitedNodes: props.grid.visitedNodes++,
        });
        index++;
      }, 5);

      return;
    }
  }, [answer]);

  function clearWalls() {
    props.setGrid({
      ...props.grid,
      nodes: props.grid.nodes.map((row, rowIndex) => {
        return row.map((col, colIndex) => {
          return {
            ...col,
            isWall: false,
          };
        });
      }),
    });
  }
  function clearGrid() {
    setIsVisualize(false);
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
          };
        });
      }),
      timeTaken: null,
      visitedNodes: 0,
      pathNodes: 0,
    });
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
        if (i > 0 && !gridNodes[i - 1][j].isWall)
          neighbors.push(`${x - 1}-${y}`);
        if (i < gridNodes.length - 1 && !gridNodes[i + 1][j].isWall)
          neighbors.push(`${x + 1}-${y}`);
        if (j > 0 && !gridNodes[i][j - 1].isWall)
          neighbors.push(`${x}-${y - 1}`);
        if (j < gridNodes[i].length - 1 && !gridNodes[i][j + 1].isWall)
          neighbors.push(`${x}-${y + 1}`);
        graph.adjacencyList[key] = neighbors;
      }
    }
    return graph;
  };

  async function visualize() {
    setIsVisualize(true);
    let response;
    let answer = [];
    let time;
    let decorator;
    if (selected.name === "Breadth First Search") {
      // BFS
      decorator = executionTime(BFS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode
      );
      // console.log(response.result)
      answer = response.result;
      time = response.time;
    } else if (selected.name === "Depth First Search") {
      // DFS
      decorator = executionTime(DFS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode
      );
      answer = response.result;
      time = response.time;
    } else if (selected.name === "Depth Limited Search") {
      // DLS
      decorator = executionTime(DLS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode,
        limit
      );
      answer = response.result;
      time = response.time;
    } else if (selected.name === "Iterative deepening depth-first search") {
      // IDDFS
      decorator = executionTime(IDDFS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode,
        1000000000
      );
      answer = response.result;
      time = response.time;
    } else if (selected.name === "Bi-Directional Search") {
      // BDS (Requires special implementation - so better to remove)
      decorator = executionTime(BDS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode
      );
      answer = response.result;
      time = response.time;
      console.log(answer, "BDS");
    } else if (selected.name === "Greedy Best First Search") {
      // GBFS
      decorator = executionTime(GBFS);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode
      );
      answer = response.result;
      time = response.time;
    } else if (selected.name === "A* Search") {
      // ASTAR
      decorator = executionTime(ASTAR);
      console.log("🚀 ~ visualize ~ props.grid.nodes:", props.grid.nodes);
      response = await decorator(
        generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
        props.grid.startNode,
        props.grid.endNode
      );
      answer = response.result;
      time = response.time;
    }
    setTimeTaken(time);
    setAnswer(answer);
  }
  function handlePause() {
    setPause(!pause);
    console.log(pause);
  }

  // nvigation
  const navigate = useNavigate();
  function compareAlgo() {
    navigate("/compare", {
      state: {
        grid: props.grid,
      },
    });
  }
  async function handleCompare() {
    let result = [];
    let decorator;
    let response;
    decorator = executionTime(BFS);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode
    );
    result.push(response);

    decorator = executionTime(DFS);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode
    );
    result.push(response);

    decorator = executionTime(DLS);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode,
      limit
    );
    result.push(response);

    decorator = executionTime(IDDFS);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode,
      1000000000
    );
    result.push(response);

    decorator = executionTime(GBFS);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode
    );
    result.push(response);

    decorator = executionTime(ASTAR);
    response = await decorator(
      generateGraphFromGridNodes(props.grid.nodes).adjacencyList,
      props.grid.startNode,
      props.grid.endNode
    );
    result.push(response);

    // console.log(result)
    setShowGraphs(true);
    setGraphResult(result);
  }

  return (
    <>
      <div ref={nodeRef} className="min-[480px]:px-5  w-full mt-10">
        <div className="flex flex-col md:flex-row  justify-between items-center">
          <div className="flex max-[480px]:flex-col justify-between items-center gap-4">
            <div>
              <a
                href="https://github.com/en3rypt/path.io"
                target="_blank"
                className="font-bold font-mono text-4xl flex gap-1"
              >
                {/* <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m13.15 34.85 14.5-7.15 7.15-14.5-14.5 7.15ZM24 26q-.85 0-1.425-.575Q22 24.85 22 24q0-.85.575-1.425Q23.15 22 24 22q.85 0 1.425.575Q26 23.15 26 24q0 .85-.575 1.425Q24.85 26 24 26Zm0 18q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg> */}
                path.io
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center z-50">
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
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? "bg-amber-100 text-amber-900"
                                : "text-gray-900"
                            }`
                          }
                          value={algorithm}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected ? "font-medium" : "font-normal"
                                }`}
                              >
                                {algorithm.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
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
            {selected.name == "Depth Limited Search" ? (
              <div className="mb-3 flex flex-col justify-center items-center">
                <label htmlFor="depthLimit"> Depth limit</label>
                <input
                  className="w-16 lg:w-28 mx-3 rounded-lg bg-white py-2 pl-3 pr-3 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-400 sm:text-sm"
                  type="number"
                  name="depth"
                  value={limit}
                  id="depthLimit"
                  onChange={(e) => {
                    setLimit(e.target.value);
                  }}
                />
              </div>
            ) : null}
            <button
              disabled={isVisualize}
              onClick={visualize}
              className={`z-40 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group border-[0px] ${
                isVisualize
                  ? "rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  : " bg-slate-600 border border-slate-700 bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200"
              } `}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                Visualize
              </span>
            </button>
            <button
              disabled={isVisualize}
              onClick={handleCompare}
              className={`z-40 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group border-[0px] ${
                isVisualize
                  ? "rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  : " bg-slate-600 border border-slate-700 bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300  focus:ring-4 focus:outline-none focus:ring-lime-200"
              } `}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                Compare
              </span>
            </button>
          </div>
          <div className="flex max-[480px]:flex-col justify-center items-center">
            <div>
              {/* <button
                            className="mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-indigo-700 transition-colors duration-150 border border-indigo-500 rounded-lg focus:shadow-outline hover:bg-indigo-500 hover:text-indigo-100"
                            type="button"
                            
                        >
                            Instructions
                        </button> */}
              <button
                onClick={() => setShowInstructions(true)}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-cyan-200"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                  ?
                </span>
              </button>
              {/* <button disabled={isVisualize} onClick={visualize} className={` mx-2 px-4 py-2 text-xs md:text-base font-medium md:leading-6 text-white whitespace-no-wrap ${isVisualize?'opacity-50 bg-slate-600 border border-slate-700 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 ':'bg-green-600 border border-green-700 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'}`} data-rounded="rounded-md" data-primary="green-600" data-primary-reset="{}">
                            Visualize
                        </button> */}
            </div>
            <div className="max-[480px]:mt-3">
              <button
                onClick={clearGrid}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                  Reset paths
                </span>
              </button>
              <button
                onClick={clearWalls}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white  rounded-md group-hover:bg-opacity-0">
                  Clear walls
                </span>
              </button>
            </div>
          </div>
        </div>
        {showInstructions ? (
          <Instructions setShowInstructions={setShowInstructions} />
        ) : null}
        {showGraphs ? (
          <Graphs setShowGraphs={setShowGraphs} result={graphResult} />
        ) : null}
      </div>
      {showTime ? (
        <div className="text-center">
          <p>{`Total Execution time: ${timeTaken} ms`}</p>
        </div>
      ) : null}
    </>
  );
}

export default Commands;
