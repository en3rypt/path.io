
//components
import Pathfinder from "./components/Pathfinder"
import Navbar from "./components/Navbar"

import Commands from "./components/Commands"
function App() {
  return (
    <div className="">
      {/* <Navbar /> */}

      <Commands />
      
      <div className="flex flex-col items-center">
        <Pathfinder />
      </div>
    </div>
  )
}

export default App
