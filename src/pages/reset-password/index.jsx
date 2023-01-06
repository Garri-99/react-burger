import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/request";
import { Redirect, Link, useLocation } from "react-router-dom";
import styles from "./reset.module.css";
import { useForm } from "../../services/hooks";

function ResetPage() {
  const { state } = useLocation()
  const {values, handleChange} = useForm({
    token: "",
    password: "",
  })
  const onSubmit = (e) => {
    e.preventDefault();
    request(`${baseUrl}/api/password-reset/reset`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        password: values.password,
        token: values.token,
      }),
    })
      .then((res) => {
        if (res.success) {
          return <Redirect to="/" />;
        }
      })
      .catch((err) => console.log(err));
  };
  if (!state?.ok) {
    return <Redirect to="/forgot-password" />
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <PasswordInput
          onChange={handleChange}
          value={values.password}
          name={"password"}
          extraClass="mb-6"
          placeholder={"Введите новый пароль"}
        />
        <Input
          onChange={handleChange}
          value={values.token}
          name={"token"}
          placeholder={"Введите код из письма"}
          extraClass="mb-6"
        />
        <Button htmlType="submit" type="primary" size="medium">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль?{" "}
        <Link className={styles.link} to="/login">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default ResetPage;
