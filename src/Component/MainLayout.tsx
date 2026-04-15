import { Outlet, useLocation } from "react-router-dom";
import image from "../assets/Logo.png";

const MainLayout = () => {
  const location = useLocation();
  const menu = [
    {
      name: "Top Up",
      url: "/topup",
    },
    {
      name: "Transaction",
      url: "/transaction",
    },
    {
      name: "Akun",
      url: "/profile",
    },
  ];
  return (
    <>
      <header className="h-16 bg-white sticky top-0 z-50 ">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-start h-full">
          <a href="/">
            <div className="flex items-center gap-4 font-semibold text-lg">
              <img src={image} className="h-8" />
              SIMS PPOB
            </div>
          </a>

          <nav className="ml-auto flex items-center gap-12 text-sm font-bold min-w-[360px] mr-6">
            {menu.map((item) => {
              const isActive = location.pathname === item.url;
              return (
                <a
                  key={item.name}
                  href={item.url}
                  className={`cursor-pointer transition ${
                    isActive ? "text-red-800" : "text-gray-800"
                  }`}>
                  {item.name}
                </a>
              );
            })}
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  );
};

export default MainLayout;
