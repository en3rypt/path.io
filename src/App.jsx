//components
import Pathfinder from "./components/Pathfinder"
import Navbar from "./components/Navbar"

import Commands from "./components/Commands"
import DropDown from "./components/DropDown"
import Footer from "./components/Footer"
function App() {
  return (
    <div className="">
      {/* <Navbar /> */}

      {/* <Commands /> */}
      {/* <DropDown /> */}
      <div className="flex flex-col items-center">
        <Pathfinder />
      </div>
      <Footer />
    </div>
  ) 
}

export default App
