import Signin from './components/Auth/Signin/page'
import Signup from './components/Auth/Signup/page'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
        </Routes>
      </BrowserRouter>


    </>
  )
}

export default App
