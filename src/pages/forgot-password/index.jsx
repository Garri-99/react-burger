import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useEffect } from "react";
import { baseUrl } from "../../utils/constants";
import { request } from "../../utils/request";
import { Redirect, useHistory, Link } from "react-router-dom";
import styles from "./forgot.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../services/slices/user-slice";
import { useForm } from "../../services/hooks";

function ForgotPage() {
  const { isAuthCheck } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange } = useForm({
    email: "",
  });
  const onSubmit = (e) => {
    e.preventDefault();
    request(`${baseUrl}/api/password-reset`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email: values.email,
      }),
    })
      .then((res) => {
        if (res.success) {
          history.replace("/reset-password", { ok: true });
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    dispatch(getUser());
  }, []);

  return isAuthCheck ? (
    <Redirect to="/" />
  ) : (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h2 className="text text_type_main-medium mb-6">
          Восстановление пароля
        </h2>
        <EmailInput
          onChange={handleChange}
          value={values.email}
          name={"email"}
          extraClass="mb-6"
          placeholder={"Укажите e-mail"}
        />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
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

export default ForgotPage;
