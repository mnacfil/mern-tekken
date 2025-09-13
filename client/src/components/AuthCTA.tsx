import { Link } from "react-router";

import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import AppLogo from "./app-logo";

const AuthCTA = () => {
  return (
    <Card className="border-slate-100  w-[500px] rounded-2xl">
      <CardContent className="text-center flex flex-col items-center">
        <div className="pb-6 space-y-4">
          <AppLogo />
          <h2 className="text-3xl font-bold">Ready to Battle?</h2>
          <p className="text-lg text-secondary-foreground">
            Join the epic monster fighting arena and test your combat skills!
          </p>
        </div>
        <Button className="w-full text-lg py-7 rounded-2xl cursor-pointer">
          Start Playing Now
        </Button>

        <div className="w-full h-full relative">
          <Separator orientation="horizontal" className="my-6" />
          <span className="bg-white p-3 text-sm text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            or
          </span>
        </div>

        <Link to="/register" className="w-full">
          <Button
            variant={"outline"}
            className="w-full text-lg py-7 mb-8 rounded-2xl cursor-pointer"
          >
            Create Account
          </Button>
        </Link>

        <p className="text-sm text-muted-foreground">
          Experience intense combat, strategic gameplay, and epic monster
          battles!
        </p>
      </CardContent>
    </Card>
  );
};

export default AuthCTA;
