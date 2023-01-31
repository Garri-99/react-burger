import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import CLStyle from "./constructor-list.module.css";
import { IIngredient } from "../../types";

interface IConstructorProp {
  data: IIngredient;
  handleClose: (data: IIngredient) => void;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number, data: IIngredient) => void;
}

const ConstructorList: FC<IConstructorProp> = ({
  data,
  handleClose,
  index,
  moveCard,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [, drop] = useDrop({
    accept: "constructor-list",
    hover(item: any, monitor) {
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
      const hoverClientY =
        clientOffset && clientOffset.y - hoverBoundingRect.top;
      if (
        dragIndex < hoverIndex &&
        (hoverClientY ? hoverClientY : 0) < hoverMiddleY
      ) {
        return;
      }
      if (
        dragIndex > hoverIndex &&
        (hoverClientY ? hoverClientY : 0) > hoverMiddleY
      ) {
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
      <DragIcon type="primary" />
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleClose(data)}
      />
    </li>
  );
};

export default ConstructorList;
