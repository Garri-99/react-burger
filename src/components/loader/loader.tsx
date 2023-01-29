import { FC } from "react";
import { RotatingLines } from "react-loader-spinner";
import styles from "./loader.module.css";

export const Loader: FC = () => {
  return (
    <div className={styles.wrapper}>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="64"
        visible={true}
      />
    </div>
  );
};
