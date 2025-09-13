import AuthCTA from "@/components/AuthCTA";

const isAuth = false;

const HomePage = () => {
  if (isAuth) return <div>welcome to this game</div>;
  return (
    <div className="h-full flex justify-center items-center pb-52">
      <AuthCTA />
    </div>
  );
};

export default HomePage;
