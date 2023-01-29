import { IIngredient } from "../types";

export const uniqIngredient = (arr: any[]) => {
  const uniq: IIngredient[] = [];
  arr.forEach((elem: IIngredient) => {
    uniq.some((item) => item._id === elem._id)
      ? (uniq[uniq.findIndex((item) => item._id === elem._id)].__v += 1)
      : uniq.push(elem);
  });
  return uniq;
};
