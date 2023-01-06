import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import { getUser, login } from "../../services/slices/user-slice";
import { useForm } from "../../services/hooks";

function LoginPage() {
  const dispatch = useDispatch();
  const { state } = useLocation()
  const { isAuthCheck } = useSelector((state) => state.user);
  const {values, handleChange} = useForm({
    password: "",
    email: "",
  })
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(values));
  };
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return isAuthCheck ? <Redirect to={ state?.from || '/' } /> : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Вход</h2>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-6"
        />
        <Button htmlType="submit" size="medium">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}

export default LoginPage;
