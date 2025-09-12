import { Link, NavLink, Outlet } from "react-router";
import { Button } from "../ui/button";

const MainLayout = () => {
  return (
    <div className="h-dvh bg-slate-50">
      <header className="h-16 flex items-center border border-slate-200">
        <div className=" mx-auto max-w-7xl  w-full">
          <nav className="flex items-center justify-between ">
            <Link to="/" className="text-2xl font-bold text-accent-foreground">
              Monster Figther
            </Link>
            <div className="flex items-center gap-2">
              <Link to="login">
                <Button variant={"secondary"} size={"lg"}>
                  Login
                </Button>
              </Link>
              <Link to={"/register"}>
                <Button size={"lg"}>Register</Button>
              </Link>
            </div>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto w-full h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
