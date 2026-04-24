import { Route, Routes } from "react-router-dom"
import Plots from "./screens/Plots/Plots"
import PlotEnrollment from "./screens/PlotEnrollment/PlotEnrollment"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Plots/>}></Route>
      <Route path="/plots" element={<Plots/>}></Route>
      <Route path="/enrollment" element={<PlotEnrollment/>}></Route>
    </Routes>
    </>
    
  )
}

export default App
