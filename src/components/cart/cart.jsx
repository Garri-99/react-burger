import React from "react";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import CStyle from './cart.module.css'

class Cart extends React.Component {
  render() {
    return (
      <div className={CStyle.cart}>
        <div style={{ display: 'flex', alignItems: 'center', position: 'relative', justifyContent: 'center' }} className="pl-4 pr-4">
          <img src={this.props.image} />
          {this.props.count && <Counter count={this.props.count} size="default" />}
        </div>
        <div style={{display: 'flex', alignItems: 'flex-end'}} className='mt-2 mb-2'>
          <p className="text text_type_digits-default mr-2">{this.props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p style={{minHeight: '48px', textAlign: 'center'}} className="text text_type_main-default">{this.props.name}</p>
      </div>
    )
  }
}

export default Cart
