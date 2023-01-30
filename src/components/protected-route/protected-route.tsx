import { FC, ReactNode, useEffect, useState } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks";
import { getUser } from "../../services/slices/user-slice";
import { Loader } from "../loader/loader";

export const ProtectedRoute: FC<RouteProps & { children: ReactNode }> = ({ children, ...rest }) => {
  const { isAuthCheck, isLoading } = useSelector((store) => store.user);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    setUserLoaded(true);
  }, [dispatch]);

  if (!isUserLoaded) {
    return null;
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
};
