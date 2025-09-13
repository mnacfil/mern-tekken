import { Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import GameOverDialog from "./game-over-dialog";

const StartStep = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full space-y-6 text-slate-900">
        <div className="flex flex-col items-center justify-center">
          <h4 className="text-lg font-medium">Time remaining</h4>
          <div className="rounded-full size-24 border-4 border-green-500 flex items-center justify-center">
            <span className="text-2xl font-bold">60s</span>
          </div>
        </div>
        <div className="flex gap-6 text-center">
          <Card className="border-slate-50 flex-1">
            <CardHeader>
              <CardTitle className="text-xl">Player Name</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-full bg-green-500 h-8 w-full flex items-center justify-center gap-1 font-medium text-white">
                <span className="text-lg">100</span>
                <Percent className="size-4" />
              </div>
            </CardContent>
          </Card>
          <div className="text-3xl flex items-center justify-center font-bold w-52">
            VS
          </div>
          <Card className="border-slate-50 flex-1">
            <CardHeader>
              <CardTitle className="text-xl">Monster</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-full bg-red-500 h-8 w-full flex items-center justify-center gap-1 font-medium text-white">
                <span className="text-lg">100</span>
                <Percent className="size-4" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">Action Buttons</h3>
          <div className="flex gap-4 justify-between items-center max-w-2xl  mx-auto">
            <Button className="flex-1 text-lg rounded-lg py-6 bg-green-700 hover:bg-green-800 cursor-pointer">
              ATTACK
            </Button>
            <Button className="flex-1 text-lg rounded-lg py-6 bg-orange-500 hover:bg-orange-600 cursor-pointer">
              BLAST
            </Button>
            <Button className="flex-1 text-lg rounded-lg py-6 bg-blue-500 hover:bg-blue-600 cursor-pointer">
              HEAL
            </Button>
            <Button className="flex-1 text-lg rounded-lg py-6 bg-slate-700 hover:bg-slate-800 cursor-pointer">
              GIVE UP
            </Button>
          </div>
        </div>
        <Card className="border-slate-50">
          <CardHeader>
            <CardTitle>Commentary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            <div className="bg-slate-50 border  p-6 border-slate-200 rounded-xl">
              <div className="bg-white p-1.5 rounded-md border-l-4 border-green-500">
                Hello World
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <GameOverDialog open={open} onOpenChange={setOpen} winner="monster" />
    </>
  );
};

export default StartStep;
