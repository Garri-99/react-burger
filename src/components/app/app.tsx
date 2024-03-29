import {
  ForgotPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPage,
  FeedPage,
  OrderPage,
} from "../../pages";
import { AppHeader } from "../app-header/app-header";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/profile";
import { useEffect } from "react";
import { getIngredients } from "../../services/slices/ingredients-slice";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUser } from "../../services/slices/user-slice";
import { useDispatch, useSelector } from "../../services/hooks";
import { Location } from "history";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation<{
    background: Location;
    backgroundFeed: Location;
    backgroundProfile: Location;
    number: number;
  }>();
  const background = location.state?.background;
  const backgroundFeed = location.state?.backgroundFeed;
  const backgroundProfile = location.state?.backgroundProfile;
  const { ingredients } = useSelector((store) => store.ingredients);
  const closeModal = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    ingredients && (
      <>
        <AppHeader />
        <Switch
          location={
            background || backgroundFeed || backgroundProfile || location
          }
        >
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/ingredient/:id" exact>
            <IngredientDetails isPage />
          </Route>
          <Route path="/feed" exact>
            <FeedPage />
          </Route>
          <Route path="/feed/:id" exact>
            <OrderPage />
          </Route>
          <Route path="/profile/orders/:id" exact>
            <OrderPage isUser />
          </Route>
          <ProtectedRoute path="/profile">
            <ProfilePage />
          </ProtectedRoute>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/forgot-password" exact>
            <ForgotPage />
          </Route>
          <Route path="/reset-password" exact>
            <ResetPage />
          </Route>
        </Switch>
        {background && (
          <Route path="/ingredient/:id" exact>
            <Modal onClose={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
        {backgroundFeed && (
          <Route path="/feed/:id" exact>
            <Modal onClose={closeModal} number={location.state.number}>
              <OrderPage isModal />
            </Modal>
          </Route>
        )}
        {backgroundProfile && (
          <Route path="/profile/orders/:id" exact>
            <Modal onClose={closeModal} number={location.state.number}>
              <OrderPage isModal isUser />
            </Modal>
          </Route>
        )}
      </>
    )
  );
}

export default App;
