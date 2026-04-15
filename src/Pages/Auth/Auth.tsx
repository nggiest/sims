import { useLocation } from "react-router-dom";
import image from "../../assets/AuthImage.png";
import logo from "../../assets/Logo.png";
import Login from "./Component/Login";
import Register from "./Component/Register";

const Auth = () => {
  const location = useLocation();
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md mx-auto">
            <div className="flex gap-2 items-center justify-center font-semibold text-lg mb-6">
              <img src={logo} className="h-8" />
              SIMS PPOB
            </div>
            {location.pathname === "/login" ? <Login /> : <Register />}
          </div>
        </div>

        <div className="hidden md:block relative">
          <img
            src={image}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </>
  );
};
export default Auth;
