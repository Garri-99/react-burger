import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useRouteMatch, Link } from "react-router-dom";
import AHStyle from "./app-header.module.css";
export default function AppHeader() {
  const matchHome = useRouteMatch("/");
  const matchOrders = useRouteMatch("/feed");
  const matchProfile = useRouteMatch("/profile");
  return (
    <header className={AHStyle.header + " pt-4 pb-4"}>
      <nav className={AHStyle.nav}>
        <ul className={AHStyle.list}>
          <li className={AHStyle.item + " pt-4 pb-4 pr-5 pl-5 mr-2"}>
            <BurgerIcon type={matchHome?.isExact ? "primary" : "secondary"} />
            <NavLink
              to="/"
              exact
              className={
                AHStyle.none +
                " text text_color_inactive text_type_main-default ml-2"
              }
              activeClassName={AHStyle.active}
            >
              Конструктор
            </NavLink>
          </li>
          <li className={AHStyle.item + " pt-4 pb-4 pr-5 pl-5"}>
            <ListIcon type={matchOrders?.isExact ? "primary" : "secondary"} />
            <NavLink
              to="/feed"
              exact
              className={
                AHStyle.none +
                " text text_color_inactive text_type_main-default ml-2"
              }
              activeClassName={AHStyle.active}
            >
              Лента заказов
            </NavLink>
          </li>
        </ul>
        <Link to="/" className={AHStyle.logo}>
          <Logo />
        </Link>
        <ul className={AHStyle.list_r}>
          <li className={AHStyle.item + " pt-4 pb-4 pr-5 pl-5"}>
            <ProfileIcon type={matchProfile ? "primary" : "secondary"} />
            <NavLink
              to="/profile"
              className={
                AHStyle.none +
                " text text_color_inactive text_type_main-default ml-2"
              }
              activeClassName={AHStyle.active}
            >
              Личный кабинет
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
