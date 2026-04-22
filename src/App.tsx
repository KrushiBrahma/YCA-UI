import { Route, Routes } from "react-router-dom"
import Dashboard from "./screens/Plots/Plots"
import Header from "./components/Header/header"


function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Dashboard/>}></Route>
      <Route path="/dashboard" element={<Dashboard/>}></Route>
    </Routes>
    </>
    
  )
}

export default App
