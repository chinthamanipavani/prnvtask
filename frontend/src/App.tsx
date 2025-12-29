import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage";
import Cat1 from "./pages/Cat1";
import Cat2 from "./pages/Cat2";
import Cat3 from "./pages/Cat3";
import BookingPage from "./pages/BookingPage";
import UserDetails from "./pages/UserDetails";
import BookingSuccess from "./pages/BookingSuccess";
import Register from "./component/Register";
import Login from "./component/Login";
import Technician from "./pages/Technician";
import CustomerRoute from "./pages/CustomerRoute";
import All from "./pages/All";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<All />} />

        {/* First page */}
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/cat1" element={<Cat1 />} />
        <Route path="/cat2" element={<Cat2 />} />
        <Route path="/cat3" element={<Cat3 />} />

        {/* <Route path="/booking/:category/:serviceId" element={<BookingPage />} /> */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        {/* login */}
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* technician */}
        <Route element={<CustomerRoute allowedRole="technician" />}>
          <Route path="/technicians" element={<Technician />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
