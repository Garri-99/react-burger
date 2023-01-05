import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from 'react-router-dom'
import { useForm } from "../../services/hooks";
import { getUser, register } from "../../services/slices/user-slice";
import styles from "./register.module.css";

function RegisterPage() {
  const dispatch = useDispatch()
  const { values, handleChange } = useForm({
    name: '',
    password: '',
    email: ''
  })
  const { state } = useLocation()
  const { isAuthCheck } = useSelector(state => state.user)
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(values))
  }
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return isAuthCheck ? <Redirect to={ state?.from || '/' } /> : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          onChange={handleChange}
          value={values.name}
          name={"name"}
          placeholder={"Имя"}
          extraClass="mb-6"
        />
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
        <Button htmlType="submit" type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Уже зарегистрированы?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default RegisterPage;
