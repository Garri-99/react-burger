import ODStyle from './order-details.module.css'
import done from '../../images/done.png'
import { useSelector } from 'react-redux'

function OrderDetails(){
  const {number} = useSelector(state => state.order)
  return (
    <div className={ODStyle.container}>
      <h3 className={ODStyle.number + ' text text_type_digits-large mt-4 mb-8'}>{number}</h3>
      <p className='text text_type_main-medium mb-15'>идентификатор заказа</p>
      <img src={done} alt='галочка'/>
      <p className='text text_type_main-default mt-15 mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}

export default OrderDetails
