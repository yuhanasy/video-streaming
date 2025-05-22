import { Link, Outlet, useLocation } from "react-router";

const Layout = () => {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-neutral-900 to-neutral-800 p-4 flex items-center justify-between">
        <div className="font-semibold">Canvas Video Player</div>

        {pathname === "/meetings" ? (
          <a
            href="/meetings"
            target="_blank"
            className="bg-neutral-700 px-4 py-1 rounded text-sm"
          >
            Join Meeting
          </a>
        ) : (
          <Link
            to="/meetings"
            className="bg-neutral-700 px-4 py-1 rounded text-sm"
          >
            Start Meeting
          </Link>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default Layout;
