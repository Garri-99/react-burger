import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ingredientPropType } from "../../utils/prop-types";
import PropTypes from "prop-types";
import CLStyle from "./constructor-list.module.css";

function ConstructorList({ data, handleClose, index, moveCard }) {
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: "constructor-list",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex, item.data);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "constructor-list",
    item: { data, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <li className={CLStyle.item} style={{ opacity }} ref={ref}>
      <DragIcon />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleClose(data)}
      />
    </li>
  );
}

ConstructorList.propTypes = {
  data: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  handleClose: PropTypes.func.isRequired,
  moveCard: PropTypes.func.isRequired,
};

export default ConstructorList;
