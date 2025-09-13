import type { AuthUser } from "@/lib/types";
import { getCurrentUser } from "@/services/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

type AuthState = {
  isSignedIn: boolean;
  isAuthenticated: boolean;
  initialLoading: boolean;
  user: AuthUser | null;
};

type AuthContextValue = AuthState & {};

const AUTH_ACTIONS = {
  LOAD: "LOAD",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FAILED: "LOAD_FAILED",
} as const;

type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOAD }
  | { type: typeof AUTH_ACTIONS.LOAD_SUCCESS; payload: AuthUser }
  | { type: typeof AUTH_ACTIONS.LOAD_FAILED };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOAD:
      return {
        ...state,
        initialLoading: true,
      };
    case AUTH_ACTIONS.LOAD_SUCCESS:
      return {
        ...state,
        initialLoading: false,
        isAuthenticated: true,
        isSignedIn: true,
        user: action.payload,
      };

    case AUTH_ACTIONS.LOAD_SUCCESS:
      return {
        ...state,
        initialLoading: false,
        isAuthenticated: false,
        isSignedIn: false,
        user: null,
      };

    default:
      return state;
  }
};

const initialState: AuthState = {
  isSignedIn: false,
  isAuthenticated: false,
  initialLoading: false,
  user: null,
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    dispatch({ type: AUTH_ACTIONS.LOAD });
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser({
          id: "68c4edac592675441bce011b",
        });
        if (currentUser) {
          dispatch({ type: AUTH_ACTIONS.LOAD_SUCCESS, payload: currentUser });
        }
      } catch (error) {
        dispatch({ type: AUTH_ACTIONS.LOAD_FAILED });
        console.log("Failed to fetch current user");
      }
    };
    fetchCurrentUser();
  }, []);

  console.log(state);

  const contextValue = {
    ...state,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth context must be used within auth provider");
  }

  return context;
};

export { AuthProvider, useAuth };
