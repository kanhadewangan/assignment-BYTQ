import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Signin from "../../components/Auth/Signin/Signin";
import Signup from "../../components/Auth/Signup/Signup";
import Overlay from "../../components/Auth/Overlay/Overlay";

export default function Auth() {
  const location = useLocation();

  return (
      <Routes>
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
 
  );
}

