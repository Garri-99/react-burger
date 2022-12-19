import { createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../../utils/constants";
import { deleteCookie, getCookie, refreshToken, setCookie } from "../../utils/cookie";
import { request } from "../../utils/request";

const initialState = {
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
      state.isLoading = action.payload
    },
    resetUser(state) {
      state.isAuthCheck = false;
      state.data.email = null;
      state.data.name = null;
    }
  },
});

export const { setUser, setLoading, resetUser } = userSlice.actions;

export const register = ({ email, password, name }) => {
  return (dispatch) => {
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
    })
      .then((res) => {
        dispatch(setUser(res));
      })
      .catch((err) => console.log(err));
  };
};

export const login = ({ email, password }) => {
  return (dispatch) => {
    request(`${baseUrl}/api/auth/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => {
        if (res.success) {
          setCookie("token", res.accessToken.split("Bearer ")[1]);
          setCookie("refresh", res.refreshToken);
          dispatch(setUser(res));
        }
      })
      .catch((err) => console.log(err));
  };
};

export const logout = () => {
  return (dispatch) => {
    request(`${baseUrl}/api/auth/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        token: getCookie("refresh")
      }),
    })
      .then((res) => {
        if (res.success) {
          deleteCookie("token");
          deleteCookie("refresh");
          dispatch(resetUser());
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getUser = () => {
  return (dispatch) => {
    dispatch(setLoading(true))
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
      .catch((err) => {
        if (err === "Ошибка 403") {
          return refreshToken().then(() => {
            request(`${baseUrl}/api/auth/user`, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + getCookie("token"),
              },
            }).then((res) => {
              if (res.success) {
                dispatch(setUser(res));
              }
            });
          });
        }
      })
      .catch((err) => console.log(err))
      .finally(() => dispatch(setLoading(false)))
  };
};

export const changeData = (form) => {
  return (dispatch) => {
    request(`${baseUrl}/api/auth/user`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("token"),
      },
      method: "PATCH",
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.success) {
          dispatch(setUser(res));
        }
      })
      .catch((err) => {
        if (err === "Ошибка 403") {
          return refreshToken().then(() => {
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
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export default userSlice.reducer;
