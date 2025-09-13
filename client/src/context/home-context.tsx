import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router";
import {
  getMonster,
  monsterAttack,
  playerAttack,
  startGame,
} from "@/services/games";
import type { Game, Monster } from "@/lib/types";
import { getRandomDamge } from "@/lib/utils";

type HomeState = {
  currentStep: "call-to-action" | "ready" | "start";
  currentGame: Game | null;
  monster: Monster | null;
  isPlayerAttacking: boolean;
  isMonsterAttacking: boolean;
  gameOver: boolean;
};

type HomeContextValue = HomeState & {
  next: (step: HomeState["currentStep"]) => void;
  onLogout: () => void;
  startPlaying: () => Promise<void>;
  startTheGame: () => Promise<void>;
  playerAttackMonster: () => Promise<void>;
  monsterAttackPlayer: () => Promise<void>;
  playAgain: () => Promise<void>;
  quitGame: () => void;
};

const HOME_ACTIONS = {
  NEXT_STEP: "NEXT_STEP",
  LOGOUT: "LOGOUT",
  START_PLAYING: "START_PLAYING",
  START_GAME: "START_GAME",
  PLAYER_ATTACK: "PLAYER_ATTACK",
  MONSTER_ATTACK: "MONSTER_ATTACK",
  GAME_OVER: "GAME_OVER",
  PlAY_AGAIN: "PLAY_AGAIN",
  QUIT_GAME: "QUIT_GAME",
} as const;

type HomeActions =
  | {
      type: typeof HOME_ACTIONS.NEXT_STEP;
      payload: HomeState["currentStep"];
    }
  | { type: typeof HOME_ACTIONS.LOGOUT }
  | { type: typeof HOME_ACTIONS.LOGOUT }
  | { type: typeof HOME_ACTIONS.START_PLAYING; payload: Monster }
  | {
      type: typeof HOME_ACTIONS.START_GAME;
      payload: Game;
    }
  | {
      type: typeof HOME_ACTIONS.PLAYER_ATTACK;
      payload: Game;
    }
  | {
      type: typeof HOME_ACTIONS.MONSTER_ATTACK;
      payload: Game;
    }
  | {
      type: typeof HOME_ACTIONS.GAME_OVER;
    }
  | {
      type: typeof HOME_ACTIONS.PlAY_AGAIN;
      payload: { monster: Monster; game: Game };
    }
  | {
      type: typeof HOME_ACTIONS.QUIT_GAME;
    };

const initialState: HomeState = {
  currentStep: "call-to-action",
  currentGame: null,
  monster: null,
  isPlayerAttacking: false,
  isMonsterAttacking: false,
  gameOver: false,
};

const homeReducer = (state: HomeState, action: HomeActions): HomeState => {
  switch (action.type) {
    case HOME_ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    case HOME_ACTIONS.LOGOUT:
      return {
        ...state,
        ...initialState,
      };
    case HOME_ACTIONS.START_PLAYING:
      return {
        ...state,
        monster: action.payload,
        currentStep: "ready",
      };
    case HOME_ACTIONS.START_GAME:
      return {
        ...state,
        currentGame: action.payload,
        currentStep: "start",
      };
    case HOME_ACTIONS.PLAYER_ATTACK:
      return {
        ...state,
        isPlayerAttacking: true,
        currentGame: action.payload,
      };
    case HOME_ACTIONS.MONSTER_ATTACK:
      return {
        ...state,
        isMonsterAttacking: true,
        isPlayerAttacking: false,
        currentGame: action.payload,
      };
    case HOME_ACTIONS.GAME_OVER:
      return {
        ...state,
        gameOver: true,
      };
    case HOME_ACTIONS.PlAY_AGAIN:
      return {
        ...state,
        gameOver: false,
        monster: action.payload.monster,
        currentGame: action.payload.game,
        currentStep: "start",
      };
    case HOME_ACTIONS.QUIT_GAME:
      return {
        ...state,
        ...initialState,
        currentStep: "call-to-action",
      };
    default:
      return state;
  }
};

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const next = (step: HomeState["currentStep"]) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch({ type: HOME_ACTIONS.NEXT_STEP, payload: step });
    }
  };

  useEffect(() => {
    if (
      state.currentGame?.gameData?.monsterHealth === 0 ||
      state.currentGame?.gameData?.playerHealth === 0
    ) {
      dispatch({ type: HOME_ACTIONS.GAME_OVER });
    }
  }, [state.currentGame?.gameData]);

  const startPlaying = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await getMonster();
      if (!response) {
        throw new Error("No monster");
      }

      dispatch({
        type: HOME_ACTIONS.START_PLAYING,
        payload: response.data.monster,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startTheGame = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    try {
      const response = await startGame(user?.id ?? "", state.monster?.id ?? "");
      if (!response) {
        throw new Error("Failed to create a game!");
      }
      dispatch({ type: HOME_ACTIONS.START_GAME, payload: response.data.game });
    } catch (error) {
      console.log(error);
    }
  };

  const playerAttackMonster = async () => {
    const randomDamge = getRandomDamge();
    try {
      const response = await playerAttack(
        state.currentGame?.id ?? "",
        randomDamge
      );
      if (!response) {
        throw new Error("Failed to attack monster");
      }

      dispatch({
        type: HOME_ACTIONS.PLAYER_ATTACK,
        payload: response.data.game,
      });

      await monsterAttackPlayer();
    } catch (error) {
      console.log(error);
    }
  };

  const monsterAttackPlayer = async () => {
    const randomDamge = getRandomDamge();
    try {
      const response = await monsterAttack(
        state.currentGame?.id ?? "",
        randomDamge
      );
      if (!response) {
        throw new Error("Failed to attack player");
      }
      dispatch({
        type: HOME_ACTIONS.MONSTER_ATTACK,
        payload: response.data.game,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const playAgain = async () => {
    try {
      const monsterResponse = await getMonster();
      if (!monsterResponse) {
        throw new Error("No monster");
      }
      const gameResponse = await startGame(
        user?.id ?? "",
        monsterResponse?.data?.monster?.id ?? ""
      );
      if (!gameResponse) {
        throw new Error("Failed to create a game!");
      }
      dispatch({
        type: HOME_ACTIONS.PlAY_AGAIN,
        payload: {
          monster: monsterResponse.data.monster,
          game: gameResponse?.data?.game,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const quitGame = () => {
    dispatch({ type: HOME_ACTIONS.QUIT_GAME });
  };

  // Todo: Callback to reset the states after logout
  const onLogout = () => {
    dispatch({ type: HOME_ACTIONS.LOGOUT });
  };

  const contextValue: HomeContextValue = {
    ...state,
    next,
    onLogout,
    startPlaying,
    startTheGame,
    playerAttackMonster,
    monsterAttackPlayer,
    playAgain,
    quitGame,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("Home context must be used within home provider.");
  }
  return context;
};

export { HomeProvider, useHome };
