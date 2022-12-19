import {
  ForgotPage,
  HomePage,
  LoginPage,
  RegisterPage,
  ResetPage,
  IngredientPage,
} from "../../pages";
import AppHeader from "../app-header/app-header";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import ProfilePage from "../../pages/profile";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/slices/ingredients-slice";
import { ProtectedRoute } from "../protected-route/protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { getUser } from "../../services/slices/user-slice";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const background = location.state?.background;
  const { ingredients } = useSelector((store) => store.ingredients);
  const closeModal = () => {
    history.goBack();
  };
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser())
  }, []);

  return (
    ingredients && (
      <>
        <AppHeader />
        <Switch location={background || location}>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/ingredient/:id" exact>
            <IngredientPage />
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
        { background && (
          <Route path="/ingredient/:id" exact>
            <Modal onClose={closeModal} title={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          </Route>
        )}
      </>
    )
  );
}

export default App;
