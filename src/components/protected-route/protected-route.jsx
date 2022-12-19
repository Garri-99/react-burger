import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../services/slices/user-slice";
import { Loader } from "../loader/loader";

export function ProtectedRoute({ children, ...rest }) {
  const { isAuthCheck, isLoading } = useSelector((store) => store.user);
  const [isUserLoaded, setUserLoaded] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    setUserLoaded(true)
  }, []);

  if (!isUserLoaded) {
    return null
  }

  return isLoading ? (
    <Loader />
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthCheck ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
