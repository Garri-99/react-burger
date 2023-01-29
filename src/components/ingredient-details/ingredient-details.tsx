import IDStyle from "./ingredient-details.module.css";
import { useParams } from "react-router-dom";
import { useSelector } from "../../services/hooks";
import { FC } from "react";

interface IIngredientDetailsProp {
  isPage?: boolean;
}

const IngredientDetails: FC<IIngredientDetailsProp> = ({ isPage }) => {
  const { id } = useParams<{ id: string }>();
  const data = useSelector((state) => state.ingredients.ingredients).find(
    (i) => i._id === id
  );
  return data ? (
    <div className={IDStyle.wrapper}>
      {isPage && (
        <h2 className="text text_type_main-large mt-30 mb-4">
          Детали ингредиента
        </h2>
      )}
      <figure className={IDStyle.figure}>
        <img
          className={IDStyle.img + " mb-4"}
          src={data.image_large}
          alt={data.name}
        />
        <figcaption
          className={IDStyle.caption + " text text_type_main-medium mb-8"}
        >
          {data.name}
        </figcaption>
      </figure>
      <ul className={IDStyle.grid}>
        <li className={IDStyle.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.calories}
          </p>
        </li>
        <li className={IDStyle.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.proteins}
          </p>
        </li>
        <li className={IDStyle.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.fat}
          </p>
        </li>
        <li className={IDStyle.flex}>
          <p className="text text_type_main-default text_color_inactive mb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  ) : null;
};

export default IngredientDetails;
