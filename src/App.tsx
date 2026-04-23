import { Route, Routes } from "react-router-dom"
import Dashboard from "./screens/Plots/Plots"
import Header from "./components/Header/header"
import PlotEnrollment from "./screens/PlotEnrollment/PlotEnrollment"


function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
      <Route path="/enrollment" element={<PlotEnrollment/>}></Route>
    </Routes>
    </>
    
  )
}

export default App
