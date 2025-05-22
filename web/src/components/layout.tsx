import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 p-4 text-center font-semibold">
        Canvas Video Player
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
