import { Percent } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { useState } from "react";
import GameOverDialog from "./game-over-dialog";
import { useHome } from "@/context/home-context";
import { useAuth } from "@/context/auth-context";
import { Progress } from "./ui/progress";
import { cn } from "@/lib/utils";

const StartStep = () => {
  const [open, setOpen] = useState(false);
  const {
    monster,
    currentGame,
    isPlayerAttacking,
    gameOver,
    heal,
    playerAttackMonster,
    abandonedTheGame,
  } = useHome();
  const { user } = useAuth();
  const { gameData, moves, player, status, winner } = currentGame ?? {};
  console.log(status);
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
              <CardTitle className="text-xl">
                {user?.fullName ?? "Player Name"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress
                value={gameData?.playerHealth ?? 100}
                className="h-10 bg-green-500"
              />
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg">{gameData?.playerHealth ?? 100}</span>
                <Percent className="size-4" />
              </div>
            </CardContent>
          </Card>
          <div className="text-3xl flex items-center justify-center font-bold w-52">
            VS
          </div>
          <Card className="border-slate-50 flex-1">
            <CardHeader>
              <CardTitle className="text-xl">
                {monster?.name ?? "Monster"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Progress
                value={gameData?.monsterHealth ?? 100}
                className="h-10 bg-red-500"
              />
              <div className="flex items-center justify-center gap-1">
                <span className="text-lg">
                  {gameData?.monsterHealth ?? 100}
                </span>
                <Percent className="size-4" />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="text-center space-y-4">
          <h3 className="text-xl font-medium">Action Buttons</h3>
          <div className="flex gap-4 justify-between items-center max-w-2xl  mx-auto">
            <Button
              onClick={() => playerAttackMonster("normal")}
              disabled={isPlayerAttacking}
              className={cn(
                "flex-1 text-lg rounded-lg py-6 bg-green-700 hover:bg-green-800 cursor-pointer",
                isPlayerAttacking && "cursor-not-allowed"
              )}
            >
              ATTACK
            </Button>
            <Button
              onClick={() => playerAttackMonster("blast")}
              className="flex-1 text-lg rounded-lg py-6 bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              BLAST
            </Button>
            <Button
              onClick={async () => {
                await heal("player");
                await heal("monster");
              }}
              className="flex-1 text-lg rounded-lg py-6 bg-blue-500 hover:bg-blue-600 cursor-pointer"
            >
              HEAL
            </Button>
            <Button
              onClick={abandonedTheGame}
              className="flex-1 text-lg rounded-lg py-6 bg-slate-700 hover:bg-slate-800 cursor-pointer"
            >
              GIVE UP
            </Button>
          </div>
        </div>
        <Card className="border-slate-50 ">
          <CardHeader>
            <CardTitle>Commentary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm max-h-72 overflow-y-auto">
            <div className="bg-slate-50 border  p-6 border-slate-200 rounded-xl">
              {moves?.map((move) => (
                <div
                  key={move._id}
                  className="bg-white text-slate-900 p-1.5 rounded-md border-l-4 border-green-500"
                >
                  <span className="text-green-500">
                    {move.entity === "player"
                      ? player?.fullName ?? "Player"
                      : monster?.name ?? "Monster"}
                  </span>{" "}
                  <span className="text-muted-foreground capitalize">
                    {move.action}
                  </span>{" "}
                  <span className="text-red-500">
                    {move.entity === "player"
                      ? monster?.name ?? "Monster"
                      : player?.fullName ?? "Player"}{" "}
                  </span>
                  <span className="">
                    by <span className="text-green-500">{move.damage}</span>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <GameOverDialog
        open={status === "completed" || status === "abandoned"}
        onOpenChange={setOpen}
        winner={winner ?? "player"}
        isAbandoned={status === "abandoned"}
      />
    </>
  );
};

export default StartStep;
