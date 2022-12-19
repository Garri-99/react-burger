import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from 'react-router-dom'
import { getUser, register } from "../../services/slices/user-slice";
import styles from "./register.module.css";

function RegisterPage() {
  const dispatch = useDispatch()
  const { state } = useLocation()
  const { isAuthCheck } = useSelector(state => state.user)
  const [form, setForm] = useState({
    name: '',
    password: '',
    email: ''
  })
  const onChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form))
  }
  useEffect(() => {
    dispatch(getUser())
  }, [])

  return isAuthCheck ? <Redirect to={ state?.from || '/' } /> : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">Регистрация</h2>
        <Input
          onChange={onChange}
          value={form.name}
          name={"name"}
          placeholder={"Имя"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={"email"}
          extraClass="mb-6"
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
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
