import BattlesHistorySkeletons from "@/components/battles-history-skeletons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Game } from "@/lib/types";
import { cn, timeSince } from "@/lib/utils";

import { getBattleHistory } from "@/services/games";
import {
  ArrowLeft,
  BadgeX,
  Clock4,
  Crown,
  ShieldOff,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const BattleHistoryPage = () => {
  const [loading, setLoading] = useState(false);
  const [battlesHistory, setBattlesHistory] = useState<Game[]>([]);

  useEffect(() => {
    const fetchBattleHistory = async () => {
      setLoading(true);
      try {
        const hitory = await getBattleHistory();
        setBattlesHistory(hitory?.data.gamesHistory ?? []);
      } catch (error) {
        console.log(error);
        setBattlesHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBattleHistory();
  }, []);

  if (loading) {
    return <BattlesHistorySkeletons />;
  }

  const battlesStat = battlesHistory.reduce(
    (acc, curr) => {
      if (curr.winner && curr.winner === "player") {
        acc["victories"] += 1;
      }
      if (curr.winner && curr.winner === "monster") {
        acc["defeats"] += 1;
      }
      acc["totalBattles"] += 1;
      acc["winRate"] =
        acc["totalBattles"] > 0 && acc["victories"] > 0
          ? acc["victories"] / acc["totalBattles"]
          : 0;

      return acc;
    },
    { victories: 0, defeats: 0, totalBattles: 0, winRate: 0 }
  );

  return (
    <div className="space-y-8">
      <Link to={"/"}>
        <Button variant={"ghost"} className="text-lg mb-6">
          <ArrowLeft className="size-5" />
          Back to Game
        </Button>
      </Link>
      <div className="flex items-center gap-4">
        <div className="rounded-md p-3 flex items-center justify-center bg-primary text-primary-foreground">
          <Trophy />
        </div>
        <div className="flex flex-col">
          <h1 className="text-2xl fond-bold">Battle History</h1>
          <p className="text-muted-foreground">
            Your combat record and achievements
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-slate-100">
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-green-600">
              {battlesStat.victories}
            </div>
            <span className="text-sm">Victories</span>
          </CardContent>
        </Card>
        <Card className="border border-slate-100">
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-red-600">
              {battlesStat.defeats}
            </div>
            <span className="text-sm">Defeats</span>
          </CardContent>
        </Card>
        <Card className="border border-slate-100">
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-slate-800">
              {battlesStat.totalBattles}
            </div>
            <span className="text-sm">Total Battles</span>
          </CardContent>
        </Card>
        <Card className="border border-slate-100">
          <CardContent className="space-y-1">
            <div className="text-2xl font-bold text-sky-600">
              {battlesStat.winRate.toFixed(2)}%
            </div>
            <span className="text-sm">Win Rate</span>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <h2 className="text-xl font-medium">Recent Battles</h2>
        <div className="space-y-4">
          {battlesHistory.map((battle) => {
            const {
              winner,
              player,
              monster,
              id,
              duration,
              gameData,
              status,
              createdAt,
            } = battle;
            const isPlayerWin = winner === "player";
            const isGameAbandoned = status === "abandoned";
            return (
              <Card key={id} className="border-slate-100">
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between w-full ">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {isGameAbandoned ? (
                          <ShieldOff className="size-4 text-slate-600" />
                        ) : isPlayerWin ? (
                          <Crown className="size-4 text-green-600" />
                        ) : (
                          <BadgeX className="size-4 text-red-600" />
                        )}
                        <Badge
                          variant={"outline"}
                          className={cn(
                            "rounded-full py-1 px-4",
                            isGameAbandoned
                              ? "bg-slate-100 text-slate-700"
                              : isPlayerWin
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          )}
                        >
                          {isGameAbandoned
                            ? "Abandoned"
                            : isPlayerWin
                            ? "Victory"
                            : "Defeat"}
                        </Badge>
                      </div>
                      <div className="space-x-2">
                        <span className="text-lg font-medium">
                          {player?.fullName ?? "Player"}
                        </span>
                        <span className="text-muted-foreground">vs</span>
                        <span className="text-lg font-medium">
                          {monster?.name ?? "Monster"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock4 className="size-4 text-slate-500" />
                        {duration ?? 60}s
                      </div>
                      <div className="space-x-2">{timeSince(createdAt)}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p>{player?.fullName ?? "Player"}</p>
                        <span>{gameData?.playerHealth}%</span>
                      </div>
                      <Progress
                        value={gameData?.playerHealth}
                        className="bg-green-500"
                      />
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p>{monster?.name ?? "Monster"}</p>
                        <span>{gameData?.monsterHealth}%</span>
                      </div>
                      <Progress
                        value={gameData?.monsterHealth}
                        className="bg-red-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BattleHistoryPage;
