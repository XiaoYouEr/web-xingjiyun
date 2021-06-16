import React, { FC } from "react";
import styles from "./index.less";
import { history } from "umi";

const Index: FC = () => {
  return (
    <div className={styles.page404}>
      <img src={require("@/assets/images/404.gif")} />
      <div className={styles.description}>
        抱歉，您访问的页面不在地球上... &nbsp;
        <span
          className={styles.goBack}
          onClick={() => {
            history.push("/summary");
          }}
        >
          回到首页 &gt;
        </span>
      </div>
    </div>
  );
};

export default Index;
