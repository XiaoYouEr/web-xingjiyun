import React, { useState, useEffect, FC } from "react";
import { history } from "umi";
import { Row, Col } from "antd";
import styles from "./index.less";
import { Dispatch, connect, SummaryModelState } from "umi";
import Chart from "@/components/Chart";
import { Card } from "antd";

interface summaryProps {
  dispatch: Dispatch;
  summary: SummaryModelState;
}
const color = ["#3682ff", "#69c0ff", "#999999"];
const SummaryPage: FC<summaryProps> = (props) => {
  const { dispatch, summary } = props;
  const [totalData, setTotalData] = useState<any[]>([]);
  useEffect(() => {
    dispatch({
      type: "summary/getWebTotal",
      callback: (res) => {
        console.log(res, "response");
        let data = [];
        res["total_machine"] && data.push({ name: "总节点数", value: res["total_machine"] });
        res["running_machine"] && data.push({ name: "运行中节点", value: res["running_machine"] });
        res["notrun_machine"] && data.push({ name: "未运行节点", value: res["notrun_machine"] });
        res["error_machine"] && data.push({ name: "离线节点", value: res["error_machine"] });
        setTotalData(data);
      },
    });
  }, []);

  return (
    <div className={styles.summary}>
      <div className={styles.title}>节点详情</div>
      <div className={styles.charts}>
        {totalData.map((item, index) => {
          return (
            <div key={String(index)} className={styles.chartBox}>
              <Chart
                data={[item]}
                color={[color[index]]}
                nid={String(index)}
                showPercent={index === 0 ? false : true}
                total={totalData[0].value}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ summary }: { summary: SummaryModelState }) => {
  return {
    summary,
  };
};

export default connect(mapStateToProps)(SummaryPage);
