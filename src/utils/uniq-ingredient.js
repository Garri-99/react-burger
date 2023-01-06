export const uniqIngredient = (arr) => {
  const uniq = [];
  arr.forEach((elem) => {
    uniq.some((item) => item._id === elem._id)
      ? (uniq.find((item) => item._id === elem._id).__v += 1)
      : uniq.push(elem);
  });
  return uniq;
};
