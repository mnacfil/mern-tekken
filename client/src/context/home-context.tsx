import { createContext, useContext, useReducer, type ReactNode } from "react";
import { useAuth } from "./auth-context";
import { useNavigate } from "react-router";

type HomeState = {
  currentStep: "call-to-action" | "ready" | "start";
};

type HomeContextValue = HomeState & {
  next: (step: HomeState["currentStep"]) => void;
  onLogout: () => void;
};

const HOME_ACTIONS = {
  NEXT_STEP: "NEXT_STEP",
  LOGOUT: "LOGOUT",
} as const;

type HomeActions =
  | {
      type: typeof HOME_ACTIONS.NEXT_STEP;
      payload: HomeState["currentStep"];
    }
  | { type: typeof HOME_ACTIONS.LOGOUT };

const initialState: HomeState = {
  currentStep: "call-to-action",
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
    default:
      return state;
  }
};

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const next = (step: HomeState["currentStep"]) => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch({ type: HOME_ACTIONS.NEXT_STEP, payload: step });
    }
  };

  const onLogout = () => {
    dispatch({ type: HOME_ACTIONS.LOGOUT });
  };

  const contextValue = {
    ...state,
    next,
    onLogout,
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
