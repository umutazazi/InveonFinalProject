import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";

import CourseDetails from "./pages/CourseDetails";
import Register from "./pages/Register";
import UserProfile from "./pages/UserProfile";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/courses/:id" element={<CourseDetails />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/payment" element={<Payment />} />
    </Routes>
  );
}

export default App;
