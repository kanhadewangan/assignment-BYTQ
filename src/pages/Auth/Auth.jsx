import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "../../components/Auth/Signin/Signin";
import Signup from "../../components/Auth/Signup/Signup";
``
export default function Auth() {
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

