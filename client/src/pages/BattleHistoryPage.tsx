import { useAuth } from "@/context/auth-context";
import { getBattleHistory } from "@/services/games";
import { useEffect, useState } from "react";

// Todo: Fix fetching issue

const BattleHistoryPage = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBattleHistory = async () => {
      setLoading(true);
      try {
        const hitory = await getBattleHistory(user?.id ?? "");
        console.log(hitory);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchBattleHistory();
  }, []);

  return <div>History Page</div>;
};

export default BattleHistoryPage;
