import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <main className="bg-slate-200 w-[500px]">
        Auth layout here
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
