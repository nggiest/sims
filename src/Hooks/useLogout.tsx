import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");

    navigate("/login", { replace: true });
  };

  return logout;
};

export default useLogout;
