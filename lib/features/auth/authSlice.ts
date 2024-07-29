import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { resolve } from "path";

export interface IUser {
  id: number;
  token: string;
  createdAt: string;
  updatedAt: string;
  isBlacklisted: boolean;
  exp: string;
  userId: number;
}

export interface IInitialState {
  user?: IUser;
  error?: any;
  loading?: boolean;
}
const initialState: IInitialState = {
  user: undefined,
  error: null,
  loading: false,
};

interface LoginInfo {
  userName: string;
  password: string;
}

interface SignUpInfo {
  userName: string;
  password: string;
  name: string;
  email: string;
  confirmPassword: string;
}

const formatError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    return (
      message || {
        non_field_error: "Something went worng",
      }
    );
  } else {
    // Handle other types of errors
    return {
      non_field_error: "Something went worng",
    };
  }
};
export const loginUserAsync = createAsyncThunk<IUser, LoginInfo>(
  "user/login",

  async (loginInfo: LoginInfo, { rejectWithValue }) => {
    try {
      console.log(loginInfo, "inside asyncThunk");
      const response = await axios.post(
        "http://localhost:3001/auth/signin",
        loginInfo
      );
      return response.data as IUser;
    } catch (error) {
      return rejectWithValue(formatError(error));
    }
  }
);

export const signUpUserAsync = createAsyncThunk<IUser, SignUpInfo>(
  "user/signup",

  async (signUpInfo: SignUpInfo, { rejectWithValue }) => {
    try {
      console.log(signUpInfo, "inside asyncThunk");
      const response = await axios.post(
        "http://localhost:3001/auth/signup",
        signUpInfo
      );
      return response.data as IUser;
    } catch (error) {
      return rejectWithValue(formatError(error));
    }
  }
);

export const signOutAsync = createAsyncThunk("user/signOut", async () => {
  // Optionally call an API to invalidate the session
  // await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate an API call
  Cookies.remove("user"); // Clear the user cookie

  return "success";
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    signOut(state) {
      state.user = undefined;
      Cookies.remove("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.pending, (state) => {
        // state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUserAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          console.log(action);
          state.user = action.payload;
          state.loading = false;
          Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
        }
      )
      .addCase(loginUserAsync.rejected, (state, action) => {
        // state.status = "idle"
        // console.log(action);
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signUpUserAsync.pending, (state) => {
        // state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(
        signUpUserAsync.fulfilled,
        (state, action: PayloadAction<IUser>) => {
          console.log(action);
          state.user = action.payload;
          state.loading = false;
          Cookies.set("user", JSON.stringify(action.payload), { expires: 7 });
        }
      )
      .addCase(signUpUserAsync.rejected, (state, action) => {
        // state.status = "idle"
        // console.log(action);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const selectLoggedInUser = (state: any) => state.auth.user;
export const { setUser, signOut } = authSlice.actions;

export default authSlice.reducer; // EXPORT Slice reducer
