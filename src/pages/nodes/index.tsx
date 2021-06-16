import React, { useState, useEffect, FC } from "react";
import { history } from "umi";
import { Row, Col } from "antd";
import styles from "./index.less";
import { Dispatch, connect, SummaryModelState } from "umi";
import { Select } from "antd";

const { Option } = Select;
import { Table, Tag, Space } from "antd";

interface summaryProps {
  dispatch: Dispatch;
  summary: SummaryModelState;
}
const SummaryPage: FC<summaryProps> = (props) => {
  const { dispatch, summary } = props;
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [nodeDetail, setNodeDetail] = useState<any>();
  const [nodeData, setNodeData] = useState([]);
  useEffect(() => {
    dispatch({
      type: "summary/getIpList",
      callback: (res) => {
        let result: any = [];
        res.map((item: string) => {
          result.push({ value: item, label: item });
        });
        setOptions(result);
        result.length && onSelect(result[0].value);
      },
    });
  }, []);

  const onSelect = (value: string) => {
    dispatch({
      type: "summary/getNodeTotal",
      payload: { node: value },
      callback: (res) => {
        console.log(res, "result");
        setNodeDetail(res);
        let data = (res && res.dev_info ? res.dev_info : []).map(
          (item: { name: string }, index: number) => {
            return {
              ...item,
              key: item.name + "-" + index,
            };
          },
        );
        setNodeData(data);
      },
    });
  };

  const columns = [
    {
      title: "硬盘名",
      dataIndex: "dev_name",
      key: "dev_name",
      // render: text => <a>{text}</a>,
    },
    {
      title: "健康状态",
      dataIndex: "health",
      key: "health",
      render: (health: string) => {
        if (health == "ok") {
          return "健康";
        } else {
          return <span style={{ color: "red" }}>不健康</span>;
        }
      },
    },
    {
      title: "剩余空间",
      dataIndex: "free_size",
      key: "free_size",
    },
    {
      title: "是否异常",
      dataIndex: "warning",
      key: "warning",
      render: (warning: string | number) => {
        if (warning == 0) {
          return <span style={{ color: "red" }}>异常</span>;
        } else {
          return <span>正常</span>;
        }
      },
    },
  ];

  return (
    <div>
      {!!options.length && (
        <div className={styles.topSelect}>
          节点：
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择节点IP"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            options={options}
            defaultValue={options && options.length ? options[0].value : ""}
            onSelect={onSelect}
          />
        </div>
      )}
      {nodeDetail ? (
        <>
          <div className={styles.chartBox}>
            <div className={styles.chart}>
              <div className={styles.title}>CPU(使用率)</div>
              {nodeDetail.cpu_info ? (
                <div className={styles.num}>{nodeDetail.cpu_info.usage}%</div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.chart}>
              <div className={styles.title}>内存(已用/总量)</div>
              {nodeDetail.mem_info ? (
                <div className={styles.num}>
                  {nodeDetail.mem_info.usage}/{nodeDetail.mem_info.total}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className={styles.chart}>
              <div className={styles.title}>并发个数</div>
              <div className={styles.num}>{nodeDetail.chia_process_num}</div>
            </div>
            <div className={styles.chart}>
              <div className={styles.title}>P盘异常次数</div>
              <div className={styles.num}>{nodeDetail.plot_err_count}</div>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.tableTitle}>硬盘</div>
            <Table columns={columns} dataSource={nodeData} pagination={false} />
            <div className={styles.nodeCount}>总数：{nodeData.length} </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ summary }: { summary: SummaryModelState }) => {
  return {
    summary,
  };
};

export default connect(mapStateToProps)(SummaryPage);
