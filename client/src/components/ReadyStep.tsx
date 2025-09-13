import { useHome } from "@/context/home-context";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Percent } from "lucide-react";
import { Button } from "./ui/button";
import { useAuth } from "@/context/auth-context";

const ReadyStep = () => {
  const { monster, startTheGame } = useHome();
  const { user } = useAuth();

  return (
    <div className="w-full space-y-6">
      <div className="grid gap-6 grid-cols-2 text-center">
        <Card className="border-slate-50">
          <CardHeader>
            <CardTitle className="text-2xl">
              {user?.fullName ?? "Player Name"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-full bg-green-500 h-12 w-full flex items-center justify-center gap-1 font-medium text-white">
              <span className="text-lg">100</span>
              <Percent className="size-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-50">
          <CardHeader>
            <CardTitle className="text-2xl">
              {monster?.name ?? "Monster"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-full bg-red-500 h-12 w-full flex items-center justify-center gap-1 font-medium text-white">
              <span className="text-lg">100</span>
              <Percent className="size-4" />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={startTheGame}
          className="py-8 px-12 rounded-2xl text-2xl cursor-pointer"
        >
          Start
        </Button>
      </div>
    </div>
  );
};

export default ReadyStep;
