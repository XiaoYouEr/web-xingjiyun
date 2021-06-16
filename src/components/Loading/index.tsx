import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.less";
import { LoadingOutlined } from "@ant-design/icons";

let requestCount = 0;
let startTime = 0;

const LoadingContainer = (loadingText: string | React.ReactNode, className?: string) => {
  return (
    <div className={`${styles["loading-container"]} ${className ? className : ""}`}>
      <div className={styles.logo}>
        <LoadingOutlined style={{ color: "#3682FF", fontSize: "32px" }} />
      </div>
      <div className={styles["text"]}>{loadingText || "加载中..."}</div>
    </div>
  );
};

export default {
  start: function (loadingText?: string | React.ReactNode, className?: string) {
    if (requestCount === 0) {
      startTime = new Date().getTime();
      var dom = document.createElement("div");
      dom.setAttribute("class", "myLoading");
      document.body.appendChild(dom);
      ReactDOM.render(LoadingContainer(loadingText, className), dom);
    }
    requestCount++;
  },
  end: function () {
    requestCount--;
    if (requestCount === 0) {
      let endTime = new Date().getTime();
      const timer = endTime - startTime >= 100 ? 0 : 100;
      setTimeout(() => {
        let dom = document.querySelector(".myLoading");
        dom?.parentNode?.removeChild(dom);
      }, timer);
    }
  },
};
