import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";
import { request } from "../../utils/request";

type TUserState = {
  isAuthCheck: boolean;
  isLoading: boolean;
  data: {
    email: string | null;
    name: string | null;
  };
};

const initialState: TUserState = {
  isAuthCheck: false,
  isLoading: false,
  data: {
    email: null,
    name: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.data = action.payload.user;
      state.isAuthCheck = action.payload.success;
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    resetUser(state) {
      state.isAuthCheck = false;
      state.data.email = null;
      state.data.name = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(logout.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(getUser.rejected, (state, action) => {
      console.log(action.error);
    });
    builder.addCase(changeData.rejected, (state, action) => {
      console.log(action.error);
    });
  },
});

export const { setUser, setLoading, resetUser } = userSlice.actions;

type TRegisterArgs = {
  email: string;
  password: string;
  name: string;
};
export const register = createAsyncThunk<void, TRegisterArgs>(
  "user/register",
  ({ email, password, name }, { dispatch }) => {
    request(`${baseUrl}/api/auth/register`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    }).then((res) => {
      dispatch(setUser(res));
    });
  }
);

type TLoginArgs = Omit<TRegisterArgs, "name">;
export const login = createAsyncThunk<void, TLoginArgs>(
  "user/login",
  ({ email, password }, { dispatch }) => {
    request(`${baseUrl}/api/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then((res) => {
      if (res.success) {
        setCookie("token", res.accessToken.split("Bearer ")[1]);
        setCookie("refresh", res.refreshToken);
        dispatch(setUser(res));
      }
    });
  }
);

export const logout = createAsyncThunk("user/logout", (_, { dispatch }) => {
  request(`${baseUrl}/api/auth/logout`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      token: getCookie("refresh"),
    }),
  }).then((res) => {
    if (res.success) {
      deleteCookie("token");
      deleteCookie("refresh");
      dispatch(resetUser());
    }
  });
});

export const getUser = createAsyncThunk("user/getUser", (_, { dispatch }) => {
  dispatch(setLoading(true));
  request(`${baseUrl}/api/auth/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
  })
    .then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      }
    })
    .finally(() => dispatch(setLoading(false)));
});

type TForm = {
  name: string;
  email: string;
  password?: string;
};
export const changeData = createAsyncThunk<void, TForm>(
  "user/changeData",
  (form, { dispatch }) => {
    request(`${baseUrl}/api/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      method: "PATCH",
      body: JSON.stringify(form),
    }).then((res) => {
      if (res.success) {
        dispatch(setUser(res));
      }
    });
  }
);

export default userSlice.reducer;
