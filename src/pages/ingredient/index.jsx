import style from "./ingredient.module.css";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

function IngredientPage() {
  const { id } = useParams()
  const data = useSelector(
    (state) => state.ingredients.ingredients
  ).find(i => i._id === id)
  return (
    <div className={style.wrapper + " mr-25 ml-25"}>
      <h2 className="text text_type_main-large mt-30 mb-4">Детали ингредиента</h2>
      <figure className={style.figure}>
        <img
          className={style.img + " mb-4"}
          src={data.image_large}
          alt={data.name}
        />
        <figcaption
          className={style.caption + " text text_type_main-medium mb-8"}
        >
          {data.name}
        </figcaption>
      </figure>
      <ul className={style.grid}>
        <li className={style.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </p>
        </li>
        <li className={style.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.proteins}
          </p>
        </li>
        <li className={style.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.fat}
          </p>
        </li>
        <li className={style.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
}

export default IngredientPage;
