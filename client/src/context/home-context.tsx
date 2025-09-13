import { createContext, useContext, useReducer, type ReactNode } from "react";

type HomeState = {
  currentStep: "call-to-action" | "ready" | "start";
  isSignedIn: boolean;
  user: { fullName: string; email: string; avatar?: string } | null;
};

type HomeContextValue = HomeState & {
  next: (step: HomeState["currentStep"]) => void;
};

const HOME_ACTIONS = {
  NEXT_STEP: "NEXT_STEP",
} as const;

type HomeActions = {
  type: typeof HOME_ACTIONS.NEXT_STEP;
  payload: HomeState["currentStep"];
};

const homeReducer = (state: HomeState, action: HomeActions): HomeState => {
  switch (action.type) {
    case HOME_ACTIONS.NEXT_STEP:
      return {
        ...state,
        currentStep: action.payload,
      };
    default:
      return state;
  }
};

const initialState: HomeState = {
  currentStep: "ready",
  isSignedIn: true,
  user: null,
};

const HomeContext = createContext<HomeContextValue | undefined>(undefined);

const HomeProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(homeReducer, initialState);

  const next = (step: HomeState["currentStep"]) => {
    dispatch({ type: HOME_ACTIONS.NEXT_STEP, payload: step });
  };

  const contextValue = {
    ...state,
    next,
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
