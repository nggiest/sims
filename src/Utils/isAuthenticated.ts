const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  const exp = localStorage.getItem("token_exp");

  if (!token || !exp) return false;

  if (Date.now() > Number(exp)) {
    localStorage.removeItem("token");
    localStorage.removeItem("token_exp");
    return false;
  }

  return true;
};

export default isAuthenticated;
