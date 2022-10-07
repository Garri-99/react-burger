import React from "react";
import { ConstructorElement, DragIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import data from "../../utils/data";
import currency from '../../images/icon.svg'
import BCStyle from './burger-constructor.module.css'
import PropTypes from 'prop-types'
import { ingredientPropType } from "../../utils/prop-types";


class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className={BCStyle.section + ' mt-25'}>
        <div className="mb-4 ml-8">
          <ConstructorElement
            type="top"
            isLocked={true}
            text={data[0].name + ' (верх)'}
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <ul className={BCStyle.list}>
          <li className={BCStyle.item}>
            <DragIcon />
            <ConstructorElement
              text={data[5].name}
              price={30}
              thumbnail={data[5].image}
            />
          </li>
          <li className={BCStyle.item}>
            <DragIcon />
            <ConstructorElement
              text={data[4].name}
              price={300}
              thumbnail={data[4].image}
            />
          </li>
          <li className={BCStyle.item}>
            <DragIcon />
            <ConstructorElement
              text={data[7].name}
              price={80}
              thumbnail={data[7].image}
            />
          </li>
          <li className={BCStyle.item}>
            <DragIcon />
            <ConstructorElement
              text={data[8].name}
              price={80}
              thumbnail={data[8].image}
            />
          </li>
          <li className={BCStyle.item}>
            <DragIcon />
            <ConstructorElement
              text={data[8].name}
              price={80}
              thumbnail={data[8].image}
            />
          </li>
        </ul>
        <div className="mt-4 ml-8">
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={data[0].name + ' (низ)'}
            price={20}
            thumbnail={data[0].image}
          />
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}} className='mt-10'>
          <p className="text text_type_digits-medium mr-2">610</p>
          <img alt="валюта" src={currency} />
          <Button type="primary" size="large" style={{marginLeft: '40px'}}>
            Оформить заказ
          </Button>
        </div>
      </section>
    )
  }
}

BurgerConstructor.protoTypes = {
  data: PropTypes.arrayOf(ingredientPropType)
}

export default BurgerConstructor
