import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <main className="w-[450px]">
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
