import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import { changeData, logout } from "../../services/slices/user-slice";
import styles from "./profile.module.css";

function ProfilePage() {
  const { data, isAuthCheck } = useSelector((store) => store.user);
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const password = useRef(null);
  const name = useRef(null);
  const login = useRef(null);
  const [form, setForm] = useState({
    name: data.name,
    password: "",
    email: data.email,
  });
  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(changeData(form));
  };
  const onReset = (e) => {
    e.preventDefault();
    setForm({
      name: data.name,
      password: "",
      email: data.email,
    });
  };
  const onClick = () => {
    dispatch(logout());
  };

  return  isAuthCheck && (
    <div className={styles.container}>
      <div>
        <nav className={styles.nav}>
          <NavLink
            to={`${url}`}
            exact
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            activeClassName={styles.active}
          >
            Профиль
          </NavLink>
          <NavLink
            to={`${url}/orders`}
            exact
            className={
              styles.link + " text text_type_main-medium text_color_inactive"
            }
            activeClassName={styles.active}
          >
            История заказов
          </NavLink>
          <button
            onClick={onClick}
            className={`${styles.button} text text_type_main-medium text_color_inactive`}
          >
            Выход
          </button>
        </nav>
        <Route path={`${path}`} exact>
          <p
            className={
              styles.description +
              " text text_type_main-default text_color_inactive"
            }
          >
            В этом разделе вы можете
            <br />
            изменить свои персональные данные
          </p>
        </Route>
      </div>
      <Switch>
        <Route path={`${path}`} exact>
          <form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
            <Input
              onChange={onChange}
              value={form.name}
              name="name"
              ref={name}
              placeholder="Имя"
              extraClass="mb-6"
              icon="EditIcon"
              onIconClick={() => name.current.focus()}
            />
            <Input
              onChange={onChange}
              value={form.email}
              placeholder="Логин"
              name="email"
              ref={login}
              extraClass="mb-6"
              icon="EditIcon"
              onIconClick={() => login.current.focus()}
            />
            <Input
              onChange={onChange}
              value={form.password}
              name="password"
              ref={password}
              placeholder="Пароль"
              extraClass="mb-6"
              icon="EditIcon"
              onIconClick={() => password.current.focus()}
            />
            <div className={styles.flex}>
              <Button htmlType="reset" type="secondary">
                Отмена
              </Button>
              <Button htmlType="submit">Cохранить</Button>
            </div>
          </form>
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
