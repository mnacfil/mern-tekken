import { createContext, useContext, useReducer, type ReactNode } from "react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router";
import { getMonster, startGame } from "@/services/games";
import type { Game, Monster } from "@/lib/types";

type HomeState = {
  currentStep: "call-to-action" | "ready" | "start";
  currentGame: Game | null;
  monster: Monster | null;
};

type HomeContextValue = HomeState & {
  next: (step: HomeState["currentStep"]) => void;
  onLogout: () => void;
  startPlaying: () => Promise<void>;
  startTheGame: () => Promise<void>;
};

const HOME_ACTIONS = {
  NEXT_STEP: "NEXT_STEP",
  LOGOUT: "LOGOUT",
  START_PLAYING: "START_PLAYING",
  START_GAME: "START_GAME",
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
    };

const initialState: HomeState = {
  currentStep: "call-to-action",
  currentGame: null,
  monster: null,
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
      console.log("monster -> ", response);
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
      console.log("game -> ", response);
      dispatch({ type: HOME_ACTIONS.START_GAME, payload: response.data.game });
    } catch (error) {
      console.log(error);
    }
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
