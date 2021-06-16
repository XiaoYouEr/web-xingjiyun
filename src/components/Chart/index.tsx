import React, { useEffect, FC } from "react";
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/markPoint";
import "echarts/lib/component/markLine";
import { PieChart } from "echarts/charts";
echarts.use([PieChart]);

interface chartProps {
  data: any;
  nid?: string;
  color: string[];
  showPercent?: boolean;
  total?: number;
}
const Chart: FC<chartProps> = (props) => {
  useEffect(() => {
    const { data, color, showPercent, total } = props;
    // 初始化
    var myChart = echarts.init(document.getElementById(props.nid ? "main" + props.nid : "main"));
    // 绘制图表
    myChart.setOption({
      title: {
        zlevel: 0,
        text: ["{value|" + data[0].value + "}"].join(""),
        rich: {
          value: {
            color: "#303133",
            fontSize: 30,
            fontWeight: "bold",
            lineHeight: 30,
          },
          name: {
            color: "#f0f5ff",
            lineHeight: 20,
          },
        },
        x: "center",
        y: "center",
        textStyle: {
          rich: {
            value: {
              color: "#303133",
              fontSize: 30,
              fontWeight: "bold",
              lineHeight: 30,
            },
            name: {
              color: "#f0f5ff",
              lineHeight: 20,
            },
          },
        },
      },
      tooltip: {
        // 悬停指示
        trigger: "item",
        formatter: `{b}: {c} ${
          showPercent && total ? "<br /> 占比：" + (data[0].value / total) * 100 + "%" : ""
        }`,
      },
      legend: {
        x: "center",
        y: "bottom",
        icon: "circle",
        bottom: "20",
      },
      series: [
        {
          name: "节点详情",
          type: "pie",
          radius: "100%",
          left: "center",
          stillShowZeroSum: false,
          avoidLabelOverlap: false,
          // label: {
          //   normal: {
          //     show: false,
          //     position: "center",
          //     formatter: ["{value|{c}}", "{name|{b}}"].join("\n"),
          //     rich: {
          //       value: {
          //         color: "#303133",
          //         fontSize: 40,
          //         fontWeight: "bold",
          //         lineHeight: 40,
          //       },
          //       name: {
          //         color: "#909399",
          //         lineHeight: 20,
          //       },
          //     },
          //   },
          //   emphasis: {
          //     show: true,
          //     textStyle: {
          //       fontSize: "16",
          //       fontWeight: "bold",
          //     },
          //   },
          // },
          data: data,
        },
      ],
      color: color,
    });
    window.addEventListener("resize", function () {
      myChart.resize();
    });
    return () => {
      window.removeEventListener("resize", function () {
        myChart = null;
      });
    };
  }, []);
  return (
    <div
      key={props.nid || undefined}
      id={props.nid ? "main" + props.nid : "main"}
      style={{ width: "100%", height: "480px" }}
    ></div>
  );
};

export default Chart;
