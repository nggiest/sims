import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../Pages/Home/Home";
import Auth from "../Pages/Auth/Auth";
import TopUp from "../Pages/TopUp/TopUp";
import Transaction from "../Pages/Transaction/Transaction";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../Pages/Profile/Profile";

const PagesRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/topup" element={<TopUp />} />
          <Route path="/transaction" element={<Transaction />} />
        </Route>
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PagesRoute;
