import React from 'react'
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
Chart.register(CategoryScale);


function Graphs({setShowGraphs,result}) {
    console.log(result)
    const timeTaken = []
    result.forEach(element => {
        timeTaken.push(element.time)
    });
    const algorithms = ["BFS","DFS","DLS","IDDFS","DBFS","A*"];
    const data = {
        labels: algorithms,
        datasets: [{
          data: timeTaken,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)'
          ],
          borderWidth: 1
        }]
      };
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
                                        Analysis
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
                                <div className="p-5 w-full">
                                    <h2 style={{ textAlign: "center" }}>Bar Chart</h2>
                                    <Bar
                                        data={data}
                                        height="500px"
                                        width="500px"
                                        
                                        options={{
                                            maintainAspectRatio: true,
                                            plugins: {
                                              title: {
                                                display: true,
                                                text: "Execution Time of Algorithms in ms"
                                              },
                                              legend: {
                                                display: false
                                              }
                                            }
                                          }}
                                    />
                                </div>
                                <div className="flex justify-center items-center">
                                    {/* table */}
                                    <table className="table-auto">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">Algorithm</th>
                                                <th className="px-4 py-2">Time</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {result.map((element, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border px-4 py-2">{algorithms[index]}</td>
                                                        <td className="border px-4 py-2">{`${element.time} ms`}</td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>

                                </div>
                                <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="hover:text-red-500 text-white bg-red-500 hover:bg-white border hover:border-red-500 rounded-md font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowGraphs(false)}
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

export default Graphs