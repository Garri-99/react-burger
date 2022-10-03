import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components'
import HeaderStyle from './app-header.module.css'

export default function AppHeader() {
  return (
    <header className={HeaderStyle.header + ' pt-4 pb-4'}>
    <nav className={HeaderStyle.nav}>
      <ul className={HeaderStyle.list} style={{marginRight: 112}}>
        <li className={HeaderStyle.item + ' pt-4 pb-4 pr-5 pl-5 mr-2'}>
          <BurgerIcon type='primary' />
          <a href="#" className={HeaderStyle.none + ' text text_color_primary text_type_main-default ml-2'}>
            Конструктор
          </a>
        </li>
        <li className={HeaderStyle.item + ' pt-4 pb-4 pr-5 pl-5'}>
          <ListIcon type='secondary' />
          <a href="#" className={HeaderStyle.none + ' text text_color_inactive text_type_main-default ml-2'}>
            Лента заказов
          </a>
        </li>
      </ul>
      <div className={HeaderStyle.logo}><Logo /></div>
      <ul className={HeaderStyle.list} style={{marginLeft: 'auto'}}>
        <li className={HeaderStyle.item + ' pt-4 pb-4 pr-5 pl-5'}>
          <ProfileIcon type='secondary' />
          <a href="#" className={HeaderStyle.none + ' text text_color_inactive text_type_main-default ml-2'}>
            Личный кабинет
          </a>
        </li>
      </ul>
    </nav>
  </header>
  )
}
