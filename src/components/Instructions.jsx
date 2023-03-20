import React from 'react'

function Instructions({setShowInstructions}) {
  return (
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
  )
}

export default Instructions