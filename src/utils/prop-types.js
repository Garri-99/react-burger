import PropTypes from 'prop-types'


export const ingredientPropType = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["bun", "main", "sauce"]).isRequired,
  name: PropTypes.string.isRequired,
  proteins: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});
