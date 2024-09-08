
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import PackView from './pages/PackView'
import Results from './pages/Result'


function App() {


  return (
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/:searchTerm" element={<Results />} />

      <Route path="/packview/:collectionId" element={<PackView />} />
  </Routes>
  )
}

export default App
