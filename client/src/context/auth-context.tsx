import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
} from "@/lib/types";
import { getCurrentUser, login, logout, register } from "@/services/auth";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useHome } from "./home-context";

type AuthState = {
  isSignedIn: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  user: AuthUser | null;
};

type AuthContextValue = AuthState & {
  loginPlayer: (params: LoginPayload) => Promise<void>;
  registerPlayer: (params: RegisterPayload) => Promise<void>;
  logoutPlayer: () => Promise<void>;
};

const AUTH_ACTIONS = {
  LOAD: "LOAD",
  LOAD_SUCCESS: "LOAD_SUCCESS",
  LOAD_FAILED: "LOAD_FAILED",
  LOGIN: "LOGIN",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  REGISTER: "REGISTER",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILED: "REGISTER_FAILED",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILED: "LOGOUT_FAILED",
} as const;

type AuthAction =
  | { type: typeof AUTH_ACTIONS.LOAD }
  | { type: typeof AUTH_ACTIONS.LOAD_SUCCESS; payload: AuthUser }
  | { type: typeof AUTH_ACTIONS.LOAD_FAILED }
  | { type: typeof AUTH_ACTIONS.LOGIN }
  | { type: typeof AUTH_ACTIONS.LOGIN_SUCCESS; payload: LoginResponse }
  | { type: typeof AUTH_ACTIONS.LOGIN_FAILED }
  | { type: typeof AUTH_ACTIONS.REGISTER }
  | { type: typeof AUTH_ACTIONS.REGISTER_SUCCESS; payload: RegisterResponse }
  | { type: typeof AUTH_ACTIONS.REGISTER_FAILED }
  | { type: typeof AUTH_ACTIONS.LOGOUT_SUCCESS }
  | { type: typeof AUTH_ACTIONS.LOGOUT_FAILED };

const initialState: AuthState = {
  isSignedIn: false,
  isAuthenticated: false,
  loading: false,
  user: null,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.LOAD:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        isSignedIn: true,
        user: action.payload,
      };

    case AUTH_ACTIONS.LOAD_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        isSignedIn: false,
        user: null,
      };

    case AUTH_ACTIONS.LOGIN:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload?.user ?? null,
      };
    case AUTH_ACTIONS.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case AUTH_ACTIONS.REGISTER:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload?.user ?? null,
      };
    case AUTH_ACTIONS.REGISTER_FAILED:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case AUTH_ACTIONS.LOGOUT_SUCCESS:
      return {
        ...state,
        ...initialState,
      };
    case AUTH_ACTIONS.LOGOUT_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

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

  const loginPlayer = async (params: LoginPayload) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN });
    try {
      const response = await login(params);
      if (response) {
        dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: response });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGIN_FAILED });
      toast.error("Failed to login");
      console.log("Failed to login");
    }
  };

  const registerPlayer = async (params: RegisterPayload) => {
    dispatch({ type: AUTH_ACTIONS.REGISTER });
    try {
      const response = await register(params);
      if (!response) {
        throw new Error("Bad Request");
      }
      if (response) {
        dispatch({ type: AUTH_ACTIONS.REGISTER_SUCCESS, payload: response });
        navigate("/");
      }
    } catch (error: any) {
      dispatch({ type: AUTH_ACTIONS.REGISTER_FAILED });
      toast.error("Faild to register");
      console.log(error);
    }
  };

  const logoutPlayer = async () => {
    try {
      await logout();
      dispatch({ type: AUTH_ACTIONS.LOGOUT_SUCCESS });
    } catch (error) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT_FAILED });
      toast.error("Faild to logout");
      console.log(error);
    }
  };

  const contextValue = {
    ...state,
    loginPlayer,
    registerPlayer,
    logoutPlayer,
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
