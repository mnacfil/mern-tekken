import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";
import { useAuth } from "@/context/auth-context";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const MainLayout = () => {
  const { isAuthenticated, user, logoutPlayer } = useAuth();
  return (
    <div className="h-dvh bg-slate-50">
      <header className="h-16 flex items-center border border-slate-200">
        <div className=" mx-auto max-w-7xl  w-full">
          <nav className="flex items-center justify-between ">
            <Link to="/" className="text-2xl font-bold text-accent-foreground">
              Monster Figther
            </Link>
            {isAuthenticated && (
              <Link to="battle-history">
                <Button variant={"link"} size={"lg"}>
                  Battle History
                </Button>
              </Link>
            )}
            <div className="flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-10">
                      <AvatarImage src={user?.avatar} alt="Avatar image" />
                      <AvatarFallback>
                        {user?.fullName?.at(0) ?? "M"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col text-sm">
                      <p>{user?.fullName}</p>
                      <p className="text-xs text-muted-foreground">
                        {user?.email}
                      </p>
                    </div>
                    <Button
                      onClick={logoutPlayer}
                      variant={"ghost"}
                      className="cursor-pointer"
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Link to="login">
                    <Button variant={"secondary"} size={"lg"}>
                      Login
                    </Button>
                  </Link>
                  <Link to={"/register"}>
                    <Button size={"lg"}>Register</Button>
                  </Link>
                </>
              )}
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
